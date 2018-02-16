import React from "react";
import { Text, View } from "react-native";

const Card = (props) => {
  const {titleStyle, titleContainerStyle,  containerStyle} = styles;

  return (
    <View style={containerStyle}>
      {(props.title) ?
        <View style={titleContainerStyle}>
          <Text style={titleStyle}>
            {props.title}
          </Text>
        </View>
      : null}
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  titleContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    backgroundColor: "#E9222E"
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    paddingLeft: 20,
    flex: 1
  }
};

export { Card };
