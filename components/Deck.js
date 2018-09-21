import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import { Constants, AppLoading } from 'expo'

class Deck extends Component {
    /*
    static navigationOptions = ({ navigation}) => {
        console.log("navigation? ", navigation)

        const { key } = navigation.state.params
        return {
            title: `${month}/${day}/${year}`
        }

    }
    */
    state = {
        deck: null,
        isReady: false
    }
    componentDidMount() {

       console.log("Deck mounted")
       this._getDeck()
    }
    componentWillUnmount() {
        //this.subs.forEach(sub => sub.remove());
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Deck: props changed? ", this.props !== prevProps)
        this._getDeck()
    }
    _getDeck() {
        const { key } = this.props.navigation.state.params
        const { deck } = this.state
        getDecks().then((results) => {
            const newDeck = results[key]
            console.log("_getDeck(): new deck = deck? ", deck === newDeck)
            if (deck === null || (deck.questions.length != newDeck.questions.length)) {
                this.setState({
                    deck: newDeck,
                    isReady: true
                })
            }

        })
    }


    render() {
        const { navigation } = this.props
        const { key } = navigation.state.params
        const { deck, isReady } = this.state
        // TODO: error handling if we don't get a valid dec
        if (isReady === false) return (<AppLoading/>)

        return(
            <View  style={{backgroundColor: '#ccc', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} cards</Text>

                <TouchableOpacity style={{backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                    onPress={() => navigation.navigate(
                        'AddQuestion',
                        { key: key}
                    )}><Text>Add Card</Text></TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#000', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                    onPress={() => navigation.navigate(
                        'QuizView',
                        { key: key}
                    )}><Text style={{color: '#fff'}}>Start Quiz</Text></TouchableOpacity>

            </View>
        )
    }

}

export default Deck