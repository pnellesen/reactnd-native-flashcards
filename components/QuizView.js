import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDeck, setDeckCompletedDate } from '../utils/helpers'
import { AppLoading } from 'expo'
import { white, blue, red, green, lightGray, black } from '../utils/colors'


class QuizView extends Component {
    static navigationOptions = {
        title: 'Question/Answer Card',
      };

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
            const numberLeft = totalQuestions - numberAnswered - 1
            return(
                <View style={styles.mainWrapper}>

                    <Text style={{fontSize:30}}>{deck.title}</Text>

                    <View style={styles.container}>
                        <Text style={{margin: 10, fontSize:16}}>Question {numberAnswered + 1} ({numberLeft} remaining)</Text>
                        <Text style={{margin: 10, fontSize:24}}>{question}</Text>

                        { showAnswer && <Text style={{margin: 10, fontSize:16}}>{answer}</Text> }

                        <TouchableOpacity
                            style={[styles.buttonCommon, { padding:0, backgroundColor: lightGray, borderColor:lightGray}]}
                            onPress={ () => this._toggleShowAnswer(numberAnswered) }>
                            <Text style={{color:blue}}>{showAnswer ? `Hide` : `Show`} Answer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[{ backgroundColor: green}, styles.buttonCommon]}
                            onPress={ () => this._answerQuestion(true, numberAnswered) }>
                            <Text style={{color: white}}>Correct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[{ backgroundColor: red}, styles.buttonCommon]}
                            onPress={ () => this._answerQuestion(false, numberAnswered) }>
                            <Text style={{color: white}}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {

            return (
                <View style={styles.mainWrapper}>

                    <Text style={{fontSize:30}}>{deck.title}</Text>

                    <View style={styles.container}>
                        <Text style={{fontSize:24}}>Quiz complete!</Text>
                        <Text style={{marginTop: 10, marginBottom: 10, fontSize:16}}>Your score:  { numberCorrect } correct out of { totalQuestions } total</Text>
                        <TouchableOpacity
                            style={[{ backgroundColor: white }, styles.buttonCommon]}
                            onPress={ () => this._setStateFromDeck() }>
                            <Text>Restart Quiz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[{ backgroundColor: blue }, styles.buttonCommon]}
                            onPress={ () => navigation.navigate('Deck',{ key: key }) }>
                            <Text style={{ color: white }}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}

export default QuizView

const styles = StyleSheet.create({
    mainWrapper: {
        alignItems:'center',
        marginTop:20
    },
    container: {
        alignItems: 'center',
        backgroundColor: lightGray,
        marginTop: 20,
        margin:10,
        padding: 10,
        borderRadius: 5,
        borderWidth:1,
        borderColor:black,
        width:350
    },
    buttonCommon: {
        margin:10,
        padding: 10,
        borderRadius: 5,
        width:200,
        alignItems:'center'
    }
  });