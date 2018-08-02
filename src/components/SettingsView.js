import React, { Component } from 'react';
import _ from 'lodash';
import { 
  ScrollView, 
  View, 
  Text, 
  Platform, 
  StyleSheet 
} from 'react-native';
import { 
  SettingsHeader,
  SettingsTextEntry,
  SettingsSwitch,
  SettingsChoice,
  SettingsSection,
  SettingsDataSource,
  SettingsJourney,
  IconButton
 } from "./common";
 import { 
  primaryBackgroungColor,
  primaryGreenColor,
  primaryBlueColor,
  graphGreyColor
} from './themes';
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { Actions } from 'react-native-router-flux';
import { TextInput } from "./custom"
import { 
  logoutUser,  
  dataSave,
  dataFetch,
  humanAPIFetch
} from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import RNHumanAPI from 'react-native-human-api';
import firebase from "react-native-firebase";
import {
  displayMeasurementFromMetric,
  saveHeightToMetric,
  saveWeightToMetric
} from '../business/Helpers';
import AppleHealthKit from 'rn-apple-healthkit';
import PasswordLostView from './PasswordLostView';

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class SettingsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appleHealthIsAvailable: false,
      googleFitIsAvailable: false
    }
  }

  componentWillMount () {
    if (Platform.OS === 'ios') {
      firebase.analytics().setCurrentScreen('Settings Screen', 'SettingsView');
      AppleHealthKit.isAvailable((err: Object, available: boolean) => {
        if (err) {
          console.log("error initializing Healthkit: ", err);
          return;
        }
        this.setState({appleHealthIsAvailable: true});
      });
    } else {

    }
  }

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  onSaveButtonPress() {
    const {children} = this.props;

    this.props.dataSave({type: "profile", data: children.profile});
    this.props.dataSave({type: "health", data: children.health});
    this.props.dataSave({type: "notifications", data: children.health});
  }

  connectHumanAPI = () => {
    const {children} = this.props;
    const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
    const clientUserId = this.props.user.uid;

    const humanAPI = new RNHumanAPI()
    const options = (public_token) ? {
        client_id: clientID,
        client_user_id: clientUserId,
        public_token: public_token,
        auth: (data) => this.sendAuth(data),
        auth_url: 'https://us-central1-health-score-6740b.cloudfunctions.net/humanAPITokenExchange',
        success: (data) => {
            // save publicToken
            this.saveHumanAPIPublicToken(data.public_token);

            console.log(`Human API Callback: ${data}`);
            this.props.humanAPIFetch(data.public_token);
        },  // callback when success with auth_url
        cancel: () => console.log('cancel')  // callback when cancel
    } : {
        client_id: clientID,
        client_user_id: clientUserId,
        auth: (data) => this.sendAuth(data),
        auth_url: 'https://us-central1-health-score-6740b.cloudfunctions.net/humanAPITokenExchange',
        success: (data) => {
            // save publicToken
            this.saveHumanAPIPublicToken(data.public_token);
            this.props.humanAPIFetch(data.public_token);
         },  // callback when success with auth_url
        cancel: () => console.log('cancel')  // callback when cancel
    }
    humanAPI.onConnect(options)
  }

  saveHumanAPIPublicToken(token) {
    const {children} = this.props;

    this.props.dataSave({type: "humanapi", data: {public_token: token}});
  } 

  renderHeader() {
    const { user } = this.props;
    const { avatarStyle } = this.props;
    if (user && user.photoURL) {
      return (
        < SettingsHeader
            name={user.displayName}
            email={user.email}
            image= {user.photoURL}
          />
      );
    } else if (user) {
      return (
        < SettingsHeader
              name={user.displayName}
              email={user.email}
        />
      );
    }
  }

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  saveAge(text) {
    this.props.dataSave({type: "profile", data: {age: parseInt(text)}});
  }

  saveWeight(text) {
    const {children} = this.props;

    const profile_weight_unit = (children.profile) ? children.profile.weight_unit : "";
    const metricValue = saveWeightToMetric(text, profile_weight_unit);
    this.props.dataSave({type: "profile", data: {weight: metricValue}});
  }
  
  saveHeight(text) {
    const {children} = this.props;

    const profile_height_unit = (children.profile) ? children.profile.height_unit : "";
    const metricValue = saveHeightToMetric(text, profile_height_unit);
    this.props.dataSave({type: "profile", data: {height: metricValue}});
  }

  onGenderChange(value,label) {
    this.props.dataSave({type: "profile", data: {gender: value}});
  }

  onWeightUnitChange(value,label) {
    this.props.dataSave({type: "profile", data: {weight_unit: value}});
  }

  onHeightUnitChange(value,label) {
    this.props.dataSave({type: "profile", data: {height_unit: value}});
  }

  onDistanceUnitChange(value,label) {
    this.props.dataSave({type: "profile", data: {distance_unit: value}});
  }

  onGoalNotificationChange(value) {
    this.props.dataSave({type: "profile", data: {goal_notification: value}});
  }

  onVotesNotificationChange(value) {
    this.props.dataSave({type: "profile", data: {votes_notification: value}});
  }

  onWalletNotificationChange(value) {
    this.props.dataSave({type: "profile", data: {wallet_notification: value}});
  }

  onAppleHealthNotificationChange(value) {
    this.props.dataSave({type: "profile", data: {apple_health: value}});
  }

  onGoogleFitNotificationChange(value) {
    this.props.dataSave({type: "profile", data: {google_fit: value}});
  }

  render() {
    const {
      headerStyle,
      textStyle
    } = styles;

    const {children} = this.props;

    const {
      appleHealthIsAvailable, 
      googleFitIsAvailable
    } = this.state;

    // Only call the save function every 300 ms so we don't save to the server every user action
    const saveAge = _.debounce((text) => this.saveAge(text), 300);
    const saveWeight = _.debounce((text) => this.saveWeight(text), 300);
    const saveHeight = _.debounce((text) => this.saveHeight(text), 300);

    const onGenderChange = _.debounce((value,label) => this.onGenderChange(value,label), 300);

    const onWeightUnitChange = _.debounce((value,label) => this.onWeightUnitChange(value,label), 300);
    const onHeightUnitChange = _.debounce((value,label) => this.onHeightUnitChange(value,label), 300);
    const onDistanceUnitChange = _.debounce((value,label) => this.onDistanceUnitChange(value,label), 300);

    const onGoalNotificationChange = _.debounce((value) => this.onGoalNotificationChange(value), 300);
    const onVotesNotificationChange = _.debounce((value) => this.onVotesNotificationChange(value), 300);
    const onWalletNotificationChange = _.debounce((value) => this.onWalletNotificationChange(value), 300);

    const onAppleHealthNotificationChange = _.debounce((value) => this.onAppleHealthNotificationChange(value), 300);
    const onGoogleFitNotificationChange = _.debounce((value) => this.onAppleHealthNotificationChange(value), 300);
    
    const profile_journey = (children.profile) ? children.profile.journey : "";
    const profile_age = (children.profile) ? children.profile.age : "";

    const profile_gender = (children.profile) ? children.profile.gender : "";
    const profile_height = (children.profile) ? children.profile.height : "";
    const profile_weight = (children.profile) ? children.profile.weight : "";

    const profile_height_unit = (children.profile) ? children.profile.height_unit : "";
    const profile_weight_unit = (children.profile) ? children.profile.weight_unit : "";
    const profile_distance_units = (children.profile) ? children.profile.distance_unit : "";

    const notifications_goals = (children.profile) ? children.profile.goal_notification : "";
    const notifications_votes = (children.profile) ? children.profile.votes_notification : "";
    const notifications_wallet = (children.profile) ? children.profile.wallet_notification : "";


    const notifications_applehealth = (children.profile) ? children.profile.apple_health : "";
    const notifications_googlefit = (children.profile) ? children.profile.notifications_google_fit : "";

    const needed_message = "Needed for the health score";

    const weight_unit = (profile_weight_unit !== "" && profile_weight_unit !== undefined) ? profile_weight_unit : "";
    const height_unit = (profile_height_unit !== "" && profile_height_unit !== undefined) ? profile_height_unit : "";
    return (
          <View style={{
            flex: 1,
            backgroundColor: primaryBackgroungColor
          }}>
          <ScrollView
          style={{
            flex: 1
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          >
          <View style={headerStyle}>
              <View style={{
                height: 60,
                width: 60
              }}/>
              <Text style={textStyle}> Settings </Text>   
              <IconButton onPress={this.onLogOutButtonPress.bind(this)}>
                <FontAwesome>{Icons.powerOff}</FontAwesome>
              </IconButton>                   
          </View>
          {this.renderHeader()}
          < SettingsSection
            title="Profile section"
          >
            < SettingsTextEntry
              label="Age"
              placeholder=""
              onChangeText= {saveAge}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value={(profile_age !== "" && profile_age !== undefined) ? `${profile_age}` : ""}
              unit="years old"
              missing={(profile_age !== "" && profile_age !== undefined) ? "" : needed_message}
            />
            < SettingsChoice
              label="Gender"
              onSelect= {onGenderChange}
              textStyle={{flex:4}}
              value = {(profile_gender !== "" && profile_gender !== undefined) ? profile_gender : ""}
              choices = {["I'd rather not say", "Male", "Female"]}
            />
            < SettingsTextEntry
              label="Weight"
              placeholder=""
              onChangeText= {saveWeight}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value={(profile_weight !== "" && profile_weight !== undefined) ? `${displayMeasurementFromMetric(profile_weight, weight_unit)}` : ""}
              unit={weight_unit}
              missing={(profile_weight !== "" && profile_weight !== undefined) ? "" : needed_message}
            />
            < SettingsTextEntry
              label="Height"
              placeholder=""
              onChangeText= {saveHeight}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value={(profile_height !== "" && profile_height !== undefined) ? `${displayMeasurementFromMetric(profile_height, height_unit)}` : ""}
              unit={height_unit}
              missing={(profile_height !== "" && profile_height !== undefined) ? "" : needed_message}
            />
          </SettingsSection>
          < SettingsSection
            title="Settings"
          >
            < SettingsChoice
              label="Height"
              onSelect= {onHeightUnitChange}
              textStyle={{flex:4}}
              value = {(profile_height_unit !== "" && profile_height_unit !== undefined) ? profile_height_unit : ""}
              choices = {["Inches", "Centimeters"]}
            />
            < SettingsChoice
            label="Weight"
            onSelect= {onWeightUnitChange}
            textStyle={{flex:4}}
            value = {(profile_weight_unit !== "" && profile_weight_unit !== undefined) ? profile_weight_unit : ""}
            choices = {["Lbs", "Kilograms"]}
            />
            < SettingsChoice
              label="Distance"
              onSelect= {onDistanceUnitChange}
              textStyle={{flex:4}}
              value = {(profile_distance_units !== "" && profile_distance_units !== undefined) ? profile_distance_units : ""}
              choices = {["Feet", "Meters"]}
            />
          </SettingsSection>
          < SettingsSection
            title="Notifications"
          >
            < SettingsSwitch
              label="Goals Notifications"
              onValueChange= {onGoalNotificationChange}
              value = {(notifications_goals !== "" && notifications_goals !== undefined) ? notifications_goals : false}
            />
            < SettingsSwitch
              label="Votes Notifications"
              onValueChange= {onVotesNotificationChange}
              value = {(notifications_votes !== "" && notifications_votes !== undefined) ? notifications_votes : false}
            />
            < SettingsSwitch
              label="Wallet Notifications"
              onValueChange= {onWalletNotificationChange}
              value = {(notifications_wallet !== "" && notifications_wallet !== undefined) ? notifications_wallet : false}
            />
          </SettingsSection>
          < SettingsSection
            title="Data Sources"
          >
          < SettingsSwitch
            label={(Platform.OS === 'ios') ? "Apple Health" : "Google Fit"}
            onValueChange= {(Platform.OS === 'ios') ? onAppleHealthNotificationChange : onGoogleFitNotificationChange}
            value = {(Platform.OS === 'ios') ? 
            ((notifications_applehealth !== "" && notifications_applehealth !== undefined) ? notifications_applehealth : false) :
            ((notifications_googlefit !== "" && notifications_googlefit !== undefined) ? notifications_googlefit : false)
          }
            disabled= {(Platform.OS === 'ios') ? appleHealthIsAvailable : googleFitIsAvailable}
          />

          <SettingsDataSource
            label= "Add data source"
            icon= "plus_blue"
            color= {primaryBlueColor}
            onPress={this.connectHumanAPI}
          />
          </SettingsSection>
          < SettingsSection
            title="Your Journey"
          >
            <SettingsJourney
              type= {profile_journey}
              color= {primaryGreenColor}
              onPress={() => {Actions.settingsjourney()}}
            />
          </SettingsSection>
        </ScrollView>
      </View>
    );
  }
}

const styles ={
  headerStyle: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height: scale(60),
    alignItems: 'center',
    alignContent: 'stretch'
  },
  textStyle: {
    flex: 4,
    textAlign: 'center',
    fontSize: 20,
    color: graphGreyColor,
    fontFamily: Fonts.regular
  }
}

const mapStateToProps = state => {
  const {user} = state.auth;
  const {children} = state.data;

  return {user, children}; 
};

export default connect(mapStateToProps, {
  logoutUser, 
  dataSave,
  dataFetch,
  humanAPIFetch
})(SettingsView);