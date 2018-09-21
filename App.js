import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import Deck from './components/Deck'
import { white, purple }from './utils/colors'
import NewDeckView from './components/NewDeckView'
import QuizView from './components/QuizView'
import NewCardView from './components/NewCardView'
import { Constants } from 'expo'

function DecksStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

/**
 * TODO: create a StackNavigator to go through the questions in a Deck,
 * use the navigate in Decks.js to go to the deck the user selects.
 */

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions:{
      tabBarLabel: 'Deck List View'
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'Add New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    //activeTintColor: Platform.OS === 'ios' ? purple : white,
    activeTintColor: "#000",
    inactiveTintColor: "#ccc",
    //showIcon: true,
    style: {
      height: 56,
      //backgroundColor: Platform.OS === 'ios' ? white : purple,
      backgroundColor: "#fff",
      shadowRadius: 6,
      shadowOpacity: 1,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
          width: 0,
          height: 3
      }
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddQuestion: {
    screen:NewCardView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})


export default class App extends React.Component {
  state={
    reloadDecks: false
  }

  _setReloadDecks = (value) => {
    this.setState({reloadDecks: value})
  }

  render() {

    return (
      <View style={styles.container}>
        <DecksStatusBar backgroundColor={'#ccc'}/>
        <MainNavigator screenProps={{setReloadDecks: this._setReloadDecks, reloadDecks: this.state.reloadDecks}}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
