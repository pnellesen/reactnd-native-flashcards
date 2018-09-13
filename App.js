import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import NewDeckView from './components/NewDeckView'
import { Constants } from 'expo'

function DecksStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen:Decks,
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

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <DecksStatusBar backgroundColor={'#ccc'}/>
        <Tabs/>
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
