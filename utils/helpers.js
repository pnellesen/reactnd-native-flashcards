import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native'
//import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
//import { white, red, blue, orange, lightPurp, pink } from './colors'
import { Notifications, Permissions } from 'expo'
import dummyData from './dummyData'

const NOTIFICATION_KEY = 'reactnd_flashcards:notifications'
const DECKS_STORAGE_KEY = "reactnd_flashcards:decks"


export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            //console.log("getDecks? " , results, " - dummyData? ", dummyData)
            return results !== null ? JSON.parse(results) : dummyData// remove when finished?
        })
}