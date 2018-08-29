import React, { Component } from "react";
import { View, Text, Image, SafeAreaView} from "react-native";
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
import {Fonts} from '../resources/fonts/Fonts';
import {primaryWhiteColor} from './themes/theme';

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
          style={{ backgroundColor: primaryWhiteColor }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={pageStyle}
          scrollEnabled={true}
        >
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={navigationBarStyle}>
              <IconButton onPress={() => {Actions.pop()}}>
                <FontAwesome>{Icons.angleLeft}</FontAwesome>
              </IconButton> 
              <View style={{
                height: 60,
                width: 60
              }}/>                   
            </View>
            <View style={ImageContainerStyle} >
              <Image 
                style={{
                  height: scale(100),
                  width: scale(100)
                }}
                source={Images.img_login_password}/>
            </View>
            <View style={textContainerStyle} >
                <Text style={[textStyle, {fontSize: 24, fontWeight: 'bold', flex: 1}]}>
                  Forgot your password?
                </Text>
                <Text style={[textStyle, {
                  flex: 1,               
                  paddingLeft: scale(15),
                  paddingRight: scale(15),
                  marginBottom: scale(20)
                }]}>
                  Enter your email below to receive your password reset instructions
                </Text>
                <View style={{
                  flex: 2,
                  paddingLeft: scale(40),
                  paddingRight: scale(40)
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
          </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: "space-between",
    height: scale(60),
    alignItems: 'center',
    alignContent: 'stretch'
  },
  ImageContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    flex: 4,
    alignItems: 'stretch',
    justifyContent: "space-between"
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
    justifyContent: "flex-start",
    paddingLeft: scale(40),
    paddingRight: scale(40)
  },

  textStyle: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    fontFamily: Fonts.regular
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