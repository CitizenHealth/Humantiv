import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { theme, primaryBlueColor, primaryGreyColor} from '../themes';

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
    fontSize: 18,
  }
};
export {LinkText};

