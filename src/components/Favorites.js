import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase'


class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }


componentDidMount(){

  const database = firebase.database()
  const userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/favorites/' + userId).once('value').then((snapshot) => {
  // this.setState({
  //   name: snapshot.val().name
  // })
  console.log(userId);
  console.log(snapshot);
 })
}

  render() {
    return(
      <View>
        <Text style={{fontSize: 30, paddingTop: 100 }}>
          This is the Favorites component
        </Text>

    </View>
    );
  }
}


export default Favorites;
