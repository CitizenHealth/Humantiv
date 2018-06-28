import React from "react";
import { Image } from "react-native";
import {TouchableOpacity, Text } from "react-native";
import Images from "../../resources/images";
import { theme } from '../themes';

const IconButton = (props) => {
  const { iconButtonStyle, iconContentStyle } = theme;
  return (
    <TouchableOpacity style={[iconButtonStyle, props.viewStyles]} onPress={props.onPress} disabled={props.disabled}>
      <Text style={[iconContentStyle, props.textStyles]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export { IconButton };

