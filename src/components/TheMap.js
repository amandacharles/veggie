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
        title: 'placeholder',
        description: 'description'
      }
    ],
    yelpResults: []
  }

  this.onRegionChange = this.onRegionChange.bind(this);
  this.componentWillMount = this.componentWillMount.bind(this)
  this.callMyMarkers = this.callMyMarkers.bind(this);
  this.callApi = this.callApi.bind(this);
  this.createMarkers = this.createMarkers.bind(this);
  // this.componentDidMount = this.componentDidMount.bind(this);

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
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
               },
               title: 'NEw Title!',
               description: 'new description'
             }
           ]
        })
      }
  )
  this.callApi()
  this.createMarkers()
}

// componentDidMount(){
//   this.createMarkers()
// }

callApi(){
  axios.get(`https://api.yelp.com/v3/businesses/search?categories=vegan,restaurants,vegetarian&latitude=${this.state.region.latitude}&longitude=${this.state.region.longitude}&limit=50&radius=30000`,
    {headers: {
    'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
  }
})
  .then((res) => {
    let veggieArray = [];

    for (let i = 0; i < res.data.businesses.length; i++) {
      let categoriesArray = res.data.businesses[i].categories
        categoriesArray.map(category => {
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
       this.setState({ yelpResults: veggieArray})
       this.createMarkers()
       })
       .catch(function(err){
       console.log(err)
      })
  }


createMarkers(){
  let markersArray = [];
  this.state.yelpResults.map(result => {
    markersArray.push(
      {
        latlng: {
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude
        },
        title: result.name,
        description: result.categories[0].title,
        url: result.url
      }

    )
      // console.log(markersArray);
      this.setState({
        markers: markersArray
      })

  })
  console.log(this.state.markers);
  // console.log(markersArray);
  // console.log(this.state.yelpResults);
}


onRegionChange(region) {
  this.setState({ region });
}

callMyMarkers(){
  this.state.markers.map(marker => {
  <MapView.Marker
    image={require('./carrot.jpg')}
    style={{height: 30}}
    coordinate={marker.latlng}
    title={marker.title}
    description={marker.description}
  />
})
}

  render() {
    // console.log(this.state.markers);
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
            coordinate={marker['latlng']}
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
