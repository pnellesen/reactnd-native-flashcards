import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import { Constants, AppLoading } from 'expo'

class Decks extends Component {
    state = {
        deckList: {},
        isReady: false,
        reloadDecks: false
    }

    componentDidMount() {
        getDecks().then((results) => {
            this.setState({
                deckList: results,
                isReady: true
            })
        })
    }

    componentDidUpdate() {
        if (this.state.reloadDecks || this.props.screenProps.reloadDecks) {
            getDecks().then((results) => {
                this.setState({
                    deckList: results,
                    isReady: true,
                    reloadDecks: false
                })
                this.props.screenProps.setReloadDecks(false)
            })
        }
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
                                    {key: key}
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