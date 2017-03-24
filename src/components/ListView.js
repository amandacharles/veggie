import React, { Component, PropTypes } from 'react';
import { SegmentedControlIOS, Text, NavigatorIOS, View, TouchableHighlight, Switch, ScrollView, Linking, StyleSheet, Image, PickerIOS } from 'react-native';
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
      justifyContent: 'space-around',
      alignItems: 'center'
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

    const PickerItemIOS = PickerIOS.Item;


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
      title: "Favorites"
    },
    filters: 'veg_level=5',
    filteredResults: [],
    searched: false,
  }

  this.componentWillMount = this.componentWillMount.bind(this)
  this.renderRestaurantList = this.renderRestaurantList.bind(this)
  this.callApi = this.callApi.bind(this);
  this._handleBackPress = this._handleBackPress.bind(this);
  this._handleNextPress = this._handleNextPress.bind(this);
  this.priceFiltered = this.priceFiltered.bind(this);
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
  console.log(this.state.filteredResults)
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
                tintColor: '#f74509'
    })}>
    <Card key={result.name}>
        <View style={thumbNailContainerStyle} >
          <View >
            <Text style={headerTextStyle}>{ result.name }</Text>
          </View>
        </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:.9}}>

        <View style={{flexDirection:"row", justifyContent: "center", flex:.9}}>
            <CardSection>
              <View style={headerContentStyle}>

                <Text>{result.phone}</Text>
                <Text style={{flexWrap: "wrap", color: 'indigo'}}>{result.veg_level_description}</Text>
                <Text>{result.price_range}</Text>
                <Text style={{flexWrap: "wrap"}} adjustsFontSizeToFit={true} >{result.short_description}</Text>

              </View>
            </CardSection>
        </View>

<View style={{flexDirection:"column", justifyContent: "flex-end", marginRight:2, marginBottom: 10, paddingRight: 6}}>
        <Clickable  style={{  alignSelf: 'center', lexDirection: 'row', justifyContent: 'flex-end'}} onPress={()=>this.sendToDatabase(result.name, result.short_description,result.price_range, result.veg_level_description, result.phone, result.website, result.postal_code, result.veg_level)}>
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
          <View>
            <PickerIOS
                      selectedValue={this.state.filters}
                      onValueChange={(value) => this.setState({filters: value, searched: false})}>

                      <PickerItemIOS
                        value={'veg_level=1;category_id=6'}
                        label={'I need a drink.'}
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
                          label={'Vegetarian.'}
                        />
                        <PickerItemIOS
                          value={'veg_level=1;category_id=1;category_id=9'}
                          label={'Vegetarian-friendly'}
                        />

                        {/* <PickerItemIOS
                          value={'veg_level=2;category_id=2;category_id:7'}
                          label={'Groceries'}
                        /> */}
                        <PickerItemIOS
                          value={'veg_level=2;category_id:5'}
                          label={'Coffee/Tea/Juice'}
                        />

                    </PickerIOS>
         </View>

            <View style={{marginBottom: 10}}>
              <SegmentedControlIOS style={{height: 40, marginLeft: 5, marginRight: 5}} tintColor='green' values={[ 'cheap $', 'average $$','date night', 'whatever']}
                selectedIndex={this.state.selectedIndex}
                onChange={(event) => {
                  this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex,
                  searched: false })
                  this.setPriceRange(event.nativeEvent.selectedSegmentIndex)
                }} />
              </View>
              <View style={{ height:50, justifyContent: 'center', marginLeft:20, marginRight:20, elevation: 1}}>
              <Button onPress={()=> this.callApi()}>
                <Text>SEARCH</Text>
              </Button>
            </View>
              {/* <TouchableHighlight  onPress={()=> this.callApi()}>
              <View style={{  borderWidth: 2, height:50, justifyContent: 'center', marginLeft:20, marginRight:20, borderRadius:28, elevation: 1}}>
                  <Text style={{textAlign:'center'}}>
                  SEARCH
                </Text>
              </View>
            </TouchableHighlight> */}

        { (this.state.searched) ?
          (
            <ScrollView>
              {this.renderRestaurantList()}
            </ScrollView>
          )
          : (

            <View >
            <Image style={{height: 250, marginTop: 30}} source={{uri: 'https://static.pexels.com/photos/35631/sheep-luka-nature-lamb.jpg'}}>

            </Image>
            </View>
          )
        }
          </View>
    );
  }
}

export default ListView;
