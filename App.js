import React, { Component } from 'react';
import { Text, View, NavigatorIOS } from 'react-native';
import LoginForm from './src/components/LoginForm';
import Main from './src/components/Main'
import * as firebase from "firebase";
console.disableYellowBox = true;



export default class App extends React.Component {



  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: Main,
          title: 'Tofudi',
          tintColor: '#f74509',
          passProps: {tintColor: '#f74509'}
        }}
        style={{flex: 1}}
      />
    );
  }
}
