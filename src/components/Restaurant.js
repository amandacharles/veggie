import React, { Component, PropTypes } from 'react';
import { Text, NavigatorIOS, View, TouchableHighlight } from 'react-native';
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
  }

  componentWillMount(){
    this.callApi()
}

callApi(){
console.log(this.props.latlng.latitude);
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
      axios.get(`https://api.yelp.com/v3/businesses/${this.state.yelpID}/reviews`,
              {headers: {
              'Authorization': 'Bearer KaYmgMa-GXIlQcg3gmjwolPMnSFOkLa9dzaG5NDhk5l1G5LfekRfzCMyj6WeoEE2KSON7mHxCjDYcNZY62DHgLNuf7-ZTEYwm2QIusj0cBtmaU5-C_eBraZFbfDCWHYx'
            }
          })
          .then((response) => {
            this.setState({
              reviews: response.data.reviews
            })
          })
          .catch(function(err){
                console.log(err)
            })
  })
  .catch(function(err){
        console.log(err)
    })
    console.log(this.props);
  }



  render() {
    return(
      <View>
        <Text style={{fontSize: 30, paddingTop: 100 }}>
          This is the RESATURANT component
        </Text>
        <Card style={{width: 50}}>
        <CardSection>
            <Text>
              {this.props.name}
            </Text>
        </CardSection>
      </Card>
    </View>
    );
  }
}


export default Restaurant;
