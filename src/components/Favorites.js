import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, ListView, Image, ScrollView, Linking} from 'react-native';
import { Button, CardSection, Input, Spinner, Card, Clickable } from './common';
import * as firebase from 'firebase';
import vegQuoteArray from './vquotes.js';
import { Components } from 'expo';
const { LinearGradient } = Components;

class Favorites extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      snaps: []
    }
    this.renderFavorite = this.renderFavorite.bind(this)
    this.deleteFav = this.deleteFav.bind(this)
    this.randomQuote = this.randomQuote.bind(this);
    this.noFavorites = this.noFavorites.bind(this);
    this.truncateString = this.truncateString.bind(this);
  }

  componentWillMount(){
    const self = this;
    const database = firebase.database();
    const userId = firebase.auth().currentUser.uid;

    itemsRef = database.ref('/users/' + userId + '/favorites/');
    let snapArray = [];

    itemsRef.on('value', (snap) => {
      snap.val()
    });
    itemsRef.once('value', function (snap) {
       snap.forEach(function (childSnap) {
        snapArray.push(childSnap)
        self.setState({
          snaps: snapArray
        })
      });
    })
  }

  deleteFav(snap){
  const self = this;

  const database = firebase.database();
  const userId = firebase.auth().currentUser.uid;

  favesRef = database.ref('/users/' + userId + '/favorites/' + snap.key);
  favesRef.remove();

  let index = this.state.snaps.indexOf(snap.val())
  const newArr = [...this.state.snaps]
  newArr.splice(index, 1)
    self.setState({
    snaps: newArr
  })
}

  noFavorites(){
  if(!this.state.snaps.length){
    return (
      <View style={{justifyContent: 'center', marginTop:50, backgroundColor: 'transparent'}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          You haven't added any favorites.
        </Text>
      </View>
    )
  }
}

truncateString(str) {

    if (45 > str.length) {
      return str;
    }
    else if (45 >= 3) {
      return str.slice(0, 45 - 3) + '...';
    }
    else if (45 < 3) {
      return str.slice(0, 45) + '...';
    }
  };

  renderFavorite(snap) {
  if(!this.state.snaps.length){
    return <Text>nope</Text>
  }
  const fav = snap.val()
  return (

  <View>
    <Card key={fav.name}>
          <Clickable onPress={()=> Linking.openURL(fav.website)}>
            <View style={thumbNailContainerStyle}>
              <View >
                <Text style={headerTextStyle}>{ fav.name }</Text>
              </View>
            </View>
          </Clickable>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection:'row', justifyContent: 'flex-start', marginBottom:5, marginTop: 5, marginLeft:5}}>
                  <View style={headerContentStyle}>
                    <Clickable onPress={()=> Linking.openURL(fav.website)}>
                    <Text>{fav.phone}</Text>
                    <Text style={{flexWrap: "wrap", color: '#256B12'}}>{fav.veg_level_description}</Text>
                    <Text style={{color: '#2C4770'}}>{fav.price_range}</Text>
                    <Text style={{flexWrap: "wrap"}}>{this.truncateString(fav.short_description)}</Text>
                  </Clickable>
                  </View>
            </View>

    <View style={{marginLeft: 3, flexDirection:"column", justifyContent: "flex-end"}}>
            <Clickable  style={{ flexDirection: 'column', justifyContent: 'flex-end'}}
              onPress={()=> this.deleteFav(snap)}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 7}}>
                <Text  style={{ellipsizeMode:'tail', marginRight:10, marginBottom:5, fontSize:25, color:'red', fontWeight:'400'}}>X</Text>
              </View>
            </Clickable>
          </View>
            </View>
          </Card>
        </View>
      )
    }

  randomQuote(){
  let random = vegQuoteArray[Math.floor(Math.random() * vegQuoteArray.length)];
  return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', borderColor: '#0D5146', backgroundColor: '#246C60', borderWidth: 2}}>
          <Text style={{textAlign: 'center', fontSize: 17, marginTop: 5, marginBottom: 5, marginLeft: 2, marginRight: 2, color: 'floralwhite'}}>{random}</Text>
        </View>
  )
}

  render() {
    console.log(this.state.snaps);
    return (
      <LinearGradient style={{flex: 1}} colors={['#6CA299', 'white']}>
      <ScrollView>
        {this.randomQuote()}

          {this.state.snaps.map(this.renderFavorite)}
          {this.noFavorites()}
      </ScrollView>
    </LinearGradient>
    );
  }
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

export default Favorites;
