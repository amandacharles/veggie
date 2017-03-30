import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, Image } from 'react-native';
import * as firebase from "firebase";
import { Button, Card, CardSection } from './common';
import LoginForm from './LoginForm';
import ListView from './ListView';
import TheMap from './TheMap';
import Favorites from './Favorites'

class Main extends Component {

    state = {
      loggedIn: null
    };

    componentWillMount() {
      firebase.initializeApp({
    apiKey: "AIzaSyBHkdBnBRtJu7iemE-LgPdAEXlIFJYsglA",
    authDomain: "vegfinder2.firebaseapp.com",
    databaseURL: "https://vegfinder2.firebaseio.com",
    storageBucket: "vegfinder2.appspot.com",
    messagingSenderId: "482427935869"
  });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const ListViewRoute = {
      component: ListView,
      title: 'Search',
      tintColor: '#256B12',
      passProps: {tintColor: '#256B12'}

    };
    const MapViewRoute = {
      component: TheMap,
      title: "Map",
      tintColor: '#256B12',
      passProps: {tintColor: '#256B12'}
    }
    const FavoritesRoute = {
      component: Favorites,
      title: 'Favorites',
      tintColor: '#256B12',
      passProps: {tintColor: '#256B12'}
    }

    return(
      <Image source={require('./bgtf.png')} style={{flex:1, justifyContent:'flex-end', resizeMode: 'cover', width: null, height: null}}>
        <View>
      { (this.state.loggedIn) ?
         ( <View>

           {/* <View >
  <View style={{height: 50 ,marginBottom: 10, marginRight: 30, marginLeft: 30}}>
    <Button onPress={() => this._handleNextPress(MapViewRoute)}>
      <Text>
        MAP
      </Text>
    </Button>
  </View>

  <View style={{height: 50 ,marginBottom: 10, marginRight: 30, marginLeft: 30}}>
  <Button onPress={() => this._handleNextPress(ListViewRoute)}>
    <Text>
      SEARCH
    </Text>
  </Button>
</View>
<View style={{height: 50, marginBottom: 10, marginRight: 30, marginLeft: 30}}>
<Button onPress={() => this._handleNextPress(FavoritesRoute)}>
  <Text>
    FAVORITES
  </Text>
</Button>
</View>
</View> */}

           <View>
             <TouchableHighlight onPress={() => this._handleNextPress(MapViewRoute)}
             style={{height: 80, backgroundColor: '#246C60', justifyContent: 'center'}}>
             <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
               Map
             </Text>
           </TouchableHighlight>
             <TouchableHighlight onPress={() => this._handleNextPress(ListViewRoute)}
             style={{height: 80, backgroundColor: '#448F30', justifyContent: 'center'}}>
             <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
               Search
             </Text>
           </TouchableHighlight>
         <TouchableHighlight
           onPress={() => this._handleNextPress(FavoritesRoute)}
           style={{height: 70, backgroundColor: '#2C4770', justifyContent: 'center'}}>
           <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
             Favorites
           </Text>
         </TouchableHighlight>
       </View>

<View style={{alignSelf: 'stretch', alignItems: 'flex-end', backgroundColor: '#2C4770'}}>
  <TouchableHighlight onPress={() => this.setState({ loggedIn: null})}>
    <Text style={{color: 'white', textAlign: 'flex-end', marginBottom: 8, marginRight: 20}}>
      LogOut
    </Text>
  </TouchableHighlight>
</View>
</View>

     )
      :
      (
        <View  >
        <LoginForm style={{justifyContent: 'center'}}/>
      </View>
      )
    }
  </View>
</Image>
    );
  }
}

const styles = {
  mainButtonStyle: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    marginBottom: 5,
    marginRight:35,
    marginLeft: 35,

  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 30,
  }
}


export default Main;
