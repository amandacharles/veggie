import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Main from './Main'
import Restaurant from './Restaurant'
import axios from 'axios';

// const config = {
//   headers: {
//     Authorization: `Bearer ${F8rgwQR1sfY1mJPE-2UVbj_A1eqjpyOD}`
//   }
// }
//
// componentDidMount(){
//   axios.get('https://api.yelp.com/v3/businesses/search?term=Sushi&location=Boston', config)
//   .then(function(res){
//       console.log(res)
//   })
//   .catch(function(err){
//       console.log(err)
//   })
// }

class ListView extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const RestaurantRoute = {
      component: Restaurant,
      title: 'Restaurant',
      // passProps: { myProp: 'bar' }
    };
    return(
      <View>
      <TouchableHighlight onPress={() => this._handleNextPress(RestaurantRoute)}>
        <Text style={{marginTop: 300, alignSelf: 'center'}}>
          {/* See you on the other nav {this.props.myProp}! */}
          click me to go to page for an individual Restaurant
        </Text>
      </TouchableHighlight>
    </View>
    );
  }
}





export default ListView;
