import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import Deck from './components/Deck'
import { black, white, purple, lightGray, lightPurp }from './utils/colors'
import NewDeckView from './components/NewDeckView'
import QuizView from './components/QuizView'
import NewCardView from './components/NewCardView'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import { Ionicons } from '@expo/vector-icons'

function DecksStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions:{
      tabBarLabel: 'Quiz List',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={23} color={tintColor}/>
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'Add New Quiz',
      tabBarIcon: ({ tintColor }) => <Ionicons name='logo-buffer' size={23} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    //activeTintColor: Platform.OS === 'ios' ? purple : white,
    activeBackgroundColor: purple,
    activeTintColor: white,
    inactiveBackgroundColor: white,
    inactiveTintColor: lightGray,
    labelStyle: {
      fontSize:14
    },
    style: {
      height: 45,
      //backgroundColor: Platform.OS === 'ios' ? white : purple,
      backgroundColor: white,
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
    navigationOptions: {
      title: 'UdaciCards',
      fontSize: 14,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
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

  componentDidMount() {
    setLocalNotification()
  }

  _setReloadDecks = (value) => {
    this.setState({reloadDecks: value})
  }

  render() {

    return (
      <View style={styles.container}>
        <DecksStatusBar backgroundColor={lightGray}/>
        <MainNavigator screenProps={{setReloadDecks: this._setReloadDecks, reloadDecks: this.state.reloadDecks}}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
});
