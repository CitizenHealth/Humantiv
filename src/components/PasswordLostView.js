import React, { Component } from "react";
import { View, Text, Platform} from "react-native";

class PasswordLostView extends Component {

  render() {
    const { pageStyle, textStyle} = styles;

    return (
        <View style={pageStyle}>
            <Text style={textStyle}>
                Password Lost
            </Text>
        </View>
    );
  }
}

const styles = {
  pageStyle: {
    justifyContent: "space-between",
    backgroundColor: "#E9222E",
    flexDirection: "column",
    flex: 1
  },
  textStyle: {
    flexGrow: 1,
    fontSize: 18,
    color: "#808080",
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  }
};
export default PasswordLostView;