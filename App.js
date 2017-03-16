import React, { Component } from 'react';
import { Text, View, NavigatorIOS } from 'react-native';
import LoginForm from './src/components/LoginForm';
import Main from './src/components/Main'
import * as firebase from "firebase";



export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'VegOut',
        }}
        style={{flex: 1}}
      />
    );
  }
}
