import React from 'react';
import { TouchableOpacity } from 'react-native';

const Clickable = ({ onPress, children }) => {
  const { buttonStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
    {children}
    </TouchableOpacity>
  )
}

  const styles = {
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'white',
      marginLeft: 5,
      marginRight: 5
    }
  }

export { Clickable }
