import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import { blue, white, lightGray, black, gray } from '../utils/colors'
import { AppLoading } from 'expo'

class Deck extends Component {
    static navigationOptions = {
        title: 'Quiz',
      };

    state = {
        deck: null,
        isReady: false,
        submitDisabled: true
    }
    componentDidMount() {
       this._getDeck()
    }

    componentWillReceiveProps(nextProps) {
        nextProps.screenProps.reloadDecks && this._getDeck()
    }

    _getDeck() {
        const { key } = this.props.navigation.state.params
        getDecks().then((results) => {
            const newDeck = results[key]
            this.setState({
                deck: newDeck,
                isReady: true,
                submitDisabled: newDeck.questions.length > 0 ? false : true
            })
        })
    }

    render() {
        const { navigation } = this.props
        const { key } = navigation.state.params
        const { deck, isReady, submitDisabled } = this.state

        if (isReady === false) return (<AppLoading/>)

        return(
            <View  style={styles.container}>
                <Text style={{fontSize:30}}>{deck.title}</Text>
                <Text style={{fontSize: 18, marginTop:10, marginBottom: 10}}>{deck.questions.length} card{deck.questions.length !== 1 && 's'}</Text>

                <TouchableOpacity style={[{backgroundColor: white}, styles.buttonCommon]}
                    onPress={() => navigation.navigate(
                        'AddQuestion',
                        {key: key}
                    )}><Text>Add Card</Text></TouchableOpacity>

                <TouchableOpacity
                    style={[{ backgroundColor: this.state.submitDisabled ? gray : blue}, styles.buttonCommon]}
                    disabled={ submitDisabled }
                    onPress={() => navigation.navigate(
                        'QuizView',
                        { key: key}
                    )}><Text style={{color: this.state.submitDisabled ? lightGray : white}}>Start Quiz</Text></TouchableOpacity>

            </View>
        )
    }

}

export default Deck

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: lightGray,
        margin:10,
        marginTop:40,
        padding: 10,
        borderRadius: 5,
        borderWidth:1,
        borderColor:black
    },
    buttonCommon: {
        margin:10,
        padding: 10,
        borderRadius: 5,
        width:200,
        alignItems:'center'
    }
  });