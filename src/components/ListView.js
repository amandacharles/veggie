import React, { Component, PropTypes } from 'react';
import { SegmentedControlIOS, Text, NavigatorIOS, View, TouchableHighlight, Switch, ScrollView, Linking, StyleSheet, Image } from 'react-native';
import { Button, CardSection, Input, Spinner, Card, Clickable } from './common';
import Main from './Main'
import Item from './Item'
import Restaurant from './Restaurant'
import axios from 'axios';
import Favorites from './Favorites'
import * as firebase from "firebase";

const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18
    },
    thumbNailStyle: {
      height: 50,
      width: 50
    },
    thumbNailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      padding: 1
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    },
  }

  const { thumbNailStyle,
    headerContentStyle,
    thumbNailContainerStyle,
    headerTextStyle,
    imageStyle
    } = styles;


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
    FavoritesRoute: {
      component: Favorites,
      title: "Favorites",
    }

  }
  this.setPriceRange = this.setPriceRange.bind(this);
  this.componentWillMount = this.componentWillMount.bind(this)
  this.renderRestaurantList = this.renderRestaurantList.bind(this)
  this.callApi = this.callApi.bind(this);
  this._handleBackPress = this._handleBackPress.bind(this);
  this._handleNextPress = this._handleNextPress.bind(this);
  this.sendToDatabase = this.sendToDatabase.bind(this);
}

sendToDatabase(display_phone, image_url, name, price, rating, id, url) {
  const userId = firebase.auth().currentUser.uid;
  var database = firebase.database();

 firebase.database().ref('favorites/').push({
   phone: display_phone,
   photo: image_url,
   name: name,
   price: price,
   rating: rating,
   id: id,
   url: url
 })
 this._handleNextPress(this.state.FavoritesRoute)
}


callApi(){
  axios.get(`https://api.yelp.com/v3/businesses/search?categories=vegan,restaurants,vegetarian&latitude=${this.state.latitude}&longitude=${this.state.longitude}&open_now=${this.state.openNow}&price=${this.state.price}&limit=50&radius=30000`,
    {headers: {
    'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
  }
})
  .then((res) => {
    let veggieArray = [];

    for (let i = 0; i < res.data.businesses.length; i++) {
      let categoriesArray = res.data.businesses[i].categories
        categoriesArray.map(category => {
          console.log(category.alias);
          if(category.alias === 'vegetarian' ||
          category.alias === 'vegan' ||
          category.alias === 'thai' ||
          category.alias === 'indian' ||
          category.alias === 'mediterranean' ||
          category.alias === 'asianfusion'
        ){
            veggieArray.push(res.data.businesses[i])
          }
        })
       }

      this.setState({ results: veggieArray})
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
  return this.state.results.map(result =>
    <Card key={result.id}>
        <CardSection>
          <View style={thumbNailContainerStyle}>
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{ result.name }</Text>
            <Text>{result.display_phone}   Rating:{result.rating}/5</Text>
          </View>
          <View style={{alignItems: "flex-end"}}>
            <TouchableHighlight onPress={()=>this.sendToDatabase(result.display_phone, result.image_url, result.name, result.price, result.rating, result.id, result.url)}>


          <Image
          style={thumbNailStyle}
          source={{ uri: result.image_url }}/>

  </TouchableHighlight>
    </View>
      </CardSection>
      <CardSection>

      </CardSection>
      <Clickable onPress={()=> Linking.openURL(result.url)}>
      <CardSection>
        <Image style={imageStyle} source={{ uri: result.image_url }}/>
      </CardSection>
    </Clickable>
      </Card>
  )
}

  render() {



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
