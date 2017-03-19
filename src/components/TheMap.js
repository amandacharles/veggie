import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import axios from 'axios'


class TheMap extends Component {
  constructor(props){
    super(props)

  this.state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
        latlng: {
            latitude: 37.762033,
            longitude: -122.434759
        },
        title: 'Placeholder',
        description: 'description'
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          markers: [
            {
              latlng: {
                  latitude: 37.762033,
                  longitude: -122.434759
              },
              title: 'Placeholder',
              description: 'description'
            }
          ],
        })
      }
  )
  this.callApi()
}

componentDidMount(){
  // this.callMyMarkers()
}

callApi(){
  setResults = [];
  axios.get(`http://www.vegguide.org/search/by-lat-long/${this.state.region.latitude},${this.state.region.longitude}/distance=5/filter/veg_level=5`,
    {headers: {
    'User-Agennt': 'Vegout Project'
  }
})
.then((res) => {
  res.data.entries.map(entry => {
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${entry.name}&latitude=${this.state.region.latitude}&longitude=${this.state.region.longitude}&limit=1&radius=30000`,
        {headers: {
        'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
      }
    })
      .then((res) => {
        if(res.data.businesses[0].coordinates.latitude && res.data.businesses[0].coordinates.longitude){
        setResults.push({
            latlng: {
                latitude: res.data.businesses[0].coordinates.latitude,
                longitude: res.data.businesses[0].coordinates.longitude
            },
            title: res.data.businesses[0].name,
            description: res.data.businesses[0].categories[0].title
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

callMyMarkers(){
  console.log(this.state.markers);
  this.state.markers.map(marker => {
    return <MapView.Marker
    key={marker.title}
    coordinate={marker.latlng}
    description={marker.description}
    title={marker.title}>
  </MapView.Marker>
})
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
            key={marker.title}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
        </MapView.Marker>
        })}
        </MapView>
    </View>
  </View>
    );
  }
}


export default TheMap;
