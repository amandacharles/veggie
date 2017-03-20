import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, ListView, Image, ScrollView} from 'react-native';
import { Button, CardSection, Input, Spinner, Card, Clickable } from './common';
import * as firebase from 'firebase';

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
      width: 50,
      flexDirection: 'column',
      justifyContent: 'flex-end'
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


class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      favorites: []
    }
    // this.componentWillMount = this.componentWillMount.bind(this)
    this.showFavorites = this.showFavorites.bind(this)
  }

  componentWillMount(){
    const self = this;
    const database = firebase.database();
    itemsRef = database.ref('favorites');
    let snapArray = [];

    itemsRef.on('value', (snap) => {
      snap.val()
      // console.log(snap.val());
    });
    itemsRef.once('value', function (snap) {
       snap.forEach(function (childSnap) {
        snapArray.push(childSnap.val())
        self.setState({
          favorites: snapArray
        })
      });
    })
  }


showFavorites(){
    const favorites = this.state.favorites;

  Object.keys(favorites).map((key, index) => {
    console.log(key);
    let favorite = favorites[key];
    return
    <View>
    <Text>{favorite.name}</Text>
    </View>
  });
}

renderFavorite(fav) {
  return (
  <View>
    <Card key={fav.name}>

          <Clickable onPress={()=> Linking.openURL(fave.website)}>
            <View style={thumbNailContainerStyle}>
              <View >
                <Text style={headerTextStyle}>{ fav.name }</Text>
              </View>
            </View>
          </Clickable>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

            <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                <CardSection>
                  <View style={headerContentStyle}>
                    <Clickable onPress={()=> Linking.openURL(fav.website)}>
                    <Text>{fav.phone}</Text>
                    <Text style={{flexWrap: "wrap"}}>{fav.veg_level_description}</Text>
                    <Text>{fav.price_range}</Text>
                    <Text style={{flexWrap: "wrap"}}>{fav.short_description}</Text>
                  </Clickable>
                  </View>
                </CardSection>
            </View>

    <View style={{flexDirection:"column", justifyContent: "flex-end"}}>
            <Clickable  style={{ flexDirection: 'column', justifyContent: 'flex-end'}}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end'}}>
                <Text style={{marginRight:10, marginBottom:10, fontSize:20, color:'red', fontWeight:'300'}}>X</Text>
              </View>
            </Clickable>
          </View>
            </View>
          </Card>
        </View>
      )
}


  render() {
    console.log(this.state.favorites);
    return (
      <View style={{flex: 1, justifyContent: 'center', borderWidth: 5}}>
      <ScrollView>
          {/* {this.showFavorites()} */}
          {this.state.favorites.map(this.renderFavorite)}
      </ScrollView>
    </View>
    );
  }
}


export default Favorites;
