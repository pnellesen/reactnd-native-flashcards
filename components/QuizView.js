import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/helpers'
import { Constants, AppLoading } from 'expo'
import dummyData from '../utils/dummyData';

class QuizView extends Component {
    static navigationOptions = ({ navigation}) => {
        /*
        const { key } = navigation.state.params
        return {
            title: `${month}/${day}/${year}`
        }
        */
    }
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


    /**
     * TODO: deck should only consist of those questions the user hasn't answered yet?
     * set questionIndex to index of first unanaswered
     */
    componentDidMount() {
        this._setStateFromDeck()
    }

    _setStateFromDeck = () => {
        const {key} = this.props.navigation.state.params
        getDeck(key).then((result) => {
            console.log("quiz info pulled from AsyncStorage: ", result)
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
                console.log('quiz info retrieved - state? ', this.state)
            })

        })
    }

    _restartQuiz = () => {

        this._setStateFromDeck()

        /*
        const { deck } = this.state
        deck.questions.map((question, idx) => {
            deck.questions[idx].correct = null
            deck.questions[idx].showAnswer = false
        })
        this.setState({
            deck: deck,
            numberCorrect: deck.questions.filter((question) => {
                return question.correct === true
            }).length,
            numberAnswered: deck.questions.filter((question) => {
                return question.correct !== null
            }).length
        }, () => {
            console.log("Question answered - new state? ", this.state)
        })
        */

    }

    _toggleShowAnswer = (idx) => {
        const { deck } = this.state
        deck.questions[idx].showAnswer = !deck.questions[idx].showAnswer;
        this.setState({
            deck: deck
        })
    }

    _answerQuestion = (isCorrect, idx) => {

        const { deck } = this.state
        deck.questions[idx].correct = isCorrect;
        this.setState({
            deck: deck,
            numberCorrect: deck.questions.filter((question) => {
                return question.correct === true
            }).length,
            numberAnswered: deck.questions.filter((question) => {
                return question.correct !== null
            }).length
        }, () => {
            console.log("Question answered - new state? ", this.state)
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
                    {showAnswer &&
                        <Text style={{margin: 10, fontSize:16}}>{answer}</Text>
                    }
                     <TouchableOpacity style={{backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => this._toggleShowAnswer(numberAnswered)}><Text>{showAnswer ? `Hide` : `Show`} Answer</Text></TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => this._answerQuestion(true, numberAnswered)}><Text>Correct</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => this._answerQuestion(false, numberAnswered)}><Text>Incorrect</Text></TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>All questions answered! Number correct/Total: {numberCorrect}/{totalQuestions}</Text>
                    <TouchableOpacity style={{backgroundColor: '#fff', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => this._restartQuiz()}><Text>Restart Quiz</Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#000', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => navigation.navigate(
                                    'Deck',
                                    { key: key}
                                )}><Text style={{color: '#fff'}}>Back to Deck</Text></TouchableOpacity>
                </View>
            )
        }

    }
}

export default QuizView
