import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'


class Decks extends Component {
    render() {
        return (
            <View>
                <Text style={{color:'#000'}}>Deck List View here</Text>
                <Text>Props? {JSON.stringify(this.props)}</Text>
            </View>
        )
    }
}

export default Decks