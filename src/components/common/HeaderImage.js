import React from "react";
import { View, Image } from "react-native";

const HeaderImage = ({ source }) => {
  const { imageStyle } = styles;

  return (
    <View style={{ flex: 1 }} >
      <Image
        style={imageStyle}
        source={source}
      />
    </View>
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain"
  }
};

export { HeaderImage };
