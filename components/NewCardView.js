import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDeck, addDeck, addCard } from '../utils/helpers'

class NewCardView extends Component {
    state = {
        deck: null,
        newCardQuestion: null,
        newCardAnswer: null,
        isReady: false

    }
    componentDidMount() {
        const { key } = this.props.navigation.state.params
        getDeck(key).then((results) => {
            this.setState({
                deck: results,
                isReady: true
            })
        })
    }

    handleNewQuestionChange = (newQuestion) => {
        this.setState({
            newCardQuestion: newQuestion
        })
    }

    handleNewAnswerChange = (newAnswer) => {
        this.setState({
            newCardAnswer: newAnswer
        })
    }

    _addNewCard = () => {
        const { navigation } = this.props
        const { deck, newCardQuestion, newCardAnswer } = this.state

        //addDeck(newTitle)
        const newQuestions = deck.questions.concat({
            question: newCardQuestion,
            answer: newCardAnswer,
            correct: null,
            showAnswer: false
        })
        const newDeck = {
            ...deck,
            questions: newQuestions
        }

        addCard(newDeck).then(()=> {
            navigation.navigate('Deck', {key: deck.title})
        })



    }

    render() {
        const { isReady, newCardQuestion, newCardAnswer } = this.state

        if (isReady === false) return (<Text>Please wait...</Text>)

        return (
            <KeyboardAvoidingView behavior='padding'>
                <Text>New Card View here</Text>
                <View style={{margin:10}}>
                    <Text>New Question below:</Text>
                    <TextInput
                        value={newCardQuestion}
                        onChangeText={this.handleNewQuestionChange}
                        placeholder={'New Question'}
                        style={{borderWidth: 1,margin:10,fontSize:22,borderRadius:5}}
                        />
                </View>
                <View style={{margin:10}}>
                    <Text>New Answer below:</Text>
                    <TextInput
                        value={newCardAnswer}
                        onChangeText={this.handleNewAnswerChange}
                        placeholder={'New Answer'}
                        style={{borderWidth: 1,margin:10,fontSize:22,borderRadius:5}}
                        />
                </View>
                <TouchableOpacity style={{backgroundColor: '#000', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={this._addNewCard}><Text style={{color: '#fff'}}>Submit</Text></TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default NewCardView