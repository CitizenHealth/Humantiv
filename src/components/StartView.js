import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Spinner, HeaderImage } from "./common";
import Images from "../resources/images";

class StartView extends Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        Actions.main();
      } else {
        Actions.login();
      }
    });
  }

  render() {
    const { pageStyle, spinnerStyle} = styles;

    return (
      <View style={pageStyle}>
        <Spinner size="large" style={spinnerStyle} />
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
  spinnerStyle: {
    color: "white"
  }
};

const mapStateToProps = state => {
  const { loggedin } = state.auth;
  return { loggedin };
};

export default connect(mapStateToProps)(StartView);
