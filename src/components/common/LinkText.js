import React from "react";
import { Text, TouchableOpacity} from "react-native";

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
    color: "#E9222E",
    fontSize: 18,
  }
};
export {LinkText};

