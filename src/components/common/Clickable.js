import React from 'react';
import { TouchableOpacity } from 'react-native';

const Clickable = ({ onPress, children }) => {

  return (

    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>

  )
}

export { Clickable }
