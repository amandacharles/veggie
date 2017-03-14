import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


class Restaurant extends Component {

  render() {
    return(
      <View>
        <Text style={{fontSize: 30, paddingTop: 100 }}>
          This is the RESATURANT component
        </Text>
        <Card style={{width: 50}}>
        <CardSection>
            <Text>
              hey!
            </Text>
        </CardSection>
      </Card>

    </View>
    );
  }
}


export default Restaurant;
