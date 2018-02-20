import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, StyleSheet } from 'react-native';
import { Button, Input, LeftButton, CardSection, Card, Avatar } from "./common";
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { Actions } from 'react-native-router-flux';
import { 
  logoutUser,  
  dataCreate, 
  dataSave,
  dataFetch
} from "../actions";
import Images from "../resources/images";

class ProfileView extends Component {

  componentWillMount () {
    this.props.dataFetch({type: "profile"});
    this.props.dataFetch({type: "health"});
    this.props.dataFetch({type: "wallet"});
  }

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  onSaveButtonPress() {
    const {children} = this.props;

    this.props.dataSave({type: "profile", data: children.profile});
    this.props.dataSave({type: "health", data: children.health});
    this.props.dataSave({type: "wallet", data: children.wallet});
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
    const { user, children } = this.props;
    const {
      pageStyle,
      containerStyles,
      textStyle,
      loginCardStyle,
      buttonContainerStyle
    } = styles;
    console.log(`Children: ${children}`);
    return (
      <View style={pageStyle}>
      <ScrollView >
        <View style={containerStyles}>          
          <LeftButton onPress={() => Actions.pop()}/>
          {this.renderProfileImage()}
          <Button
            onPress={this.onLogOutButtonPress.bind(this)}
          >
            Sign Out
          </Button>
        </View>
        <View style={loginCardStyle}>
          <Card 
            title = "Profile"
          >
            <CardSection>
              <Input 
                label = "Name"
                placeholder="Name"
                value={(user) ? user.displayName : ""}
                onChangeText={this.onNameChangeText.bind(this)}
                returnKeyType={ "next" }
                editable={false}
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
                editable={false}
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
                editable={false}
              />
            </CardSection>
            <CardSection>
              <Input 
                  label = "Country"
                  placeholder="USA"
                  value={(children.profile) ? children.profile.country : ""}
                  onChangeText={value => {
                   this.props.dataCreate({"type": "profile", "prop": "country", "value": value});
                  }}
                  returnKeyType={ "next" }
                />
            </CardSection>
            <CardSection>
              <Input 
                  label = "State"
                  placeholder=""
                  value={(children.profile) ? children.profile.state : ""}
                  onChangeText={value => {
                    this.props.dataCreate({"type": "profile", "prop": "state", "value": value});
                   }}
                   returnKeyType={ "next" }
                />
            </CardSection>
            <CardSection>
              <Input 
                  label = "City"
                  placeholder=""
                  value={(children.profile) ? children.profile.city : ""}
                  onChangeText={value => {
                    this.props.dataCreate({"type": "profile", "prop": "city", "value": value});
                   }}
                  returnKeyType={ "next" }
                />
            </CardSection>
          </Card>
          <Card 
            title = "Health"
          >
            <CardSection>
              <Input 
                label = "Score"
                placeholder="Between 0 and 100"
                value={(children.health) ? children.health.score : ""}
                onChangeText={value => {
                  this.props.dataCreate({"type": "health", "prop": "score", "value": value});
                }}
                keyboardType="numeric"
                returnKeyType={ "next" }
              />
            </CardSection>
            <CardSection>
              <Input
                label="Height"
                placeholder="In centimeters"
                value={(children.health) ? children.health.height : ""}
                onChangeText={value => {
                  this.props.dataCreate({"type": "health", "prop": "height", "value": value});
                }}
                keyboardType="numeric"
                returnKeyType={ "next" }
              />
            </CardSection>
            <CardSection>
              <Input
                label="Weight"
                placeholder="In kilograms"
                value={(children.health) ? children.health.weight : ""}
                onChangeText={value => {
                  this.props.dataCreate({"type": "health", "prop": "weight", "value": value});
                }}
               keyboardType="numeric"
                returnKeyType={ "next" }
              />
            </CardSection>
          </Card>
          <Card 
            title = "Wallet"
          >
            <CardSection>
              <Input 
                label = "Medits"
                placeholder="Ammount of medits"
                value={(children.wallet) ? children.wallet.medits : ""}
                editable={false}
              />
            </CardSection>
            <CardSection>
              <Input 
                label = "MDX"
                placeholder="MDX"
                value={(children.wallet) ? children.wallet.mdx : ""}
                editable={false}
              />
            </CardSection>
          </Card>
          <Card>
            <CardSection style ={buttonContainerStyle}>
              <Button 
                style = {{ }}
                onPress={this.onSaveButtonPress.bind(this)}
              >
                Save
              </Button>
            </CardSection>
          </Card>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
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
    alignItems: 'stretch',
    justifyContent: "center",
//    backgroundColor: "yellow"
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
});

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
})(ProfileView);
