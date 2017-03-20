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
    }
  }

export { Clickable }
