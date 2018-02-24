import React from "react";
import { Image } from "react-native";
import {TouchableOpacity, Text } from "react-native";
import Images from "../../resources/images";
import { theme } from '../themes';

const IconButton = (props) => {
  const { iconButtonStyle, iconContentStyle } = theme;
  return (
    <TouchableOpacity style={iconButtonStyle} onPress={props.onPress} >
      <Text style={iconContentStyle}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export { IconButton };

