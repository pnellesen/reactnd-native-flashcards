import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native'
//import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
//import { white, red, blue, orange, lightPurp, pink } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'reactnd_flashcards:notifications'
const DECKS_STORAGE_KEY = "reactnd_flashcards:decks"

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {

            console.log("getDecks? " , results)
            return results !== null ? JSON.parse(results) : this._getDummyData()
        })
}

export function getDeck(key) {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        console.log("getDeck - results? ", results)
        return results !== null ? JSON.parse(results)[key] : this._getDummyData()[key]
    })

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