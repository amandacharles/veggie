import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, Clickable } from './common';
import { Components } from 'expo';
const { LinearGradient } = Components;

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
    });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <LinearGradient style={{borderRadius:8, marginLeft: 125, marginBottom: 5, height: 50, width: 100, alignSelf: 'center', justifyContent: 'center',}} colors={['#256B12', '#6CB359']}>
      <Clickable onPress={this.onButtonPress.bind(this)} style={{alignSelf: 'center'}}>
        <Text style={{backgroundColor: 'transparent', color:'white', textAlign: 'center', fontSize: 20}}>LogIn</Text>
      </Clickable>
    </LinearGradient>




      // {/* <Button onPress={this.onButtonPress.bind(this)}>
      //   Log in
      // </Button> */}
    );
  }

  render() {
    return (
      <View style={{marginTop: 40, justifyContent: 'center', marginBottom: 70}}>
        <View style={{justifyContent: 'center', backgroundColor: 'transparent'}}>
      <Text style={styles.label}>LogIn / SignUp</Text>
    </View>
        <Card>
          <CardSection>
            <Input
              placeholder="user@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          <CardSection >

            {this.renderButton()}

          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }
};

export default LoginForm;
