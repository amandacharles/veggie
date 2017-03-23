import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import axios from 'axios'
import * as firebase from "firebase";
import Favorites from './Favorites'


class Restaurant extends Component {
  constructor(props){
    super(props)

    this.state = {
      phone: '',
      image: '',
      yelpRating: '',
      yelpSite: '',
      yelpID: '',
      reviews: [],
      FavoritesRoute: {
        component: Favorites,
        title: "Favorites"
      }
    }

    this.callApi = this.callApi.bind(this);
    this.reviewsRender = this.reviewsRender.bind(this)
  }

  componentWillMount(){
    this.callApi()

}

// componentDidMount(){
// this.restaurantRender()
// }


callApi(){
axios.get(`https://api.yelp.com/v3/businesses/search?term=${this.props.name}&latitude=${this.props.latlng.latitude}&longitude=${this.props.latlng.longitude}&limit=1&radius=30000`,
        {headers: {
        'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
      }
    })
  .then((res) => {
    console.log(res.data.businesses[0])
    this.setState({
      phone: res.data.businesses[0].display_phone,
      image: res.data.businesses[0].image_url,
      yelpRating: res.data.businesses[0].rating,
      yelpSite: res.data.businesses[0].url,
      yelpID: res.data.businesses[0].id
    })
      })
    .then((res) => {
      // console.log(this.state.image);
      axios.get(`https://api.yelp.com/v3/businesses/${this.state.yelpID}/reviews`,
              {headers: {
              'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
            }
          })
          .then((response) => {
            console.log(response.data);
            let reviewArr = []
            response.data.reviews.map(review => {
              if(review.text){
                reviewArr.push({text: review.text, reviewURL: review.url})
              }
            })
            this.setState({
              reviews: reviewArr
            })
          })
          .catch(function(err){
                console.log(err)
            })
  })
  .catch(function(err){
        console.log(err)
    })
    // console.log(this.state.reviews);
  }


reviewsRender(){
  return (
    <View style={styles.reviewsContainer}>
      {this.state.reviews.map(review => {
        console.log(review);
      return <TouchableHighlight onPress={()=> Linking.openURL(review.reviewURL)}>
        <Card>
          <CardSection>
      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 20}}>{review.text}</Text>
      </View>
    </CardSection>
    </Card>
    </TouchableHighlight>
      })}
    </View>
  )
}

sendToDatabase(
  name,
  short_d,
  price,
  veg_level,
  phone,
  website,
  yelpSite,
  yelpRating,
  image,
  yelpID,
  reviews) {
  const userId = firebase.auth().currentUser.uid;
  var database = firebase.database();
  var newFavKey = firebase.database().ref().child('favorites').push().key;

 firebase.database().ref('favorites/').push({
   name: name,
   short_description: short_d,
   price_range: price,
   veg_level_description: veg_level,
   phone: phone,
   website: website,
   yelpURL: yelpSite,
   yelpRating: yelpRating,
   imageURL: image,
   yelpID: yelpID,
   reviews: reviews,
   key: newFavKey
 })
 this._handleNextPress(this.state.FavoritesRoute)
}

_handleBackPress() {
  this.props.navigator.pop();
}

_handleNextPress(nextRoute) {
  this.props.navigator.push(nextRoute);
}

  render() {
    console.log(this.state.reviews);
    return(
      <ScrollView>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>

      <View style={styles.topContainer}>
        <View><Text style={styles.nameText}>{this.props.name}</Text></View>
        <TouchableHighlight
          onPress={()=>this.sendToDatabase(
            this.props.name,
            this.props.short_d,
            this.props.price,
            this.props.veg_level,
            this.state.phone,
            this.props.website,
            this.state.yelpSite,
            this.state.yelpRating,
            this.state.image,
            this.state.yelpID,
            this.state.reviews)}>
        <Image style={styles.heartImage} source={require('./gheart.png')}/>
      </TouchableHighlight>
      </View>


    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{this.props.veg_level}</Text>
      <Text style={styles.infoText}>{this.props.price}</Text>
      <Text style={styles.infoText}>{this.state.phone}</Text>
      <Text style={styles.infoText}>{this.props.long_d['text/vnd.vegguide.org-wikitext']}</Text>
    </View>

    <Image style={styles.yelpImage} source={{uri: this.state.image}}/>

    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={()=> Linking.openURL(this.state.yelpSite)} style={styles.buttons}>
        <Text>YELP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> Linking.openURL(this.props.website)} style={styles.buttons}>
        <Text>WEBSITE</Text>
      </TouchableOpacity>
    </View>

    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 7}}>
      <Text style={{fontSize: 20, textDecorationLine: 'underline'}}>Reviews</Text>
    </View>

    {this.reviewsRender()}
  </View>
</ScrollView>
    );
  }
}

const styles = {
  nameText: {
    fontSize: 30,

  },
  heartImage: {
    height: 30,
    width: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7
  },
  yelpImage: {
    height: 200
  },
  buttons: {
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop:5
  },
  buttonText: {

  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7
  },
  infoContainer: {
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  infoText: {
    marginBottom: 3,
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,

  },
  reviewsContainer: {
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center'
  },
  reviewContainer: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  }
}

export default Restaurant;
