import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import axios from 'axios'


class Restaurant extends Component {
  constructor(props){
    super(props)

    this.state = {
      phone: '',
      image: '',
      yelpRating: '',
      yelpSite: '',
      yelpID: '',
      reviews: []
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
    // console.log(res.data.businesses[0])
    this.setState({
      phone: res.data.businesses[0].display_phone,
      image: res.data.businesses[0].image_url,
      yelpRating: res.data.businesses[0].rating,
      yelpSite: res.data.businesses[0].url,
      yelpID: res.data.businesses[0].id
    })
      })
    .then((res) => {
      console.log(this.state.image);
      axios.get(`https://api.yelp.com/v3/businesses/${this.state.yelpID}/reviews`,
              {headers: {
              'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
            }
          })
          .then((response) => {
            let reviewArr = []
            response.data.reviews.map(review => {
              if(review.text){
                reviewArr.push(review.text)
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
      return <View style={styles.reviewContainer}>
        <Text>{review}</Text>
      </View>
      })}
    </View>
  )
}



  render() {
    // console.log(this.state.reviews);
    return(
      <ScrollView>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>

      <View style={styles.topContainer}>
        <View><Text style={styles.nameText}>{this.props.name}</Text></View>
        <Image style={styles.heartImage} source={require('./gheart.png')}/>
      </View>


    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{this.props.veg_level}</Text>
      <Text style={styles.infoText}>{this.props.price}</Text>
      <Text style={styles.infoText}>{this.state.phone}</Text>
      <Text style={styles.infoText} style={{fontSize: 20}}>{this.props.long_d['text/vnd.vegguide.org-wikitext']}</Text>
    </View>

    <Image style={styles.yelpImage} source={{uri: this.state.image}}/>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttons}>
        <Text>YELP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
        <Text>WEBSITE</Text>
      </TouchableOpacity>
    </View>
    {this.reviewsRender()}

  </View>
</ScrollView>
    );
  }
}

const styles = {
  nameText: {
    fontSize: 30
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
    marginBottom: 3
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 7,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  reviewsContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  reviewContainer: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  }
}

export default Restaurant;
