import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import { Constants, AppLoading } from 'expo'

class Deck extends Component {
    static navigationOptions = {
        title: 'Quiz',
      };

    state = {
        deck: null,
        isReady: false
    }
    componentDidMount() {
       this._getDeck()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.screenProps.reloadDecks) {
            this._getDeck()
        }
    }
    _getDeck() {
        const { key } = this.props.navigation.state.params
        getDecks().then((results) => {
            const newDeck = results[key]
            this.setState({
                deck: newDeck,
                isReady: true
            })
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
                        {key: key}
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