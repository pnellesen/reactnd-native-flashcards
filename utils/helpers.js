import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native'
//import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
//import { white, red, blue, orange, lightPurp, pink } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'reactnd_flashcards:notifications'
const DECKS_STORAGE_KEY = "reactnd_flashcards:decks"

/**
 * TODO: add a helper function to generate a UID. copy from one used previously
 * if you can find it.
 */


export function addCard(deck) {
 return getDeck(deck.title)
    .then((result) => {
      const newDeck = {
        [deck.title]: {
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

export function addDeck(title) {
  const newDeck = {
    [title]: {
      title: title,
      questions: []
    }
  }
  //console.log("add new deck - newDeck? ", newDeck)

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
}


_getDummyData = () => {
    const dummyData = {
        React: {
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
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.',
              correct: null,
              showAnswer: false
            }
          ]
        }
      }

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}