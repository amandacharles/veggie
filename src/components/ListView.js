import React, { Component, PropTypes } from 'react';
import { SegmentedControlIOS, Text, NavigatorIOS, View, TouchableHighlight, Switch, ScrollView, Linking, StyleSheet, Image, PickerIOS } from 'react-native';
import { Button, CardSection, Input, Spinner, Card, Clickable } from './common';
import * as firebase from "firebase";
import axios from 'axios';
import Main from './Main'
import Item from './Item'
import Restaurant from './Restaurant'
import Favorites from './Favorites'
import animalPicArray from './picLinks.js'
const PickerItemIOS = PickerIOS.Item;
import { Components } from 'expo';
const { LinearGradient } = Components;


class ListView extends Component {
  constructor(props){
    super(props)

    this.state = {
      latlng: {
        latitude: 47.6062,
        longitude: 122.3321
      },
      openNow: true,
      price: 'whatever',
      values: ['One', 'Two', 'Three'],
      selectedIndex: 3,
      results: [],
      FavoritesRoute: {
        component: Favorites,
        title: "Favorites",
        tintColor: '#256B12',
      },
      filters: 'veg_level=5',
      filteredResults: [],
      searched: false,
      randomPic: '',
      randomColor: ''
    }

    this.componentWillMount = this.componentWillMount.bind(this);
    this.renderRestaurantList = this.renderRestaurantList.bind(this);
    this.callApi = this.callApi.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._handleNextPress = this._handleNextPress.bind(this);
    this.priceFiltered = this.priceFiltered.bind(this);
    this.randomPicGen = this.randomPicGen.bind(this);
  }


  callApi(){
    axios.get(`http://www.vegguide.org/search/by-lat-long/47.6195700,-122.3212680/filter/distance=20;${this.state.filters}`,
      {headers: {
        'User-Agent': 'Vegout Project'
      }
    })
    .then((res) => {
      this.setState({
        results: res.data.entries
      })
      this.priceFiltered(this.state.results, this.state.price)
    })
    .catch(function(err){
      console.log(err)
    })
    this.setState({
      searched: true
    })
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latlng: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      }
    )
    this.randomPicGen()
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  setPriceRange(index){
    console.log(index);
    const values = [ '$ - inexpensive', '$$ - average','$$$ - expensive', 'whatever']
    for ( let i =0; i <values.length; i++ ){
      if(index === i){
        this.setState({
          price: values[i]
        })
      }
    }
  }

  priceFiltered(array, price){
    let tempArray = []
    for(elem of array){
      if(price === 'whatever'){
        tempArray.push(elem)
      }
      else if(elem.price_range === price){
        tempArray.push(elem)
      }
    }
    this.setState({
      filteredResults: tempArray
    })
  }

  randomPicGen(){
    let colorArray = [
      '#6CA299',
      '#0D5146',
      '#00362D',
      '#448F30',
      '#9ED78F',
      '#256B12',
      '#0F4700',
      '#2C4770',
      '#152D54'
    ]
  let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  let randomPic = animalPicArray[Math.floor(Math.random() * animalPicArray.length)];

  this.setState({
    randomPic,
    randomColor
  })

}


  renderRestaurantList(){
    return this.state.filteredResults.map(result =>
      <Clickable onPress={() => this._handleNextPress({
        component: Restaurant,
        title: 'Restaurant',
        passProps: { name: result.name,
          category: "category",
          latlng: this.state.latlng,
          veg_level: result.veg_level_description,
          long_d: result.long_description,
          short_d: result.short_description,
          price: result.price_range,
          website: result.website
        },
        tintColor: '#256B12'
      })}>
      <Card key={result.name}>
        <View style={thumbNailContainerStyle} >
          <View >
            <Text style={headerTextStyle}>{ result.name }</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:.9}}>
          <View style={{flexDirection:"row", justifyContent: "center", flex:.9}}>
              <View style={headerContentStyle}>
                <Text style={{color: '#051938'}}>{result.phone}</Text>
                <Text style={{flexWrap: "wrap", color: '#448F30'}}>{result.veg_level_description}</Text>
                <Text style={{color: '#2C4770'}}>{result.price_range}</Text>
                <Text style={{flexWrap: "wrap"}} adjustsFontSizeToFit={true} >{result.short_description}</Text>
              </View>
          </View>

          <View  style={{flexDirection:"column", justifyContent: "flex-end", marginRight:2, marginBottom: 10, paddingRight: 6}}>
            <Clickable  style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}
              onPress={()=>this.sendToDatabase(
                result.name,
                result.short_description,
                result.price_range,
                result.veg_level_description,
                result.phone, result.website,
                result.postal_code,
                result.veg_level)}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom:3}}>
              </View>
            </Clickable>
          </View>
        </View>
      </Card>
    </Clickable>
  )
}

render() {
  return(
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <View style={{paddingTop: 30}}>
        <PickerIOS
          selectedValue={this.state.filters}
          onValueChange={(value) => this.setState({filters: value, searched: false})}>
          <PickerItemIOS
            value={'veg_level=1;category_id=6'}
            label={'Adult Beverages'}
          />
          <PickerItemIOS
            value={'veg_level=2;category_id=1;category_id=9'}
            label={'Vegan-Friendly'}
          />
          <PickerItemIOS
            value={'veg_level=5'}
            label={'Vegan'}
          />
          <PickerItemIOS
            value={'veg_level=4;category_id=1;category_id=9'}
            label={'Vegetarian'}
          />
          <PickerItemIOS
            value={'veg_level=1;category_id=1;category_id=9'}
            label={'Vegetarian-friendly'}
          />
          <PickerItemIOS
            value={'veg_level=2;category_id:5'}
            label={'Coffee and Juice'}
          />
        </PickerIOS>
</View>
      <View style={{marginBottom: 10}}>
        <SegmentedControlIOS
          style={{height: 40, marginLeft: 5, marginRight: 5}}
          tintColor='#0F4700' values={[ 'cheap $', 'average $$','date night', 'whatever']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex,
              searched: false })
              this.setPriceRange(event.nativeEvent.selectedSegmentIndex)
            }} />
          </View>

          <View style={{ height:50, justifyContent: 'center', marginLeft:20, marginRight:20, marginBottom: 5, elevation: 1}}>
            <LinearGradient style={{borderRadius:8, height: 50, justifyContent: 'center'}} colors={['#152D54', '#4D658D']}>
            <Clickable onPress={()=> this.callApi()}>
              <Text style={{backgroundColor: 'transparent', color:'white', textAlign: 'center', fontSize: 20}}>SEARCH</Text>
            </Clickable>
          </LinearGradient>
          </View>

          { (this.state.searched) ?
            (
              <LinearGradient colors={['white', '#4D658D']}>
              <ScrollView>
                {this.renderRestaurantList()}
              </ScrollView>
            </LinearGradient>
            )
            :
            (

              <LinearGradient colors={[ 'white', '#152D54']} style={{flex:1}}>
              <View style={{backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30, padding: 7}}>
                <Image style={{height: 250, borderRadius: 8}}
                  source={{uri: this.state.randomPic}}>
                </Image>
              </View>
            </LinearGradient>
            )
          }
        </View>
      );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 3
  },
  headerTextStyle: {
    fontSize: 18,
    alignSelf: 'center'
  },
  thumbNailStyle: {
    height: 30,
    width: 30,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom:3,
    paddingBottom:1
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

export default ListView;
