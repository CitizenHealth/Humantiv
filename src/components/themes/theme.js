import React from "react";
import { StyleSheet, Platform } from "react-native";
import { scale } from "react-native-size-matters";

export const primaryBlueColor = '#3C9AFB';
export const primaryGreyColor = 'grey';

export const modalMessages = {
  badEmail: {
    title: "",
    message: "The email address entered is invalid",
    cancel: "CANCEL",
    accept: ""
  },
  badPassword: {
    title: "Invalid password",
    message: "Please make sure your password is valid before signing up",
    cancel: "",
    accept: ""
  },
  noEmail: {
    title: "",
    message: "The email entered is not registered.",
    cancel: "CANCEL",
    accept: "REGISTER"
  },
  noUser: {
    title: "",
    message: "The email address entered is not registered",
    cancel: "CANCEL",
    accept: ""
  },
  emailSent: {
    title: "",
    message: "An email with password change instructions was sent!",
    cancel: "CANCEL",
    accept: ""
  },
  continue: {
    title: "",
    message: "Please confirm your email",
    cancel: "CANCEL",
    accept: ""
  },  
  resend: {
    title: "",
    message:"A new confirmation email was just sent!",
    cancel: "CANCEL",
    accept: ""
  }

};

export const theme = StyleSheet.create({
  buttonStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 45,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: primaryBlueColor,
    
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: primaryBlueColor,
    // shadowOpacity: 0.7
  },
  textButtonStyle: {
    flex: 1,
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white'
  },
  disabledButtonStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 45,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    opacity: 0.4,

  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
  
  inputStyle: {
    color: primaryGreyColor,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  inputLabelStyle: {
    fontSize: 18,
    color: primaryBlueColor,
    paddingLeft: 20,
    flex: 1
  },
  inputPasswordContainerStyle: {
    flex: 1,
    height: 80,
    flexDirection: "column",
    alignItems: "center"
  },
  inputContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  inputPasswordCheckerStyle: {
    flex: 1
  },
  iconButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },
  iconContentStyle: {
    margin: 10, 
    fontSize: 26, 
    textAlign: 'center', 
    color: primaryBlueColor
  },
  starPageStyle: {
    justifyContent: "space-between",
    backgroundColor: primaryBlueColor,
    flexDirection: "column",
    flex: 1
  },
  startSpinnerStyle: {
    color: "white"
  },
  primaryWhiteTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  },
  primaryGreyTextStyle: {
    fontSize: 18,
    color: primaryGreyColor,
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  },
  modalContent: {
    alignItems: 'stretch',
    justifyContent: "center",
    flexDirection:'column',
    backgroundColor: "white",

    shadowOffset:{  width: 20,  height: 20,  },
    shadowColor: '#000',
    shadowOpacity: 0.4
  },
  modalStyle:{
    alignItems: 'center',
    height: scale(50),
    paddingLeft: scale(50),
    paddingRight: scale(50)
  },
  dialogButtonContainerStyle: {
    justifyContent: 'flex-end',
    flexDirection:'row',
    paddingLeft: scale(10),
    paddingRight: scale(10)
  },
  dialogTextContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  dialogButtonStyle: {
    height: 44,
    paddingLeft: 10,
    paddingTop: 10,
    flexDirection: 'column'
  },
 dialogTextButtonStyle: {
    flex: 1,
    fontWeight: 'normal',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: primaryBlueColor
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 44
  },
  iconTextStyle: {
    margin: 2, 
    fontSize: 24, 
    textAlign: 'right'
  }
});
 