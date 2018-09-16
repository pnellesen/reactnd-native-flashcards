import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import NewDeckView from './components/NewDeckView'
import { Constants, AppLoading } from 'expo'
import { getDecks } from './utils/helpers'

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
  state = {
    isReady: false,
    deckList: null

  }
  componentDidMount() {
    // We may want to do this in Decks component instead

    getDecks()
      .then((results) => {
        console.log("component didMount - results? ", results)
        this.setState({
          deckList: results,
          isReady: true
        })
      })
  }

  render() {
    const { isReady, deckList } = this.state

    if (isReady === false) {
      return <AppLoading/>
    }

    return (
      <View style={styles.container}>
        <DecksStatusBar backgroundColor={'#ccc'}/>
        <Text>Deck list: {JSON.stringify(deckList)}</Text>
        <Tabs deckList={deckList}/>
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
