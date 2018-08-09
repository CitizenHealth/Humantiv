import React from "react";
import { StyleSheet, Platform } from "react-native";
import { scale } from "react-native-size-matters";
import { Fonts } from '../../resources/fonts/Fonts';

export const primaryBlueColor = '#3C9AFB';
export const primaryGreyColor = '#b6bbc4';
export const secondaryGreyColor = '#545962';
export const primaryGreenColor = '#36d491';
export const primaryBackgroungColor = '#f9fafc';
export const primaryWhiteColor = '#fff';

export const hGraphColor = '#afedd3';

export const highlightedGreenColor = '#57d777'
export const highlightedGreyColor = '#c8ccd3'

export const graphGreyColor = '#757b86';
export const graphRedColor = '#f15b58';
export const graphOrangeColor = '#efb6094';
export const graphGreenColor = '#36d391';

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
    message: "An email with password change instructions was sent! Please check your spam folder in needed.",
    cancel: "OK",
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
  },
  applehealth: {
    title: "",
    message:"What wearables do you want to sync with? \n\n\n"+
            "Humantiv allows you to connect your health and fitness devices in two different ways:\n\n"+
            "APPLE HEALTH: Humantiv will sync with The Apple Health app in your iPhone and will pull data from any device you already connected to Apple Health."+
            "\nExamples of devices supported are: Apple Watch, Beddit 3, Xiaomi Mi Band 2, Nike+, RunKeeper, Lark, and Weight Watchers." +
            "\n\nHUMAN API: You will not need the Apple Health App and can sync directly with your device or app data." +
            "\nExamples of devices supported are: FitBit, Misfit, Strava, Nokia-Withings, and MapMyFitness.",
    cancel: "HUMAN API",
    accept: "APPLE HEALTH"
  },
  googlefit: {
    title: "",
    message:"What wearables do you want to sync with? \n\n\n"+
            "Humantiv allows you to connect your health and fitness devices in two different ways:\n\n"+
            "GOOGLE FIT: Humantiv will sync with The Google Fit app in your Android phone and will pull data from any device you already connected to Google Fit."+
            "\nExamples of devices supported are: Wear OS, LG Watch Sport, Xiaomi Mi Band 2, Huawei Watch 2, Nike+, RunKeeper, and 7 Minutes Workout." +
            "\n\nHUMAN API: You will not need the Google Fit App and can sync directly with your device or app data." +
            "\nExamples of devices supported are: FitBit, Misfit, Strava, Nokia-Withings, and MapMyFitness.",
    cancel: "HUMAN API",
    accept: "GOOGLE FIT"
  }
};
// Units
export const Units = {
  Weight: {
    Pounds: "lb",
    Kilograms: "kg"
  },
  Height: {
    Feet: "ft",
    Centimeters: "cm"
  }
}
// Remote Configuration Candidate
export const ActivityFeedTypes = {
  Activity: {
    Score: 'score',
    Run: 'run',
    Walk: 'walk',
    Swim: 'swim',
    Bike: 'bike',
    Workout: 'workout',
    Soccer: 'soccer',
    Basketball: 'basketball',
    Baseball: 'baseball'
  },
  Vital: {
    Temperature: 'temperature',
    BloodPressure: 'bloodpressure',
    HeartRate: 'heartrate',
    SPO2: 'spo2'
  },
  Health: {
    Sleep: 'sleep',
    Workout: 'workout',
    Weight: 'weight'
  },
  Wallet: {
    Medits: 'medits',
    StepsMedits: "stepsmedits",
    SleepMedits: 'sleepmedits',
    ActivityMedits: 'activitymedits',
    Medex: 'medex'
  },
  Market: {
    Recommendation: 'recommendation',
    Deal: 'deal'
  },
  Vote: {
    Alert: 'alert',
    Result: 'result'
  },
  Profile: {
    Missing: 'complete'
  },
  Community: {
    Announcement: 'announcement'
  }
}
export const theme = StyleSheet.create({
  buttonStyle: {
    height: 50,
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
    fontFamily: Fonts.bold,
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
    color: secondaryGreyColor,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    fontFamily: Fonts.regular,
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
    height: 50,
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
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: primaryBackgroungColor,
    flexDirection: "column",
    flex: 1
  },
  startSpinnerStyle: {
    color: primaryBlueColor
  },
  primaryWhiteTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: "center",
    fontFamily: Fonts.bold
  },
  primaryGreyTextStyle: {
    fontSize: 16,
    color: primaryGreyColor,
    textAlign: "center",
    fontFamily: Fonts.regular
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
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color: primaryBlueColor,
    fontFamily: Fonts.regular
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
 