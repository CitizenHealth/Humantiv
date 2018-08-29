import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { theme, primaryBlueColor, primaryGreyColor} from '../themes';
import {Fonts} from '../../resources/fonts/Fonts';

const LinkText = ({children, onPress}) => {
  const {containerStyle,  textStyle} = styles;

  return (
        <TouchableOpacity
            onPress={onPress}
            style={containerStyle}
        >
            <Text 
                style={textStyle}
            >
                {children}
            </Text>
        </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
        
  },
  textStyle: {
    color: primaryBlueColor,
    fontSize: 16,
    fontFamily: Fonts.regular
  }
};
export {LinkText};

