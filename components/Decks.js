import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView, Animated, Easing } from 'react-native'
import { getDecks, timeToString, getDailyReminderValue  } from '../utils/helpers'
import { red, lightGray, black } from '../utils/colors'
import { AppLoading } from 'expo'

class Decks extends Component {

    state = {
        deckList: {},
        isReady: false,
        showDailyReminder: false
    }

    // BEGIN animation setup
    // Credit for this idea goes to https://code.tutsplus.com/tutorials/practical-animations-in-react-native--cms-27567

    deckButtonScaleValue = {}

    _resizeButton = (key) => {
        // When button pressed, do a simple resize animation, then navigate to the appropriate deck
        this.deckButtonScaleValue[key].setValue(0)

        Animated.timing(
            this.deckButtonScaleValue[key],
            {
                toValue:1,
                duration:300,
                easing:Easing.easingOutBack
            }
        ).start(() => {
            // send our navigate function to start() as a callback
            this.props.navigation.navigate(
                'Deck',
                {key: key}
            )
        })
    }

    _deckButtonScale = (key) => this.deckButtonScaleValue[key].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.08, 1]
    })
    // END animation setup

    _getDecks = () => {
        getDecks().then((results) => {
            Object.keys(results).map((result) => {
                this.deckButtonScaleValue[results[result].id] = new Animated.Value(0)
            })
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
        if (isReady === false) return (<AppLoading/>)
        /**
         * Using ScrollView for simplicity. Would probably
         * use FlatList if it was anticipated that list would be long
         */
        return (
            <View style={{alignItems:'center'}}>
                {showDailyReminder && <View style={{width:400, alignItems:'center',margin:20}}><Text style={{color:red, fontSize:20}}>{getDailyReminderValue().today}</Text></View>}
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}>
                {
                    Object.keys(deckList).map((key) => {
                        return (
                            <TouchableOpacity key={key}
                                onPress={() => this._resizeButton(key)}>
                                <Animated.View
                                    style={[
                                        styles.decks,
                                        { transform: [{ scale: this._deckButtonScale(key) }] }
                                    ]}>
                                        <Text style={{fontSize:26}}>{deckList[key].title}</Text>
                                        <Text style={{fontSize:16}}>{deckList[key].questions.length} card{deckList[key].questions.length !== 1 && 's'}</Text>
                                </Animated.View>
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

const styles = StyleSheet.create({
    decks: {
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: lightGray,
        margin:10,
        padding: 10,
        borderRadius: 5,
        borderWidth:1,
        borderColor:black,
        height:90
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent:'flex-start',
        width:300
    }
  });
