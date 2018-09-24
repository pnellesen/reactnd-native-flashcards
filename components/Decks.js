import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native'
import { getDecks, timeToString, getDailyReminderValue  } from '../utils/helpers'
import { red } from '../utils/colors'
import { Constants, AppLoading } from 'expo'

class Decks extends Component {
    state = {
        deckList: {},
        isReady: false,
        showDailyReminder: false
    }

    _getDecks = () => {
        getDecks().then((results) => {
            const showReminder = (Object.keys(results).filter((result) => {
                return results[result].lastCompletedDate === timeToString()
            }).length === 0)
            this.setState({
                deckList: results,
                isReady: true,
                showDailyReminder:showReminder
            })
            this.props.screenProps.setReloadDecks(false)
        })
    }

    componentDidMount() {
        this._getDecks()
    }

    componentWillReceiveProps(nextProps) {
        nextProps.screenProps.reloadDecks && this._getDecks()
    }

    render() {
        const { isReady, deckList, showDailyReminder } = this.state
        const { navigation } = this.props

        if (isReady === false) return (<AppLoading/>)

        /**
         * Using ScrollView for simplicity. Would probably
         * use FlatList if it was anticipated that list would be long
         */
        return (
            <View>
                <Text style={{color:'#000'}}>Deck List View here</Text>
                {showDailyReminder && <Text style={{color:red}}>{getDailyReminderValue().today}</Text>}
                <ScrollView
                    contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}>
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
                </ScrollView>
            </View>
        )
    }
}

export default Decks