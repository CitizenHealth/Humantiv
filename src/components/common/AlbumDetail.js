import React from "react";
import { Text, View, Image, Linking } from "react-native";
import { Card, Button, CardSection } from "../common";

const AlbumDetail = ({ album }) => {

  const { title, artist, thumbnail_image, image, url } = album;
  const { thumbnailStyle, containerStyle, titleStyle, imageStyle } = styles;

  return (
    <Card>
      <CardSection>
        <View>
          <Image style={thumbnailStyle} source={{ uri: thumbnail_image }} />
        </View>
        <View style={containerStyle}>
          <Text style={titleStyle}> { title } </Text>
          <Text> { artist } </Text>
        </View>
      </CardSection>
      <CardSection>
        <View style={{ flex: 1 }}>
          <Image style={imageStyle} source={{ uri: image }} />
        </View>
      </CardSection>
      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          Buy {title}
        </Button>
      </CardSection>

    </Card>
  );
};

const styles = {
    containerStyle: {
      flexDirection: "column",
      justifyContent: "space-around"
    },
    titleStyle: {
      fontSize: 18
    },
    thumbnailStyle: {
      height: 50,
      width: 50
    },
    imageStyle: {
      height: 300,
      width: null
    }
};
export { AlbumDetail };
