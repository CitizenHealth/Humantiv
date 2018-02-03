import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Input, CardSection, Card, Avatar } from "./common";
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { logoutUser } from "../actions";
import Images from "../resources/images";

class ProfileView extends Component {

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  onNameChangeText(text) {
    // this.props.emailChanged(text);
  }

  onMailChangeText(text) {
    //
  }

  onPhoneChangeText(text) {
    //
  }

  renderProfileImage() {
    const { user } = this.props;
    const { avatarStyle } = this.props;
    if (user && user.photoURL) {
      return (
        <Avatar style={avatarStyle}
          imageURL= {user.photoURL}
        />
      );
    }
    return (
      <Avatar style={avatarStyle}
      source= {Images.img_user_profile}
      />
    );
  }
  
  render() {
    const { user } = this.props;
    const {
      pageStyle,
      containerStyles,
      avatarStyle,
      textStyle,
      loginCardStyle,
      buttonContainerStyle
    } = styles;

    return (
      <View style={pageStyle}>
        <View style={containerStyles}>
          {this.renderProfileImage()}
          <Text style={textStyle}> Citizen Health </Text>
          <Avatar style={avatarStyle}
            imageURL= ""
          />
        </View>
        <View style={loginCardStyle}>
          <Card style={{ flex: 1}}>
            <CardSection>
              <Input 
                label = "Name"
                placeholder="Name"
                value={(user) ? user.displayName : ""}
                onChangeText={this.onNameChangeText.bind(this)}
                returnKeyType={ "next" }
              />
            </CardSection>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@provider.com"
                value={(user) ? user.email : ""}
                onChangeText={this.onMailChangeText.bind(this)}
                keyboardType="email-address"
                returnKeyType={ "next" }
              />
            </CardSection>
            <CardSection>
              <Input
                label="Phone"
                placeholder="555-555-5555"
                value={(user) ? user.phoneNumber : ""}
                onChangeText={this.onPhoneChangeText.bind(this)}
                keyboardType="phone-pad"
                returnKeyType={ "next" }
              />
            </CardSection>
            <CardSection style ={buttonContainerStyle}>
              <Button 
                style={{ width: "200" }}
                onPress={this.onLogOutButtonPress.bind(this)}
              >
                Sign Out
              </Button>
            </CardSection>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = {
  pageStyle: {
//    backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1
  },
  containerStyles: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: "center",
    height: scale(80),
//    backgroundColor: "orange",
    alignItems: 'center',
    alignContent: 'stretch'
  },
  avatarStyle: {
    flex: 1,
    //backgroundColor: "yellow",
    justifyContent: 'flex-start',
  },
  loginCardStyle: {
    justifyContent: "flex-start",
//    backgroundColor: "yellow",
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainerStyle: {
    alignItems: 'center',
    justifyContent: "space-around"
  },
  textStyle: {
    flex: 4,
    textAlign: 'center',
    fontSize: 20,
    color: "#808080",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  }
};

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user}; 
};

export default connect(mapStateToProps, {logoutUser})(ProfileView);
