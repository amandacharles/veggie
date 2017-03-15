import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';
import MapView from 'react-native-maps';


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
    ]
  }

  this.onRegionChange = this.onRegionChange.bind(this);
  // this.callMyMarkers = this.callMyMarkers.bind(this);

}


onRegionChange(region) {
  this.setState({ region });
}

// callMyMarkers(){
//   this.state.markers.map(marker => {
//   <MapView.Marker
//     coordinate={marker.latlng}
//     title={marker.title}
//     description={marker.description}
//   />
// })
// }

  render() {
    console.log(this.state.markers);
    return(
      <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
        <MapView style={{position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,}}
          region={this.state.region}
          onRegionChange={this.state.onRegionChange}>
          {/* <MapView.Marker
            coordinate={{
              latitude: 37.762033,
              longitude: -122.434759
            }}
          /> */}
          {this.state.markers.map(marker => {
            return <MapView.Marker
            coordinate={marker['latlng']}
          />
        })}
        </MapView>
    </View>
  </View>
    );
  }
}


export default TheMap;
