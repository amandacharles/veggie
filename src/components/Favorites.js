import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, ListView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as firebase from 'firebase';

class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      favorites: []
    }
    // this.componentWillMount = this.componentWillMount.bind(this)
    this.showFavorites = this.showFavorites.bind(this)
  }

  componentWillMount(){
    const self = this;
    const database = firebase.database();
    itemsRef = database.ref('favorites');
    let snapArray = [];

    itemsRef.on('value', (snap) => {
      snap.val()
      // console.log(snap.val());
    });
    itemsRef.once('value', function (snap) {
       snap.forEach(function (childSnap) {
        snapArray.push(childSnap.val())
        self.setState({
          favorites: snapArray
        })
      });
    })
  }

// showFavorites(){
//   console.log(this.state.favorites);
//     return this.state.favorites.map(favorite => {
//       <View style={{height: 30, borderWidth: 10, borderColor: 'red'}}>
//         <Text>{favorite.name}</Text>
//       </View>
//     })
//   }

showFavorites(){
    console.log(this.state.favorites.length);

    const favorites = this.state.favorites;

  Object.keys(favorites).map((key, index) => {
    console.log(key);
    let favorite = favorites[key];
    return
    <View>
    <Text>{favorite.name}</Text>
  </View>
  });
}

renderFavorite(fav) {
  console.log(fav);
  return <View>
    <Text>{fav.name}</Text>
  </View>
}


  render() {
    console.log(this.state.favorites);
    return (
      <View style={{flex: 1, justifyContent: 'center', borderWidth: 5}}>
          {/* {this.showFavorites()} */}
          {this.state.favorites.map(this.renderFavorite)}
      </View>
    );
  }
}


export default Favorites;
