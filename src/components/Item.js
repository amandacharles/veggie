import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, Image, Linking } from 'react-native';
import { Button, Card, CardSection, Input, Spinner, Clickable } from './common';

const Item = ({ result, onPress, children }) => {

  const { display_phone,
          image_url,
          name,
          price,
          rating,
          id,
          url
         } = result;

         const { thumbNailStyle,
           headerContentStyle,
           thumbNailContainerStyle,
           headerTextStyle,
           imageStyle
           } = styles;

return (
  <Card>
      <CardSection>
        <View style={thumbNailContainerStyle}>
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{ name }</Text>
          <Text>{display_phone}   Rating:{rating}/5</Text>
        </View>
        <Image
        style={thumbNailStyle}
        source={{ uri: image_url }}/>
    </CardSection>
    <CardSection>

    </CardSection>
    <Clickable onPress={()=> Linking.openURL(url)}>
    <CardSection>
      <Image style={imageStyle} source={{ uri: image_url }}/>
    </CardSection>
  </Clickable>
    </Card>
  )
}

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
      marginRight: 10
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    },
  }



  export default Item;
