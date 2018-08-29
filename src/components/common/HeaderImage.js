import React from "react";
import { View, Image } from "react-native";

const HeaderImage = ({ source }) => {
  const { imageStyle } = styles;

  return (
    <View style={{ 
        alignItems: 'flex-start'
      }} 
    >
      <Image
        style={imageStyle}
        source={source}
      />
    </View>
  );
};

const styles = {
  imageStyle: {
    height: 40,
    width: 160,
    resizeMode: "contain"
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: "grey",
    // shadowOpacity: 0.7
  }
};

export { HeaderImage };
