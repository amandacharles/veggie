import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
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
      title: 'ListView',
      // passProps: { myProp: 'bar' }
    };
    const MapViewRoute = {
      component: TheMap,
      title: "The Map"
    }
    const FavoritesRoute = {
      component: Favorites,
      title: 'Favorites'
    }

    return(
      <View style={{flex:1, justifyContent: 'center'}}>
        <View>
      { (this.state.loggedIn) ?
         ( <View>
           <TouchableHighlight
             onPress={() => this._handleNextPress(ListViewRoute)}
             style={styles.mainButtonStyle}>
           <Text style={{alignSelf: 'center'}}>
             {/* See you on the other nav {this.props.myProp}! */}
             click me to go to ListView
           </Text>
         </TouchableHighlight>

         <TouchableHighlight
           onPress={() => this._handleNextPress(FavoritesRoute)}
           style={styles.mainButtonStyle}>
           <Text style={{alignSelf: 'center'}}>
             {/* See you on the other nav {this.props.myProp}! */}
             click me to go to FAVORITES
           </Text>
         </TouchableHighlight>

         <TouchableHighlight onPress={() => this._handleNextPress(MapViewRoute)}
           style={styles.mainButtonStyle}>
           <Text style={{alignSelf: 'center'}}>
             {/* See you on the other nav {this.props.myProp}! */}
             click me to go to MapView
           </Text>
         </TouchableHighlight>
       </View>)

      : (
        <View  >
        <LoginForm style={{justifyContent: 'center'}}/>
      </View>
      )
    }
  </View>
    </View>
    );
  }
}

const styles = {
  mainButtonStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center'

  }
}


export default Main;
