import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

  const styles = {
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#152D54',
      borderWidth: 1,
      borderColor: '#051938',
      marginLeft: 5,
      marginRight: 5
    },
    textStyle: {
      alignSelf: 'center',
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
    }
  }

export { Button }
