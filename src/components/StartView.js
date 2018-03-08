import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Spinner, HeaderImage } from "./common";
import { fetchUser } from "../actions";
import Images from "../resources/images";
import { theme } from './themes';

class StartView extends Component {

  componentWillMount() {
      FCM = firebase.messaging();

      firebase.app().auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.fetchUser(user);
        // requests permissions from the user
        FCM.requestPermissions();

        // gets the device's push token
        FCM.getToken().then(token => {
        
          // stores the token in the user's document
          console.log(`FCM Token: ${token}`);
        });

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
        if (Actions.currentScene === "load"
            || Actions.currentScene === "login")
          Actions.auth();
        else {
          Actions.reset('auth');
        }
      }
    });
  }

  render() {
    console.log(`Routes states: ${Actions._state.routes}`);
 
    const { starPageStyle, startSpinnerStyle} = theme;

    return (
      <View style={starPageStyle}>
        <Spinner size="large" style={startSpinnerStyle} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, loggedin } = state.auth;
  return { user, loggedin };
};

export default connect(mapStateToProps, { fetchUser })(StartView);
