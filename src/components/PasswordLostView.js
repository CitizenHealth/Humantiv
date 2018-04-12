import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import {
  Button, 
  HeaderImage, 
  IconButton, 
  CardSection, 
  Card 
} from "./common";
import { 
  IconInput,
  ModalDialog 
} from './custom'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from "react-native-router-flux";
import { scale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import Images from "../resources/images";
import { checkEmail } from '../business';
import { theme, primaryBlueColor, primaryGreyColor, modalMessages} from './themes';

class PasswordLostView extends Component {
  
  state = {
    passwordReset: false,
    visibleModal: false,
    textModal: modalMessages.emailSent,
    email: ""
  };

  onMailChangeText(text) {
    this.setState({email: text});
  }

  dismissModal() {
    this.setState({visibleModal: !this.state.visibleModal});
    if(this.state.passwordReset) {
      Actions.pop();
    }
  }

  sendPasswordInstructions() {
    const { email } = this.state;
    console.log(checkEmail(email));
    if (!checkEmail(email)){
      this.setState({
        visibleModal: true,
        textModal: modalMessages.badEmail
      });
      return;
    }

    // Find user by email


    const firebaseUser = firebase.auth().currentUser;
    console.log(`user: ${firebaseUser}`);
    firebase.auth().languageCode = 'en';
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => { 
      console.log(`PWD - Verification email sent`);
      this.setState({
        passwordReset: true, 
        visibleModal: true, 
        textModal: modalMessages.emailSent
      });
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        this.setState({
          visibleModal: true,
          textModal: modalMessages.noUser
        });
      }
      console.log(`PWD - Error sending password instruction email: ${error}`);
    });
  }

  render() {
    const { user } = this.props;

    const { 
      pageStyle,
      ImageContainerStyle,
      textStyle,
      buttonContainerStyle,
      navigationBarStyle,
      textContainerStyle,
      buttonStyle,
      linkContainerStyle,
      modalContent,
      modalStyle
    } = styles;

    firebase.analytics().setCurrentScreen('Password Lost Screen', 'PasswordLostView')

    return (
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={pageStyle}
          scrollEnabled={false}
        >
          <View style={navigationBarStyle}>
            <IconButton onPress={() => {Actions.pop()}}>
              <FontAwesome>{Icons.chevronLeft}</FontAwesome>
            </IconButton>
          </View>
          <View style={ImageContainerStyle} >
            <HeaderImage source={Images.img_login_password}/>
          </View>
          <View style={textContainerStyle} >
              <Text style={[textStyle, {fontSize: 24, fontWeight: 'bold', flex: 1}]}>
                Forgot your password?
              </Text>
              <Text style={[textStyle, {
                flex: 1,               
                paddingLeft: scale(20),
                paddingRight: scale(20)
              }]}>
                Enter your email below to receive your password reset instructions
              </Text>
              <View style={{
                flex: 2,
                paddingLeft: scale(20),
                paddingRight: scale(20)
              }}>
                  <CardSection>
                    <IconInput
                      icon={Icons.envelopeO}
                      placeholder="Email address"
                      onChangeText={this.onMailChangeText.bind(this)}
                      keyboardType="email-address"
                      returnKeyType={ "next" }
                    />
                  </CardSection>
              </View>
            </View>
          <View style={buttonContainerStyle} >
            <Button
              onPress={this.sendPasswordInstructions.bind(this)}>
              Recover Password
            </Button>
          </View>
            <ModalDialog
            visible={this.state.visibleModal}
            label={this.state.textModal.message}
            cancelLabel={this.state.textModal.cancel}
            acceptLabel={this.state.textModal.accept}
            onCancelPress={this.dismissModal.bind(this)}
            onAcceptPress={this.dismissModal.bind(this)}
          >
          </ModalDialog>
        </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  pageStyle: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff"
  },
  navigationBarStyle: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 10,
    flex: 1
  },
  ImageContainerStyle: {
    flex: 4,
    padding: scale(40),
  },
  textContainerStyle: {
    flex: 4,
    alignItems: 'stretch',
    justifyContent: "center",
 //   backgroundColor: "yellow",
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: "center",
    padding: scale(20),

    backgroundColor: "red"
  },
  modalStyle:{
    alignItems: 'center'
  },
  buttonContainerStyle: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: "space-around",
    paddingLeft: scale(20),
    paddingRight: scale(20)
  },

  textStyle: {
    fontSize: 18,
    color: "#808080",
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  },
  linkContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'flex-end',
    height: 80,
    paddingBottom: 20
  }
};

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(mapStateToProps)(PasswordLostView);