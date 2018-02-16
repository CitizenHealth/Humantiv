import React, { Component } from "react";
import { View, Text, Platform} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import {Button, HeaderImage, LeftButton, LinkText } from "./common";
import { Actions } from "react-native-router-flux";
import { scale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import Images from "../resources/images";
import { fetchUser } from "../actions";

const modalMessages = {
  continue: "Please confirm your email",
  resend: "A new confirmation email was just sent!"
};

class EmailConfirmation extends Component {
  
  state = {
    visibleModal: false,
    textModal: modalMessages.continue
  };

  dismissModal() {
    this.setState({visibleModal: !this.state.visibleModal});
  }

  resendConfirmationEmail() {
    const firebaseUser = firebase.auth().currentUser;
    console.log(`user: ${firebaseUser}`);
    console.log('Email is not verified');
    firebase.auth().languageCode = 'en';
    firebaseUser.sendEmailVerification()
    .then(() => { 
      console.log(`ECV - Verification email sent`);
      this.setState({visibleModal: true, textModal: modalMessages.resend});
    })
    .catch((error) => {
      console.log(`ECV - Error sending verification email: ${error}`);
    });
  }

  confirmEmail() {
    var firebaseUser = firebase.auth().currentUser;

    if (firebaseUser) {
      firebaseUser.reload()
      .then(() => {
        firebaseUser = firebase.auth().currentUser;
        if (firebaseUser._user.emailVerified) {
          console.log('Email is verified');
          Actions.main();
          return;
        } else {
          this.setState({visibleModal: true, textModal: modalMessages.continue});
        }
      });    
    } else {
      Actions.login();
    }
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
            <HeaderImage source={Images.img_login_email}/>
          </View>
          <View style={textContainerStyle} >
              <Text style={[textStyle, {fontSize: 24, fontWeight: 'bold', flex: 1}]}>
                Confirm your email address
              </Text>
              <Text style={[textStyle, {flex: 1}]}>
                We sent a confirmation email to:
              </Text>
             <Text style={[textStyle, {color: "#E9222E", flex: 1}]}>
                {(user) ? user.email : ""}
              </Text>
              <Text style={textStyle}>
                Check your email and click on the confirmation link to continue.
              </Text>
            </View>
          <View style={buttonContainerStyle} >
            <Button style={buttonStyle} onPress={this.confirmEmail.bind(this)}>
              Continue
            </Button>
          </View>
          <View style={linkContainerStyle} >
            <LinkText
              onPress={this.resendConfirmationEmail.bind(this)}
            >
              Resend confirmation email
            </LinkText>
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
    alignItems: 'center',
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
  buttonStyle: {
    alignSelf: "stretch"
  },
  buttonContainerStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: scale(10),
    paddingRight: scale(10)
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

export default connect(mapStateToProps, { fetchUser })(EmailConfirmation);