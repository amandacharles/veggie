import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import * as firebase from "firebase";
import axios from 'axios'
import { Button, Card, CardSection, Input, Spinner } from './common';
import Favorites from './Favorites'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Communications from 'react-native-communications'

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
        title: "Favorites",
        tintColor: '#256B12'
      }
    }

    this.callApi = this.callApi.bind(this);
    this.reviewsRender = this.reviewsRender.bind(this)
  }

  componentWillMount(){
    this.callApi()

  }

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

        // console.log(response.data);
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
  }


  reviewsRender(){
    return (
      <View style={styles.reviewsContainer}>
        {this.state.reviews.map(review => {
          console.log(review);
          return <TouchableHighlight onPress={()=> Linking.openURL(review.reviewURL)}>
            {/* <Card>
              <CardSection> */}
              <View style={styles.reviewContainer}>
                <View style={styles.reviewTextWrap}>
                  <Text style={{fontSize: 15, fontStyle: 'italic'}}>{review.text}</Text>
                </View>
              </View>
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
        var database = firebase.database();
        const userId = firebase.auth().currentUser.uid;
        var newFavKey = firebase.database().ref().child('favorites').push().key;

        firebase.database().ref('/users/' + userId + '/favorites/').push({
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
        return(
          <ScrollView>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>
              <View style={styles.topContainer}>
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
                  <View style={{alignItems: 'center'}}><Text style={styles.nameText}>{this.props.name}</Text></View>
                  <Text style={styles.infoTextPurp}>{this.props.veg_level}</Text>
                  <Text style={styles.infoText} style={{color: '#2C4770'}}>{this.props.price}</Text>
                  <TouchableHighlight onPress={()=> Communications.phonecall(this.state.phone,true )}>
                    <Text style={styles.infoText} style={{color: '#152D54', fontSize: 20}}>{this.state.phone}</Text>
                  </TouchableHighlight>
                  <Text style={styles.infoText}>{this.props.long_d['text/vnd.vegguide.org-wikitext']}</Text>
                </View>

                <Image style={styles.yelpImage} source={{uri: this.state.image}}/>

                <TouchableOpacity
                  style={{marginTop: 7}}
                  onPress={()=> Linking.openURL(`http://maps.google.com/?q=${this.props.latlng.latitude},${this.props.latlng.longitude}`)}>
                <View style={{height: 150}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
                    <MapView style={{position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,}}
                      region={{
                        latitude: this.props.latlng.latitude,
                        longitude: this.props.latlng.longitude,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.0021,
                      }}>
                      <MapView.Marker
                        coordinate={{
                          latitude: this.props.latlng.latitude,
                          longitude: this.props.latlng.longitude
                        }}
                        pinColor='#0F4700'
                      />
                    </MapView>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <CardSection>
                  <TouchableOpacity onPress={()=> Linking.openURL(this.state.yelpSite)} style={styles.buttonYelp}>
                    <Image source={require('./yelp.png')} style={{height: 40, width: 70}}/>
                  </TouchableOpacity>
                </CardSection>
                <CardSection>
                  <TouchableOpacity onPress={()=> Linking.openURL(this.props.website)} style={styles.buttonWeb}>
                    <Text style={{color: 'white'}}>WEBSITE</Text>
                  </TouchableOpacity>
                </CardSection>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', margin: 7}}>
                <Text style={{fontSize: 20}}>REVIEWS</Text>
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
        textAlign: 'center',
        marginBottom: 4
      },
      heartImage: {
        height: 30,
        width: 30,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 7
      },
      yelpImage: {
        height: 300
      },
      buttonYelp: {
        height: 50,
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop:5,
        elevation: 1,
        backgroundColor: '#d32323'
      },
      buttonWeb: {
        height: 50,
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop:5,
        elevation: 1,
        backgroundColor: '#0D5146'
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 7
      },
      infoContainer: {
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      infoText: {
        marginBottom: 3,
        fontSize: 20,
        marginTop: 5,
      },
      infoTextPurp: {
        marginBottom: 3,
        fontSize: 20,
        color: '#448F30'
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
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
      },
      reviewTextWrap: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: "#ddd",
        position: 'relative'
      }
    }

    export default Restaurant;
