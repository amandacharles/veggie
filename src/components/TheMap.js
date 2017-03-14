import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import MapView from 'react-native-maps';


class TheMap extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <Text style={{fontSize: 30, paddingTop: 100 }}>
          This is the MAPVIEWs component
        </Text>

        <MapView style={{flex: 1, width: 200}}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    </View>
    );
  }
}


export default TheMap;
