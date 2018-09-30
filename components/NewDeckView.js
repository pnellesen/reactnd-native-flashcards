import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getDecks, addDeck } from '../utils/helpers'
import { blue, lightGray, gray, black, white } from '../utils/colors';

class NewDeckView extends Component {

    static navigationOptions = {
        title: 'Add New Deck',
      };

    state = {
        titleList: [],
        newDeckTitle: '',
        submitDisabled: true

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
            newDeckTitle: newTitle,
            submitDisabled: newTitle.length > 0 ? false : true
        })
    }

    _addNewDeck = () => {
        const { navigation } = this.props
        const newTitle = this.state.newDeckTitle
        this.setState({
            newDeckTitle: '',
            submitDisabled: true
        })
        addDeck(newTitle).then((newKey) => {
            if (this.props.screenProps.reloadDecks === false) this.props.screenProps.setReloadDecks(true)
            navigation.navigate('Deck', {key: newKey})
        })

    }

    render() {
        const {newDeckTitle} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={{fontSize:24, marginBottom:10}}>New Quiz</Text>
                <View style={{margin:10}}>
                <Text>Enter the title for your new Quiz below:</Text>
                <TextInput
                    value={newDeckTitle}
                    onChangeText={this.handleTextChange}
                    placeholder={'New Title'}
                    placeholderTextColor={lightGray}
                    returnKeyType='done'
                    style={styles.inputStyle}
                    />
                </View>
                <TouchableOpacity
                    style={[{ backgroundColor: this.state.submitDisabled ? gray : blue}, styles.buttonCommon]}
                    onPress={this._addNewDeck}
                    disabled={this.state.submitDisabled}>
                        <Text style={{color: this.state.submitDisabled ? lightGray : white}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default NewDeckView

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: lightGray,
        margin:10,
        marginTop:40,
        padding: 20,
        borderRadius: 5,
        borderWidth:1,
        borderColor:black
    },
    inputStyle: {
        borderWidth: 1,
        fontSize:18,
        borderRadius:5,
        backgroundColor: white,
        width:300,
        padding:5,
        marginTop:5,
        marginBottom:10
    },
    buttonCommon: {
        marginBottom:20,
        padding: 10,
        borderRadius: 5,
        width:200,
        alignItems:'center'
    }
  });