import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDeck, addCard } from '../utils/helpers'
import { blue, gray } from '../utils/colors'

class NewCardView extends Component {
    static navigationOptions = {
        title: 'Add New Card',
      };

    state = {
        deck: null,
        newCardQuestion: '',
        newCardAnswer: '',
        isReady: false,
        submitDisabled:true

    }
    componentDidMount() {
        const { key } = this.props.navigation.state.params
        getDeck(key).then((results) => {
            console.log("Add Card for deck: ", results)
            this.setState({
                deck: results,
                isReady: true
            })
        })
    }

    handleNewQuestionChange = (newQuestion) => {
        this.setState({
            newCardQuestion: newQuestion
        }, () => {
            this._checkFields(newQuestion)
        })
    }

    handleNewAnswerChange = (newAnswer) => {
        this.setState({
            newCardAnswer: newAnswer
        }, () => {
            this._checkFields(newAnswer)
        })
    }

    // Disable submit button unless both question and answer fields have text in them
    _checkFields = (fieldText) => {
        fieldText.length > 0 ? (
            this.state.newCardAnswer.length > 0
            && this.state.newCardQuestion.length > 0
            && this.state.submitDisabled
            && this.setState({submitDisabled:false})
         ) : (
            this.setState({submitDisabled:true})
         )

    }

    _addNewCard = () => {
        const { navigation } = this.props
        const { deck, newCardQuestion, newCardAnswer } = this.state

        const newQuestions = deck.questions.concat({
            question: newCardQuestion.slice(-1) ==='?' ? newCardQuestion : newCardQuestion + '?',
            answer: newCardAnswer,
            correct: null,
            showAnswer: false
        })
        const newDeck = {
            ...deck,
            questions: newQuestions
        }

        addCard(newDeck).then(()=> {
            if (this.props.screenProps.reloadDecks === false) this.props.screenProps.setReloadDecks(true)
           navigation.navigate('Deck', {key: deck.id})
        })
    }

    render() {
        const { isReady, newCardQuestion, newCardAnswer, deck } = this.state

        if (isReady === false) return (<Text>Please wait...</Text>)

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{fontSize:24}}>{deck.title} - question {deck.questions.length + 1}</Text>
                <View style={{margin:10}}>
                    <Text>New Question below:</Text>
                    <TextInput
                        value={newCardQuestion}
                        onChangeText={this.handleNewQuestionChange}
                        placeholder={'New Question'}
                        placeholderTextColor={'#ccc'}
                        returnKeyType='done'
                        style={styles.inputStyle}
                        />
                </View>
                <View style={{margin:10}}>
                    <Text>New Answer below:</Text>
                    <TextInput
                        value={newCardAnswer}
                        onChangeText={this.handleNewAnswerChange}
                        placeholder={'New Answer'}
                        placeholderTextColor={'#ccc'}
                        returnKeyType='done'
                        multiline={true}
                        style={styles.inputStyle}
                        />
                </View>
                <TouchableOpacity
                    style={{backgroundColor: this.state.submitDisabled ? gray : blue, margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000', width:150, alignItems:'center'}}
                    onPress={this._addNewCard}
                    disabled={this.state.submitDisabled}>
                        <Text style={{color: '#fff'}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default NewCardView

const styles = StyleSheet.create({
    container: {alignItems: 'center', backgroundColor: '#ccc', margin:10, marginTop:40, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'},
    inputStyle: {borderWidth: 1,fontSize:18,borderRadius:5,backgroundColor:'#fff', width:300,padding:5,marginTop:5}
  });