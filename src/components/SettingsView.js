import React, { Component } from 'react';
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
  SettingsSection
 } from "./common";
 import { 
  primaryBackgroungColor,
  graphGreyColor
} from './themes';
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { Actions } from 'react-native-router-flux';
import { TextInput } from "./custom"
import { 
  logoutUser,  
  dataCreate, 
  dataSave,
  dataFetch
} from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class SettingsView extends Component {

  componentWillMount () {
    this.props.dataFetch({type: "profile"});
    this.props.dataFetch({type: "health"});
  }

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  onSaveButtonPress() {
    const {children} = this.props;

    this.props.dataSave({type: "profile", data: children.profile});
    this.props.dataSave({type: "health", data: children.health});
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
    }
    return (
      < SettingsHeader
            name={user.displayName}
            email={user.email}
      />
    );
  }

  render() {
    const {
      headerStyle,
      textStyle
    } = styles;

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
              <Text style={textStyle}> Settings </Text>               
          </View>
          {this.renderHeader()}
          < SettingsSection
            title="Profile section"
          >
            < SettingsTextEntry
              label="Age"
              placeholder=""
              onChangeText= {(text) => {console.log("text")}}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value="26"
              unit="years old"
            />
            < SettingsChoice
            label="Gender"
            onSelect= {
              (value, label) => {console.log(value, label)}
            }
            value = "Male"
            choices = {["Male","Female","I'd rather not say"]}
          />
            < SettingsTextEntry
              label="Weight"
              placeholder=""
              onChangeText= {(text) => {console.log("text")}}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value="83"
              unit="kg"
            />
            < SettingsTextEntry
              label="Height"
              placeholder=""
              onChangeText= {(text) => {console.log("text")}}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              keyboardType="numeric"
              autoFocus={false}
              value="186"
              unit="cm"
            />
          </SettingsSection>
          < SettingsSection
            title="Settings"
          >
            < SettingsChoice
              label="Height"
              onSelect= {
                (value, label) => {console.log(value, label)}
              }
              value = "Centimeters"
              choices = {["Centimeters","Inches"]}
            />
            < SettingsChoice
            label="Weight"
            onSelect= {
              (value, label) => {console.log(value, label)}
            }
            value = "Kilograms"
            choices = {["Kilograms","Lbs"]}
            />
            < SettingsChoice
              label="Distance"
              onSelect= {
                (value, label) => {console.log(value, label)}
              }
              value = "Meters"
              choices = {["Meters","Feet"]}
            />
          </SettingsSection>
          < SettingsSection
            title="Notifications"
          >
            < SettingsSwitch
              label="Goals Notifications"
              onValueChange= {
                (value) => {console.log(value)}
              }
              value = {true}
            />
            < SettingsSwitch
              label="Votes Notifications"
              onValueChange= {
                (value) => {console.log(value)}
              }
              value = {false}
            />
            < SettingsSwitch
              label="Wallet Notifications"
              onValueChange= {
                (value) => {console.log(value)}
              }
              value = {true}
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

  return {user, children  }; 
};

export default connect(mapStateToProps, {
  logoutUser, 
  dataCreate, 
  dataSave,
  dataFetch
})(SettingsView);