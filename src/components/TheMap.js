import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Restaurant from './Restaurant'
import axios from 'axios'
import { Components } from 'expo';
const { LinearGradient } = Components;


class TheMap extends Component {
  constructor(props){
    super(props)

  this.state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0021,
    },
    markers: [
      {
        latlng: {
            latitude: 37.762033,
            longitude: -122.434759
        },
        title: 'Placeholder',
        category: 'category',
        veg_level: '',
        long_d: '',
        short_d: '',
        price: '',
        website: ''
      }
    ],
  }

  this.onRegionChange = this.onRegionChange.bind(this);
  this.componentWillMount = this.componentWillMount.bind(this)
  // this.callMyMarkers = this.callMyMarkers.bind(this);
  this.callApi = this.callApi.bind(this);
  this.componentDidMount = this.componentDidMount.bind(this);

}

componentWillMount(){
  navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0021,
          }
        })
      }
  )
}

componentDidMount(){
  this.callApi()
}


callApi(){
  setResults = [];
  axios.get(`http://www.vegguide.org/search/by-lat-long/${this.state.region.latitude},${this.state.region.longitude}/distance=5/filter/veg_level=1`,
    {headers: {
    'User-Agent': 'Vegout Project'
  }
})
.then((response) => {
  response.data.entries.map(entry => {
    let level = entry.veg_level_description
    let long = entry.long_description
    let short = entry.short_description
    let priceRange = entry.price_range
    let web = entry.website
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${entry.name}&latitude=${this.state.region.latitude}&longitude=${this.state.region.longitude}&limit=1&radius=30000`,
        {headers: {
        'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
      }
    })
      .then((res) => {
        console.log(res);
        if(res.data.businesses[0].coordinates.latitude && res.data.businesses[0].coordinates.longitude){
        setResults.push({
            latlng: {
                latitude: res.data.businesses[0].coordinates.latitude,
                longitude: res.data.businesses[0].coordinates.longitude
            },
            title: res.data.businesses[0].name,
            category: res.data.businesses[0].categories[0].title,
            veg_level: level,
            long_d: long,
            short_d: short,
            price: priceRange,
            website: web
          }
        )}
        this.setState({
          markers: setResults
        })
           })
           .catch(function(err){
           console.log(err)
          })
  })
})
.catch(function(err){
      console.log(err)
  })
}


onRegionChange(region) {
  this.setState({ region });
}

// callMyMarkers(){
//   {this.state.markers.map(marker => {
//     return <MapView.Marker
//     key={marker.title}
//     coordinate={marker.latlng}>
//     <MapView.Callout style={{ flex: 1, position: 'relative'}}>
//   <View>
//     <Text>
//       {marker.title}
//     </Text>
//     <Text>
//       {marker.category}
//     </Text>
//   </View>
// </MapView.Callout>
//   </MapView.Marker>
// })}
// }

_handleBackPress() {
  this.props.navigator.pop();

}

_handleNextPress(restaurantRoute) {
  this.props.navigator.push(restaurantRoute);

}



  render() {

    return (
      <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
        <MapView style={{position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,}}
          region={this.state.region}
          onRegionChange={this.state.onRegionChange}>
          {this.state.markers.map(marker => {
            return <MapView.Marker
            pinColor='#0F4700'
            key={marker.title}
            coordinate={marker.latlng}>
            <MapView.Callout style={{ flex: 1, position: 'relative'}}>
            <TouchableHighlight  underlayColor='white' onPress={() => this._handleNextPress({
              component: Restaurant,
              title: 'Restaurant',
              passProps: { name: marker.title,
                          category: marker.category,
                          latlng: marker.latlng,
                          veg_level: marker.veg_level,
                          long_d: marker.long_d,
                          short_d: marker.short_d,
                          price: marker.price,
                          website: marker.website
                        },
                        tintColor: '#256B12'
            })}>
          <View style={{flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight:'bold'}}>
              {marker.title}
            </Text>
            <Text style={{color: '#051938'}}>
              {marker.price}
            </Text>
            <Text style={{color: '#256B12'}}>
              {marker.category}
            </Text>
          </View>
        </TouchableHighlight>
        </MapView.Callout>
          </MapView.Marker>
        })}
        </MapView>
    </View>
  </View>
    );
  }
}

const styles = {
  infoContainer: {
    flex: 1,
    position: 'relative'

  }
}

export default TheMap;
