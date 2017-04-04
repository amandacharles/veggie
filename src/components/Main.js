import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, Image } from 'react-native';
import * as firebase from "firebase";
import { Button, Card, CardSection } from './common';
import LoginForm from './LoginForm';
import ListView from './ListView';
import TheMap from './TheMap';
import Favorites from './Favorites'
import { Components } from 'expo';
const { LinearGradient } = Components;

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
      passProps: { tintColor: '#256B12'}
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
      <Image source={require('./bgtfGlow.png')} style={{flex:1, justifyContent:'flex-end', resizeMode: 'cover', width: null, height: null}}>
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

           <View style={{width: 300, alignSelf: 'center'}}>


         <LinearGradient style={{marginBottom: 5, borderRadius:8}} colors={['#256B12', '#6CB359']}>
             <TouchableHighlight onPress={() => this._handleNextPress(ListViewRoute)}
             style={{height: 70, backgroundColor: 'transparent', justifyContent: 'center'}}>
             <Text style={{backgroundColor: 'transparent', color: 'white', textAlign: 'center', fontSize: 30}}>
               Search
             </Text>
           </TouchableHighlight>
         </LinearGradient>

         <LinearGradient style={{marginBottom: 5, borderRadius:8}} colors={['#0D5146', '#43877C']}>
           <TouchableHighlight onPress={() => this._handleNextPress(MapViewRoute)}
             style={{height: 70, backgroundColor: 'transparent', justifyContent: 'center'}}>
             <Text style={{backgroundColor: 'transparent', color: 'white', textAlign: 'center', fontSize: 30}}>
               Map
             </Text>
           </TouchableHighlight>
         </LinearGradient>
           <LinearGradient style={{marginBottom: 8, borderRadius:8}} colors={['#152D54', '#4D658D']}>
         <TouchableHighlight
           onPress={() => this._handleNextPress(FavoritesRoute)}
           style={{height: 70, backgroundColor: 'transparent', justifyContent: 'center'}}>
           <Text style={{backgroundColor: 'transparent', color: 'white', textAlign: 'center', fontSize: 30}}>
             Favorites
           </Text>
         </TouchableHighlight>
       </LinearGradient>
       </View>

{/* <LinearGradient colors={['#152D54', '#051938']}> */}
 <View style={{alignSelf: 'stretch', alignItems: 'flex-end', backgroundColor: 'transparent'}}>
  <TouchableHighlight onPress={() => this.setState({ loggedIn: null})}>
    <Text style={{backgroundColor: 'transparent', color: 'white', textAlign: 'flex-end', marginBottom: 8, marginRight: 20}}>
      LogOut
    </Text>
  </TouchableHighlight>
</View>
{/* // </LinearGradient> */}
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
