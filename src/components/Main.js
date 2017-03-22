import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, Image } from 'react-native';
import { Button, Card, CardSection } from './common';
import LoginForm from './LoginForm';
import ListView from './ListView';
import TheMap from './TheMap';
import Favorites from './Favorites'
import * as firebase from "firebase";



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
      // passProps: { myProp: 'bar' }
    };
    const MapViewRoute = {
      component: TheMap,
      title: "Map"
    }
    const FavoritesRoute = {
      component: Favorites,
      title: 'Favorites'
    }

    return(
      <Image source={require('./gheart.png')} style={{flex:1, resizeMode: 'contain',  justifyContent: 'center', width: null, height: null}}>
        <View>
      { (this.state.loggedIn) ?
         ( <View style={styles.buttonContainer}>
           <TouchableHighlight
             onPress={() => this._handleNextPress(ListViewRoute)}
             style={styles.mainButtonStyle}>
             <Text style={styles.textStyle}>
               Search
             </Text>
           </TouchableHighlight>
           <TouchableHighlight onPress={() => this._handleNextPress(MapViewRoute)}
             style={styles.mainButtonStyle}>
             <Text style={styles.textStyle}>
               Map
             </Text>
           </TouchableHighlight>
         <TouchableHighlight
           onPress={() => this._handleNextPress(FavoritesRoute)}
           style={styles.mainButtonStyle}>
           <Text style={styles.textStyle}>
             Favorites
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
</Image>
    );
  }
}

const styles = {
  mainButtonStyle: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    justifyContent: 'center',
    marginBottom: 5,
    marginRight:5,
    marginLeft: 5,

  },
  buttonContainer: {
    flex: 1,
    height: 30,
    justifyContent: 'space-between',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 30,
  }
}


export default Main;
