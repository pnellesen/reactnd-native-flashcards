import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/helpers'
import { Constants, AppLoading } from 'expo'

class QuizView extends Component {
    static navigationOptions = ({ navigation}) => {
        /*
        const { key } = navigation.state.params
        return {
            title: `${month}/${day}/${year}`
        }
        */
    }
    state = {
        numberCorrect: null,
        numberAnswered: null,
        totalQuestions: null,
        questionIndex: null,
        deck: {},
        isReady: false
    }


    /**
     * TODO: deck should only consist of those questions the user hasn't answered yet?
     * set questionIndex to index of first unanaswered
     */
    componentDidMount() {
        const {key} = this.props.navigation.state.params
        getDeck(key).then((result) => {

            this.setState({
                isReady: true,
                deck: result,
                totalQuestions: result.questions.length,
                numberCorrect: result.questions.filter((question) => {
                    return question.correct === true
                }).length,
                numberAnswered: result.questions.filter((question) => {
                    return question.correct !== null
                }).length
            }, () => {
                console.log('quiz view mounted - state? ', this.state)
            })

        })
    }



    _answerQuestion = (isCorrect, idx) => {
        // set correct for questions[idx] = isCorrect
        // get index of next unanswered question
        // this.setState({questionIndex: unansweredIndex})
    }


    render() {
        const { isReady, deck, numberAnswered, numberCorrect, totalQuestions } = this.state
        if (isReady === false) {
            return <AppLoading/>
        }
        const { navigation } = this.props
        const { key } = navigation.state.params
        //const { deckList } = this.props.screenProps


        // TODO: error handling if we don't get a valid dec


        // TODO: filter on deck.questions to display the nth unanswered one?
        // "When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view"

        if (numberAnswered < deck.questions.length) {
            return(
                <View>
                    <Text>{numberAnswered + 1}/{totalQuestions}</Text>
                    <Text>Quiz View for {deck.title} Here</Text>
                    <Text style={{margin: 10, fontSize:30}}>{deck.questions[numberAnswered].question}</Text>
                    <Text>[show answer button here]</Text>
                    <Text>[Correct button here]</Text>
                    <Text>[Incorrect button here]</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>All questions answered! Number correct/Total: {numberCorrect}/{totalQuestions}</Text>
                    <Text>[reset quiz button here - sets everything for this deck to null]</Text>
                    <Text>[Go back to Deck List View]</Text>
                </View>
            )
        }

    }
}

export default QuizView
