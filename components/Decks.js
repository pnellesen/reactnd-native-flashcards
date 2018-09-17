import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'

_onPress = (key, navigation) => {
    console.log("Get deck for: ", key)

    //This will take us to the Deck component
}

class Decks extends Component {
    render() {
        //console.log("props? ", this.props)
        const { deckList } = this.props.screenProps
        const { navigation } = this.props
        console.log("Navigate? ", navigation)
        return (
            <View>
                <Text style={{color:'#000'}}>Deck List View here</Text>
                {
                    Object.keys(deckList).map((key) => {
                        return (
                            <TouchableOpacity key={key} style={{backgroundColor: '#ccc', margin:10, padding: 10,borderRadius: 5, borderWidth:1, borderColor:'#000'}}
                                onPress={() => navigation.navigate(
                                    'Deck',
                                    { key: key}
                                )}>
                                <Text>{deckList[key].title}</Text>
                                <Text>{deckList[key].questions.length} cards</Text>
                            </TouchableOpacity>

                        )

                    })
                }
            </View>
        )
    }
}

export default Decks