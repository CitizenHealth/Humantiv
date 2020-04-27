import React, { Component } from "react";
import { View, Text, SafeAreaView, Image} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import {Button, HeaderImage, LinkText } from "./common";
import {
  ModalDialog 
} from './custom'; 
import { Actions } from "react-native-router-flux";
import { scale } from "react-native-size-matters";
import firebase from "react-native-firebase";
import Images from "../resources/images";
import FontAwesome, { RegularIcons } from 'react-native-fontawesome';
import { dataFetch, fetchUser } from "../actions";
import { theme, primaryBlueColor, primaryGreyColor, modalMessages} from './themes';
import {Fonts} from '../resources/fonts/Fonts';

class EmailConfirmation extends Component {
  
  state = {
    visibleModal: false,
    textModal: modalMessages.continue
  };

  componentWillMount () {
    this.props.dataFetch({type: 'profile'});
  }

  dismissModal() {
    this.setState({visibleModal: false});
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
    const {children} = this.props;

    if (firebaseUser) {
      firebaseUser.reload()
      .then(() => {
        firebaseUser = firebase.auth().currentUser;
        if (firebaseUser._user.emailVerified) {
          console.log('Email is verified');
          (children.profile && children.profile.journey) ? Actions.main(): Actions.journey();
        } else {
          this.setState({visibleModal: true, textModal: modalMessages.continue});
        }
      });    
    } else {
      Actions.register();
    }
  }

  render() {
    const { user } = this.props;

    const { 
      pageStyle,
      ImageContainerStyle,
      buttonContainerStyle,
      navigationBarStyle,
      textContainerStyle,
      buttonStyle,
      linkContainerStyle,
      modalContent,
      modalStyle,
      linkTextStyle
    } = styles;

    firebase.analytics().setCurrentScreen('Email Confirmation Screen', 'EmailConfirmationView')

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={pageStyle}>
          <View style={ImageContainerStyle} >
            <Image 
              style={{
                height: scale(100),
                width: scale(100)
              }}
              source={Images.img_login_email}/>
          </View>
          <View style={textContainerStyle} >
              <Text style={[theme.primaryGreyTextStyle, {fontSize: 24, fontWeight: 'bold', flex: 1}]}>
                Confirm your email address
              </Text>
              <Text style={[theme.primaryGreyTextStyle, {flex: 1}]}>
                We sent a confirmation email to:
              </Text>
             <Text style={[theme.primaryGreyTextStyle, {color: primaryBlueColor, flex: 1}]}>
                {(user) ? user.email : ""}
              </Text>
              <Text style={theme.primaryGreyTextStyle}>
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
              style={linkTextStyle}
              onPress={this.resendConfirmationEmail.bind(this)}
            >
              Resend confirmation email
            </LinkText>
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
        </View>
      </SafeAreaView>  
    );
  }
}

const styles = {
  pageStyle: {
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: '#fff',
    flex: 1
  },
  linkTextStyle: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "800",
    fontFamily: Fonts.regular
  },
  navigationBarStyle: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 10,
    flex: 1
  },
  ImageContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
//    backgroundColor: 'blue'
  },
  textContainerStyle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: "center",
//    backgroundColor: "yellow",
  },
  buttonStyle: {
    alignSelf: "stretch"
  },
  buttonContainerStyle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: scale(40),
    paddingRight: scale(40),
//    backgroundColor: 'red'
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
  const {children } = state.data;

  return { user, children };
};

export default connect(mapStateToProps, { dataFetch, fetchUser })(EmailConfirmation);