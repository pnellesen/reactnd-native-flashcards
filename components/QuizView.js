import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck, setDeckCompletedDate } from '../utils/helpers'
import { Constants, AppLoading } from 'expo'


class QuizView extends Component {

    _getInitialState = () => {
        return {
            numberCorrect: null,
            numberAnswered: null,
            totalQuestions: null,
            questionIndex: null,
            deck: {},
            isReady: false
        }
    }

    state = this._getInitialState()

    componentDidMount() {
        this._setStateFromDeck()
    }

    _setStateFromDeck = () => {
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
            })
        })
    }

    _toggleShowAnswer = (idx) => {
        const { deck } = this.state
        deck.questions[idx].showAnswer = !deck.questions[idx].showAnswer;
        this.setState({
            deck: deck
        })
    }

    _answerQuestion = (isCorrect, idx) => {
        const { key } = this.props.navigation.state.params
        const { deck } = this.state
        deck.questions[idx].correct = isCorrect;
        const newNumberAnswered = deck.questions.filter((question) => {
            return question.correct !== null
        }).length;
        const newNumberCorrect = deck.questions.filter((question) => {
            return question.correct === true
        }).length;
        this.setState({
            deck: deck,
            numberCorrect: newNumberCorrect,
            numberAnswered: newNumberAnswered
        }, () => {
            if (newNumberAnswered === deck.questions.length) {// Reset daily notification, and reload Decks to remove daily reminder notice
                setDeckCompletedDate(key).then(() => {
                    this.props.screenProps.setReloadDecks(true)
                })
            }
        })

    }

    render() {
        const { navigation } = this.props
        const { isReady, deck, numberAnswered, numberCorrect, totalQuestions } = this.state
        const { key } = this.props.navigation.state.params

        if (isReady === false) {
            return <AppLoading/>
        }

        // TODO: error handling if we don't get a valid dec

        if (numberAnswered < deck.questions.length) {
            const { showAnswer, question, answer } = deck.questions[numberAnswered]

            return(
                <View>
                    <Text>{numberAnswered + 1}/{totalQuestions}</Text>
                    <Text>Quiz View for {deck.title} Here</Text>
                    <Text style={{margin: 10, fontSize:30}}>{question}</Text>

                    { showAnswer && <Text style={{margin: 10, fontSize:16}}>{answer}</Text> }

                     <TouchableOpacity
                        style={{ backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000' }}
                        onPress={ () => this._toggleShowAnswer(numberAnswered) }>
                        <Text>{showAnswer ? `Hide` : `Show`} Answer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000' }}
                        onPress={ () => this._answerQuestion(true, numberAnswered) }>
                        <Text>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000' }}
                        onPress={ () => this._answerQuestion(false, numberAnswered) }>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {

            return (
                <View>
                    <Text>All questions answered! Number correct/Total: { numberCorrect }/{ totalQuestions }</Text>

                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000' }}
                        onPress={ () => this._setStateFromDeck() }>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: '#000', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000' }}
                        onPress={ () => navigation.navigate('Deck',{ key: key }) }>
                        <Text style={{ color: '#fff' }}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}

export default QuizView
