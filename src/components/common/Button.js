import React from "react";
import { Text, TouchableOpacity, Platform } from "react-native";
import { scale } from "react-native-size-matters";

const Button = ({ onPress, children, backgroundC = "#E9222E", textColor="white" }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, { backgroundColor: backgroundC, borderColor: backgroundC }]} >
      <Text style={[textStyle, { color: textColor}]}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  },
  buttonStyle: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "#E9222E",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E9222E",
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
