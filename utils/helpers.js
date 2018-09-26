import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white, red, blue, orange, lightPurp, pink } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'reactnd_flashcards:notifications'
const DECKS_STORAGE_KEY = "reactnd_flashcards:decks"

/**
 * helper function to generate a UID. Direct copy from the
 * one used in Project 2
 */
function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * BEGIN Notifications here. Based on code used in UdaciFitness app from class
 */
export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to study your FlashCards today!"
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Study your FlashCards',
    body: "\u1F44B Don't forget to study your FlashCards today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {// we've already got permission
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(8)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,//8:00am
                  repeat: "day"
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
            }
          })
      }
    })
}
// END Notifications

 export function addCard(deck) {
  return getDeck(deck.id)
    .then((result) => {
      const newDeck = {
        [deck.id]: {
          ...result,
          ...deck
        }
      }
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
    })
}

export function getDecks() {

  const cleanUp = false

  if (cleanUp === false ) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return results !== null ? JSON.parse(results) : this._getDummyData()
    })
  }

  //Use this if we need to clean up asyncStorage
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    .then(() => {
      return this._getDummyData()
  })
}

export function getDeck(key) {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        const resObj = results !== null ? JSON.parse(results) : this._getDummyData()
        return resObj[key]
    })

}


export function setDeckCompletedDate(key) {
  return getDeck(key)
    .then((result) => {
      const newCompletedDate = timeToString()
      const newDeck = {
        [key]: {
          ...result,
          lastCompletedDate:newCompletedDate
        }
      }
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
        .then(() => {
          clearLocalNotification().then(setLocalNotification)
        })
    })
}


export function addDeck(title) {
  const newKey = generateUID()
  const newDeck = {
    [newKey]: {
      id: newKey,
      title: title,
      questions: [],
      lastCompletedDate: null
    }
  }
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
    .then(() => {
      return newKey
    })
}

_getDummyData = () => {
    const dummyData = {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              correct: null,
              showAnswer: false
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
              correct: null,
              showAnswer: false
            }
          ],
          lastCompletedDate:null
        },
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.',
              correct: null,
              showAnswer: false
            }
          ],
          lastCompletedDate:null
        }
      }

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}