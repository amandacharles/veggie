import React, { Component, PropTypes } from 'react';
import { SegmentedControlIOS, Text, NavigatorIOS, View, TouchableHighlight, Switch } from 'react-native';
import { Button, CardSection, Input, Spinner, Card } from './common';
import Main from './Main'
import Restaurant from './Restaurant'
import axios from 'axios';


class ListView extends Component {

  state = {
    latitude: 37.786882,
    longitude: -122.399972,
    openNow: true,
    price: '1,2,3,4',
    values: ['One', 'Two', 'Three'],
    selectedIndex: 0
  }

  componentDidMount(){
    axios.get(`https://api.yelp.com/v3/businesses/search?term=vegan&latitude=${this.state.latitude}&longitude=${this.state.longitude}&open_now=${this.state.openNow}&price=${this.state.price}`,
      {headers: {
      'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
    }})
    .then(function(res){
        console.log(res.data.businesses)

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

  setPriceRange(index){
    const values = ['1,2,3,4', '1', '2,3','4']
  for ( let i =0; i <values.length; i++ ){
    if(index === i){
      this.setState({
        price: values[i]
      })
    }
  }
  console.log(this.state.price);
}

onButtonPress(){
  axios.get(`https://api.yelp.com/v3/businesses/search?term=vegan&latitude=${this.state.latitude}&longitude=${this.state.longitude}&open_now=${this.state.openNow}&price=${this.state.price}`,
    {headers: {
    'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
  }})
  .then(function(res){
      console.log(res.data.businesses)

  })
  .catch(function(err){
      console.log(err)
  })
}

  render() {
    const RestaurantRoute = {
      component: Restaurant,
      title: 'Restaurant',
      // passProps: { myProp: 'bar' }
    };
    return(
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

        <View style={{borderWidth: 1}}>
          <Switch
            onValueChange={(value) => this.setState({openNow: value})}
            value={this.state.openNow} />
        </View>

          <View style={{marginBottom: 10}}>
          <SegmentedControlIOS tintColor="#ff0000" values={['1,2,3,4', '1', '2,3','4']}
            selectedIndex={this.state.selectedIndex}
             onChange={(event) => {
      this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex })
        this.setPriceRange(event.nativeEvent.selectedSegmentIndex)
                      }} />
        </View>

        <View style={{borderWidth: 1, height:30}}>
          <Button onPress={this.onButtonPress.bind(this)}>Reload</Button>
        </View>

      <TouchableHighlight onPress={() => this._handleNextPress(RestaurantRoute)}>
        <Text style={{marginTop: 100}}>
          {/* See you on the other nav {this.props.myProp}! */}
          click me to go to page for an individual Restaurant
        </Text>
      </TouchableHighlight>
    </View>
    );
  }
}

export default ListView;
