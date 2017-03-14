import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


class Favorites extends Component {

  render() {
    return(
      <View>
        <Text style={{fontSize: 30, paddingTop: 100 }}>
          This is the Favorites component
        </Text>

    </View>
    );
  }
}


export default Favorites;
