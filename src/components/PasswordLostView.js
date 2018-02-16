import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import {Button, HeaderImage, LeftButton, Input, CardSection, Card } from "./common";
import { Actions } from "react-native-router-flux";
import { scale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import Images from "../resources/images";
import { checkEmail } from '../business';

const modalMessages = {
  badEmail: "The email address entered is invalid",
  noUser: "The email address entered is not registered",
  password: "A email with password change instructions was sent!"
};

class PasswordLostView extends Component {
  
  state = {
    passwordReset: false,
    visibleModal: false,
    textModal: modalMessages.password,
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
        textModal: modalMessages.password
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

    return (
        <View style={pageStyle}>
          <View style={navigationBarStyle}>
            <LeftButton onPress={() => Actions.pop()}/>
          </View>
          <View style={ImageContainerStyle} >
            <HeaderImage source={Images.img_login_password}/>
          </View>
          <View style={textContainerStyle} >
              <Text style={[textStyle, {fontSize: 24, fontWeight: 'bold', flex: 1}]}>
                Forgot your password?
              </Text>
              <Text style={[textStyle, {flex: 1}]}>
                Enter your email below to receive your password reset instructions
              </Text>
              <View style={{flex: 2}}>
                <Card>
                  <CardSection>
                    <Input
                      label="Email"
                      placeholder="email@provider.com"
                      keyboardType="email-address"
                      enablesReturnKeyAutomatically
                      returnKeyType={ "done" }
                      onChangeText={this.onMailChangeText.bind(this)}
                    />
                  </CardSection>
                </Card>
              </View>
            </View>
          <View style={buttonContainerStyle} >
            <Button style={buttonStyle} onPress={this.sendPasswordInstructions.bind(this)}>
              Send password
            </Button>
          </View>
          <Modal
            isVisible={this.state.visibleModal}
            backdropOpacity={0.5}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            style={modalStyle}
          >
            <View style={modalContent}>
              <Text style={[textStyle, {color: "white", paddingBottom: scale(20)}]} >{this.state.textModal}</Text>              
              <Button 
                onPress={this.dismissModal.bind(this)}
                backgroundC= "white"
                textColor= "#E9222E" 
              >
                Ok
              </Button>
             </View>
        </Modal>
        </View>
    );
  }
}

const styles = {
  pageStyle: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1
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
    paddingLeft: scale(80),
    paddingRight: scale(80)
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