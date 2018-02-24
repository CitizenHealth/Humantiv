import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, StyleSheet } from 'react-native';
import { Button, CardSection, Card, Avatar, IconButton } from "./common";
import { TextInput } from "./custom"
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { 
  logoutUser,  
  dataCreate, 
  dataSave,
  dataFetch
} from "../actions";
import FontAwesome, { Icons } from 'react-native-fontawesome';
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
      <IconButton>
        <FontAwesome>{Icons.userCircle}</FontAwesome>
      </IconButton>
    );
  }
  
  render() {
    const { user, children } = this.props;
    const {
      pageStyle,
      cardsSectionStyle,
      scoreSectionStyle,
      headerStyle,
      containerStyle,
      textStyle
    } = styles;
    console.log(`Children: ${children}`);
    return (
      <View style={pageStyle}>
      <View style={headerStyle}>
        {this.renderProfileImage()}
        <Text style={textStyle}> Citizen Health </Text>
        <IconButton onPress={this.onSettingsPress.bind(this)}>
          <FontAwesome>{Icons.sliders}</FontAwesome>
        </IconButton>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'blue'}}>  
        <View style={containerStyle}>      
          <View style={cardsSectionStyle}>
            <Text> Hi </Text>
          </View>
          <View style={scoreSectionStyle}>
          </View>
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
  headerStyle: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height: scale(60),
    alignItems: 'center',
    alignContent: 'stretch'
  },
  containerStyle: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: "orange",
  },
  cardsSectionStyle: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: "orange",
  },
  scoreSectionStyle: {
    flex: 3,
    backgroundColor: "yellow",
    justifyContent: 'flex-start',
  },
  textStyle: {
    flex: 4,
    textAlign: 'center',
    fontSize: 0,
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
})(HomeView);
