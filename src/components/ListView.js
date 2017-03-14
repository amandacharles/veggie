import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Main from './Main'
import Restaurant from './Restaurant'
import axios from 'axios';


class ListView extends Component {


  componentDidMount(){
    axios.get('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', {headers: {
      'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
    }})
    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
    })
  }

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
