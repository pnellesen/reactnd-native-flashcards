import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDecks, addDeck } from '../utils/helpers'

class NewDeckView extends Component {

    static navigationOptions = {
        title: 'Add New Deck',
      };

    state = {
        titleList: [],
        newDeckTitle: ''

    }
    componentDidMount() {
        getDecks()
            .then((result) => {
                this.setState({
                    titleList: Object.keys(result).map((deck) => { return result[deck].title })
                })
            })
    }

    handleTextChange = (newTitle) => {
        this.setState({
            newDeckTitle: newTitle
        })
    }

    _addNewDeck = () => {
        const { navigation } = this.props
        const newTitle = this.state.newDeckTitle
        addDeck(newTitle)
        this.setState({
            newDeckTitle: ''
        })
        if (this.props.screenProps.reloadDecks === false) this.props.screenProps.setReloadDecks(true)
        navigation.navigate('Deck', {key: newTitle})
    }

    render() {
        const {newDeckTitle} = this.state
        return (
            <KeyboardAvoidingView behavior='padding'>
                <Text>New Deck View here</Text>
                <Text>Add the title of your new Deck below:</Text>
                <TextInput
                    value={newDeckTitle}
                    onChangeText={this.handleTextChange}
                    placeholder={'New Title'}
                    style={{borderWidth: 1,margin:10,fontSize:30,borderRadius:5}}
                    />
                <TouchableOpacity style={{backgroundColor: '#000', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={this._addNewDeck}><Text style={{color: '#fff'}}>Submit</Text></TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default NewDeckView