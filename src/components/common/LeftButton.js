import React from "react";
import { Image } from "react-native";
import {TouchableOpacity } from "react-native";
import Images from "../../resources/images";

const LeftButton = ({ onPress }) => {
  const { buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} >
      <Image style={buttonStyle} source={Images.img_login_back} />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 10,
    height: 40,
    width: 40
  }
};

export { LeftButton };

