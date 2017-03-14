import React, { Component } from 'react';
import { Text, View, NavigatorIOS } from 'react-native';
import LoginForm from './src/components/LoginForm';
import Main from './src/components/Main'


export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'Veg',
        }}
        style={{flex: 1}}
      />
    );
  }
}
