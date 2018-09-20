import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/helpers';

class Deck extends Component {
    static navigationOptions = ({ navigation}) => {
        //console.log("navigation? ", navigation)
        /*
        const { key } = navigation.state.params
        return {
            title: `${month}/${day}/${year}`
        }
        */
    }
    state = {
        deck: null,
        isReady: false
    }
    componentDidMount() {
        const { key } = this.props.navigation.state.params
        getDeck(key).then((results) => {
            this.setState({
                deck: results,
                isReady: true
            }, () => {
                console.log("Got deck: ", results)
            })
        })
        console.log("Deck mounted")
    }
    render() {
        const { navigation } = this.props
        const { key } = navigation.state.params
        //const { deckList } = this.props.screenProps
        const { deck, isReady } = this.state
        if (!deck) {
            console.log("No deck for key ", key)
            getDeck(key).then((results) => {
                this.setState({
                    deck: results,
                    isReady: true
                }, () => {
                    console.log("Got deck: ", results)
                })
            })
            return (<Text>Please wait...</Text>)
        }

        // TODO: error handling if we don't get a valid dec
        if (isReady === false) return (<Text>Please Wait...</Text>)

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