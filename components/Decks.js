import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import { Constants, AppLoading } from 'expo'

class Decks extends Component {
    state = {
        deckList: {},
        isReady: false
    }

    //Need to reload from asyncStorage when DeckList is focused (in order to see new Decks if they've been added)
    //https://stackoverflow.com/questions/50290818/react-navigation-detect-when-screen-is-activated-appear-focus-blur

    componentDidMount() {

        this.subs = [
            this.props.navigation.addListener('didFocus', () => this._getDecks()),
        ];

       //this._getDecks()
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    _getDecks() {
        getDecks().then((results) => {
            this.setState({
                deckList: results,
                isReady: true
            })
        })
    }

    render() {
        const { isReady, deckList } = this.state
        const { navigation } = this.props

        if (isReady === false) return (<AppLoading/>)

        /** TODO
         * Use a ListView instead of view for when the number of decks gets large
         */
        return (
            <View>
                <Text style={{color:'#000'}}>Deck List View here</Text>
                {
                    Object.keys(deckList).map((key) => {
                        return (
                            <TouchableOpacity key={key} style={{backgroundColor: '#ccc', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => navigation.navigate(
                                    'Deck',
                                    { key: key}
                                )}>
                                <Text>{deckList[key].title}</Text>
                                <Text>{deckList[key].questions.length} cards</Text>
                            </TouchableOpacity>

                        )

                    })
                }
            </View>
        )
    }
}

export default Decks