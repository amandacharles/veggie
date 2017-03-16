// import React, { Component, PropTypes } from 'react';
// import { Text, NavigatorIOS, View, TouchableHighlight, Image, Linking } from 'react-native';
// import { Button, Card, CardSection, Input, Spinner, Clickable } from './common';
// import Favorites from './Favorites'
// import firebase from 'firebase'
//
// const Item = ({ result }) => {
//
//   const { display_phone,
//           image_url,
//           name,
//           price,
//           rating,
//           id,
//           url
//          } = result;
//
//          const { thumbNailStyle,
//            headerContentStyle,
//            thumbNailContainerStyle,
//            headerTextStyle,
//            imageStyle
//            } = styles;
//
//  const database = firebase.database()
//
//  const sendToDatabase = function (display_phone, image_url, name, price, rating, id, url) {
//   firebase.database().ref('favorites/' + name).set({
//     phone: display_phone,
//     image: image_url,
//     name: name,
//     price: price,
//     rating: rating,
//     id: id,
//     photo: url
//   });
// }
//
// const _handleBackPress=  function() {
//   this.props.navigator.pop();
// }
//
//
// return (
//   <Card>
//       <CardSection>
//         <View style={thumbNailContainerStyle}>
//         </View>
//         <View style={headerContentStyle}>
//           <Text style={headerTextStyle}>{ name }</Text>
//           <Text>{display_phone}   Rating:{rating}/5</Text>
//         </View>
//         <View style={{alignItems: "flex-end"}}>
//         <Clickable onPress={()=> sendToDatabase(display_phone, image_url, name, price, rating, id, url)}>
//         <Image
//         style={thumbNailStyle}
//         source={{ uri: image_url }}/>
// </Clickable>
// </View>
//     </CardSection>
//     <CardSection>
//
//     </CardSection>
//     <Clickable onPress={()=> Linking.openURL(url)}>
//     <CardSection>
//       <Image style={imageStyle} source={{ uri: image_url }}/>
//     </CardSection>
//   </Clickable>
//     </Card>
//   )
// }
//
//
// const styles = {
//     headerContentStyle: {
//       flexDirection: 'column',
//       justifyContent: 'space-around'
//     },
//     headerTextStyle: {
//       fontSize: 18
//     },
//     thumbNailStyle: {
//       height: 50,
//       width: 50
//     },
//     thumbNailContainerStyle: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginLeft: 10,
//       marginRight: 10
//     },
//     imageStyle: {
//       height: 300,
//       flex: 1,
//       width: null
//     },
//   }
//
//
//
//   export default Item;
