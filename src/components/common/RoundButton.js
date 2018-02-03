import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

const RoundButton = ({source, onPress}) => {
  const { imageStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
    >
      <View style={{ flex: 1 }} >
        <Image
          source={source}
          style={imageStyle}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain"
  },
  buttonStyle: {
    height: 80,
    width: 80,
    padding: 10,
  }
};
export { RoundButton };
