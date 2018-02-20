import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, StyleSheet } from 'react-native';
import { Button, Input, CardSection, Card, Avatar, ImageButton } from "./common";
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { 
  logoutUser,  
  dataCreate, 
  dataSave,
  dataFetch
} from "../actions";
import Images from "../resources/images";
import { Actions } from "react-native-router-flux";

class HomeView extends Component {

  componentWillMount () {
    this.props.dataFetch({type: "profile"});
    this.props.dataFetch({type: "health"});
    this.props.dataFetch({type: "wallet"});
  }

  onSettingsPress() {
    Actions.profile();
  }

  onSaveButtonPress() {
    const {children} = this.props;

    this.props.dataSave({type: "profile", data: children.profile});
    this.props.dataSave({type: "health", data: children.health});
    this.props.dataSave({type: "wallet", data: children.wallet});
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
          {this.renderProfileImage()}
          <Text style={textStyle}> Citizen Health </Text>
          <ImageButton
            source={Images.img_settings_disabled}
            style={{height: 44, width: 44}}
            onPress={this.onSettingsPress.bind(this)}
          />
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
                returnKeyType={ "next" }
                editable={false}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@provider.com"
                value={(user) ? user.email : ""}
                keyboardType="email-address"
                returnKeyType={ "next" }
                editable={false}
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
    backgroundColor: "#FFF",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1
  },
  containerStyles: {
    flexDirection: 'row',
    justifyContent: "center",
    height: scale(60),
  //  backgroundColor: "orange",
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
    color: "#4e505c",
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
})(HomeView);
