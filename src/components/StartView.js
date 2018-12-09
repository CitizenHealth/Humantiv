import React, { Component } from "react";
import { View, Text, Platform, Alert} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { HeaderImage } from "./common";
import { dataExists, fetchUser, getConfiguration, dataSave } from "../actions";
import { theme } from './themes';
import configData from '../configuration/appconfig.json';
import {MeditCoefficients} from '../business/medit/configuration';
import Spinner from "react-native-spinkit";
import {
  Sentry,
  SentrySeverity,
  SentryLog
} from 'react-native-sentry';
    

class StartView extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.registered !== undefined && 
      Actions.currentScene !== 'journey' &&
      Actions.currentScene !== 'tab' &&
      Actions.currentScene !== 'settingsjourney' &&
      nextProps.registered !== this.props.registered
    ) {
      (nextProps.registered) ? Actions.main(): Actions.journey();
    }
  }

  shouldComponentUpdate(nextProps) {
    if ((nextProps.registered !== this.props.registered) || 
      ((nextProps.registered) && (this.props.registered))) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    const {children} = this.props;

    firebase.notifications().onNotification((notification) => {
      const title = notification.title;
      const body = notification.body;

      Alert.alert(
        title,
        body,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    });
    // Connect Firebase Messaging
    firebase.messaging().onMessage((payload) => {
      console.log(`ALERT PAYLOAD: ${JSON.stringify(payload)}`);
      // const title = Platform.OS === 'ios' ? payload.aps.alert.title : payload.fcm.title;
      // const body = Platform.OS === 'ios' ? payload.aps.alert.body : payload.fcm.body;

      // Alert.alert(
      //   title,
      //   body,
      //   [
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ],
      //   { cancelable: false }
      // )
    });

      // Init Google Analytics
      firebase.analytics().setAnalyticsCollectionEnabled(true);
      firebase.analytics().setCurrentScreen('Loading Screen', 'StartView')

      // Retrieve Firebase Remote Configurations
      // Set default values
      if (__DEV__) {
        firebase.config().enableDeveloperMode();
      }
      firebase.config().setDefaults({
        share_title: configData.share_title,
        share_message: configData.share_message,
        tutorial_title: configData.tutorial_title,
        tutorial_text: configData.tutorial_text,
        tutorial_background_color: configData.tutorial_background_color,
        master_coefficient: MeditCoefficients.master_coefficient, 
        steps_factor: MeditCoefficients.steps_factor,
        steps_corrector: MeditCoefficients.steps_corrector,
        steps_minimum: MeditCoefficients.steps_minimum,
        sleep_factor: MeditCoefficients.sleep_factor,
        sleep_minimum: MeditCoefficients.sleep_minimum,
        sleep_corrector: MeditCoefficients.sleep_corrector,
        activity_factor: MeditCoefficients.activity_factor,
        activity_minimum: MeditCoefficients.activity_minimum,
        activity_corrector: MeditCoefficients.activity_corrector
      });

      // Fetch remote configuration parameters
      this.props.getConfiguration('share_title');
      this.props.getConfiguration('share_message');
      this.props.getConfiguration('tutorial_title');
      this.props.getConfiguration('tutorial_text');
      this.props.getConfiguration('tutorial_background_color');
      this.props.getConfiguration('master_coefficient');
      this.props.getConfiguration('steps_factor');
      this.props.getConfiguration('steps_corrector');
      this.props.getConfiguration('steps_minimum');
      this.props.getConfiguration('sleep_factor');
      this.props.getConfiguration('sleep_minimum');
      this.props.getConfiguration('sleep_corrector');
      this.props.getConfiguration('activity_factor');
      this.props.getConfiguration('activity_minimum');
      this.props.getConfiguration('activity_corrector');

      // Take care of Authentication
      firebase.app().auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.fetchUser(user);

        // Requests messaging permissions from the user
        firebase.messaging().hasPermission()
        .then(enabled => {
          if (enabled) {
            // user has permissions
            console.log(`User has messaging permission`);
          } else {
            console.log(`    User is requesting messaging permission`);            
          } 
          firebase.messaging().requestPermission()
          .then(() => {
            // gets the device's push token
            console.log(`    Requesting messaging permission succeeded`);
            firebase.messaging().getToken()
            .then(token => {      
              // stores the token in the user's document
              console.log(`FCM Token: ${token}`);
              if(token && token != undefined) {
                console.log(`    Token: ${token}`);                
                this.props.dataSave({type: 'messaging', data: token});
              }
            })
          })
          .catch(error => {
            // User has rejected permissions  
          });
        });
        
        // Set Google analytics
        console.log(`USER ID: ${user.uid}`);

        // Crashing on Android. To be fixed later
        // firebase.iid().get()
        // .then((id) => {
        //   // Log the activity array
        //   Sentry.captureMessage(`Firebase Instance ID: ${id}`, {
        //     level: SentrySeverity.Info
        //   });
        //   console.log(`Firebase Instance ID: ${id}`)
        // });
        
        firebase.analytics().setUserId(user.uid);
        firebase.analytics().setUserProperty('email', user.email);

        // Set Sentry crash reporting context
        // set the user context
        Sentry.setUserContext({
          email: user.email,
          userID: user.uid,
          username: user.username,
          extra: {
            "is_admin": false
          }
        });   
        
        if (user.emailVerified 
          || user.providerData[0].providerId === "facebook.com"
          || user.providerData[0].providerId === "google.com"
        ) {
          console.log('Email is verified');
          this.props.dataExists({type: 'journey'});
          // check and routing to the Journey View or the Main View are handled
          //in the callback of the dataExists() function
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
        this.props.registered = undefined;
        if (Actions.currentScene === "load"
            || Actions.currentScene === "login")
          Actions.auth();
        else {
          Actions.reset('auth');
        }
      }
    });
    // Handle invites
    firebase.links()
    .getInitialLink()
    .then((url) => {
        if (url) {
            // app opened from an Invitation
        } else {
           // app NOT opened from an invitation
        }
    });
    
    // subscribe
    const unsubscribe = firebase.invites()
    .onInvitation(
      (invitation) => {
      console.log(invitation);
    });

    // unsubscribe
    unsubscribe();

    firebase.invites()
    .getInitialInvitation()
    .then((invitation) => {
        if (invitation) {
          console.log("APP OPENED FROM INVITATION");
          console.log(invitation);
        } else {
          console.log("APP NOT OPENED FROM INVITATION");
        }
    });

    // disable stacktrace merging
    Sentry.config("https://0999f8401b0844a7b4279508d1d5bac9:5f9c3a1bdca04884aea7634085ce459e@sentry.io/275892", {
      deactivateStacktraceMerging: false, // default: true | Deactivates the stacktrace merging feature
      logLevel: SentryLog.None, // default SentryLog.None | Possible values:  .None, .Error, .Debug, .Verbose
      disableNativeIntegration: false, // default: false | Deactivates the native integration and only uses raven-js
      handlePromiseRejection: true // default: true | Handle unhandled promise rejections
      // sampleRate: 0.5 // default: 1.0 | Only set this if you don't want to send every event so e.g.: 0.5 will send 50% of all events
      // These two options will only be considered if stacktrace merging is active
      // Here you can add modules that should be ignored or exclude modules
      // that should no longer be ignored from stacktrace merging
      // ignoreModulesExclude: ["I18nManager"], // default: [] | Exclude is always stronger than include
      // ignoreModulesInclude: ["RNSentry"], // default: [] | Include modules that should be ignored too
      // ---------------------------------
    }).install();
    
    // set a callback after an event was successfully sentry
    // its only guaranteed that this event contains `event_id` & `level`
    Sentry.setEventSentSuccessfully((event) => {
      // can also be called outside this block but maybe null
      // Sentry.lastEventId(); -> returns the last event_id after the first successfully sent event
      // Sentry.lastException(); -> returns the last event after the first successfully sent event
    });
    
    Sentry.setShouldSendCallback((event) => {
      return true; // if return false, event will not be sent
    });
    
    // Sentry.lastException(); // Will return the last sent error event
    // Sentry.lastEventId(); // Will return the last event id
    
    // export an extra context
    // Sentry.setExtraContext({
    //   "a_thing": 3,
    //   "some_things": {"green": "red"},
    //   "foobar": ["a", "b", "c"],
    //   "react": true,
    //   "float": 2.43
    // });
    
    // set the tag context
    Sentry.setTagsContext({
      "environment": "production",
      "react": true
    });
  }

  render() {
//    console.log(`Routes states: ${Actions._state.routes}`);
 
    const { starPageStyle, startSpinnerStyle} = theme;

    return (
      <View style={starPageStyle}>
        <Spinner 
          style={startSpinnerStyle}
          isVisible={true}
          size={scale(60)}
          type='ThreeBounce' 
          color="white"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, loggedin } = state.auth;
  const { children, registered } = state.data;
  const { 
          share_title, 
          share_message, 
          tutorial_title, 
          tutorial_text, 
          master_coefficient, 
          steps_factor, 
          steps_corrector, 
          steps_minimum, 
          sleep_factor, 
          sleep_minimum, 
          sleep_corrector, 
          activity_factor, 
          activity_minimum, 
          activity_corrector 
        } = state.config.configuration;
  return { user, loggedin, children, registered, share_title, share_message, tutorial_title, tutorial_text,
            master_coefficient, steps_factor, steps_corrector, steps_minimum, sleep_factor, sleep_minimum, 
            sleep_corrector, activity_factor, activity_minimum, activity_corrector };
};

export default connect(mapStateToProps, { 
  fetchUser, 
  getConfiguration,
  dataSave,
  dataExists
})(StartView);
