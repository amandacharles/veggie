import React, { Component, PropTypes } from 'react';
import { SegmentedControlIOS, Text, NavigatorIOS, View, TouchableHighlight, Switch, ScrollView, Linking } from 'react-native';
import { Button, CardSection, Input, Spinner, Card } from './common';
import Main from './Main'
import Item from './Item'
import Restaurant from './Restaurant'
import axios from 'axios';


class ListView extends Component {
  constructor(props){
    super(props)

  this.state = {
    latitude: 45.786882,
    longitude: -122.399832,
    openNow: true,
    price: '1,2,3,4',
    values: ['One', 'Two', 'Three'],
    selectedIndex: 0,
    results: [],

  }
  this.setPriceRange = this.setPriceRange.bind(this);
  this.componentWillMount = this.componentWillMount.bind(this)
  this.renderRestaurantList = this.renderRestaurantList.bind(this)
  this.callApi = this.callApi.bind(this);
}

callApi(){
  axios.get(`https://api.yelp.com/v3/businesses/search?categories=vegan,restaurants&latitude=${this.state.latitude}&longitude=${this.state.longitude}&open_now=${this.state.openNow}&price=${this.state.price}`,
    {headers: {
    'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
  }
})
  .then((res) => {
      console.log(res.data.businesses)
      // let idNames = res.data.businesses.map(result => result.id)
      this.setState({ results: res.data.businesses })
  })
  .catch(function(err){
      console.log(err)
  })
}

componentWillMount(){
  navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }
  )
  this.callApi()
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
}

renderRestaurantList(){
  return this.state.results.map(result => <Item key={result.id} result={result}>{result.name}</Item>)
}

  render() {
    const RestaurantRoute = {
      component: Restaurant,
      title: 'Restaurant',
    }
    return(
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <ScrollView>

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
          <Button onPress={this.callApi}>Reload</Button>
        </View>

      {this.renderRestaurantList()}
    </ScrollView>
    </View>
    );
  }
}

export default ListView;
