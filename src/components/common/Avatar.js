import React from "react";
import { Image, View } from "react-native";

const Avatar = ({imageURL, source}) => {
  const { containerStyle } = styles;
  return (
        <View style={containerStyle} >
            {renderImage(imageURL,source)}
        </View>
  );
};
 
const styles = {
  containerStyle: {
    flex: 1,
    alignContent: 'stretch',
    alignItems: 'center'
  },
  imageStyle: {
    height: 40,
    width: 40,
 //   backgroundColor: 'yellow'
  }
};

const renderImage = (imageURL, source) => {
  const { imageStyle } = styles;

  if (imageURL) {
    return <Image style={imageStyle} source={{uri: imageURL}} />;
  } else {
    return <Image style={imageStyle} source={source} />;
  }
};
export { Avatar };