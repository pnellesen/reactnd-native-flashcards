import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';



class Deck extends Component {
    static navigationOptions = ({ navigation}) => {
        console.log("navigation? ", navigation)
        /*
        const { key } = navigation.state.params
        return {
            title: `${month}/${day}/${year}`
        }
        */
    }
    render() {
        const { navigation } = this.props
        const { key } = navigation.state.params
        const { deckList } = this.props.screenProps


        // TODO: error handling if we don't get a valid dec

        return(
            <View  style={{backgroundColor: '#ccc', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}>
                <Text>{deckList[key].title}</Text>
                <Text>{deckList[key].questions.length} cards</Text>

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