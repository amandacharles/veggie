import React from 'react';
import { TouchableOpacity } from 'react-native';

const Clickable = ({ onPress, children }) => {

  return (

    <TouchableOpacity underlayColor='white' onPress={onPress}>
      {children}
    </TouchableOpacity>

  )
}

export { Clickable }
