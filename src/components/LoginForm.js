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
      <LinearGradient style={{borderRadius:8, height: 50, width: 150, justifyContent: 'center', marginBottom: 6}} colors={['#116611', '#2D882D']}>
      <Clickable onPress={this.onButtonPress.bind(this)}>
        <Text style={{backgroundColor: 'transparent', color:'white', textAlign: 'center', fontSize: 20}}>LogIn</Text>
      </Clickable>
    </LinearGradient>

    );
  }

  render() {
    return (
      <View style={{marginTop: 40, justifyContent: 'center', marginBottom: 50}}>

        <Card style={{justifyContent: 'center', alignItems: 'center', marginTop: 7}}>
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

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {this.renderButton()}
          </View>
        </Card>
        <View style={{justifyContent: 'center', backgroundColor: 'transparent', marginTop:5}}>
          <Text style={styles.label}>Create Account</Text>
        </View>
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
    fontSize: 15
  }
};

export default LoginForm;
