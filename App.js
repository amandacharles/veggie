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
          tintColor: '#256B12',
          passProps: {tintColor: '#256B12'}
        }}
        style={{flex: 1}}
      />
    );
  }
}
