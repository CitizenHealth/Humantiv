import React from "react";
import { Text, View } from "react-native";
import { theme } from '../themes';

const Card = (props) => {
  const {cardTitleStyle, cardTitleContainerStyle,  cardContainerStyle} = theme;

  return (
    <View style={cardContainerStyle}>
      {(props.title) ?
        <View style={cardTitleContainerStyle}>
          <Text style={cardTitleStyle}>
            {props.title}
          </Text>
        </View>
      : null}
      {props.children}
    </View>
  );
};

export { Card };
