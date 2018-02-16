import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Spinner, HeaderImage } from "./common";
import { fetchUser } from "../actions";
import Images from "../resources/images";

class StartView extends Component {

  componentWillMount() {
    firebase.app().auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.fetchUser(user);
        if (user.emailVerified 
          || user.providerData[0].providerId === "facebook.com"
          || user.providerData[0].providerId === "google.com"
        ) {
          console.log('Email is verified');
          Actions.main();
        }
        else {
          console.log('Email is not verified');
          firebase.auth().languageCode = 'en';
          user.sendEmailVerification()
          .then(() => { 
            console.log(`SV - Verification email sent`);
          })
          .catch((error) => {
            console.log(`SV - Error sending verification email: ${error}`);
          }); 
          Actions.verify();
        }       
      } else {       
        console.log(`Route: ${Actions.currentScene}`);
        if (Actions.currentScene === "load")
          Actions.login();
        else {
          Actions.pop();
        }
      }
    });
  }

  render() {
    console.log(Actions._state.routes);
 
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
  const { user, loggedin } = state.auth;
  return { user, loggedin };
};

export default connect(mapStateToProps, { fetchUser })(StartView);
