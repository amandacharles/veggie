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
      // borderWidth: 1,
      // flexDirection: 'column',
      // alignItems: 'flex-end',
      // // alignSelf: 'stretch',
      // backgroundColor: '#fff',
      // marginLeft: 5,
      // marginRight: 5,
    }
  }

export { Clickable }
