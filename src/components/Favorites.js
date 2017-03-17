import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as firebase from 'firebase';


class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      favorites: []
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.showFavorites = this.showFavorites.bind(this)
  }

  componentWillMount(){
    const database = firebase.database();
    itemsRef = database.ref('favorites');
    let snapArray = [];

    itemsRef.on('value', (snap) => {
      snap.val()
    });


    itemsRef.once('value', function (snap) {
      snap.forEach(function (childSnap) {
        snapArray.push(childSnap.val())
      });
    })

    this.setState({
      favorites: snapArray
    })
  }





showFavorites(){
    return this.state.favorites.map(favorite => {
      <View style={{height: 30, borderWidth: 10, borderColor: 'red'}}>
        <Text>{favorite.name}</Text>
      </View>
    })
    console.log(favorite.name);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', borderWidth: 5}}>
          {this.showFavorites}
      </View>
    );
  }
}


export default Favorites;
