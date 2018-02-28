import React, { Component } from 'react';
import { ScrollView, View, Text, Platform, StyleSheet, WebView } from 'react-native';
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { 
  dataCreate, 
  dataSave,
  dataFetch
} from "../actions";
import { Avatar, IconButton } from "./common";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Images from "../resources/images";
import { Actions } from "react-native-router-flux";

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const publicToken = null; //Set to publicToken value if previously retrieved or 'null' for new users
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HomeView extends Component {

 state = {
    url: "",
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
  };

  componentWillMount () {
    const {email} = this.props;

    if (!email) {
      console.log('Remote logging - ser email is null');
    }
    const clientUserId = email;

    const connectURL = baseURL + 'client_id=' + clientID + '&client_user_id=' + clientUserId + 
    '&finish_url=' + finishURL + '&close_url='+ closeURL + (publicToken != null ? "&public_token="+ 
    publicToken : '');

    this.setState({url: connectURL});
    this.props.dataFetch({type: "profile"});
    this.props.dataFetch({type: "health"});
    this.props.dataFetch({type: "wallet"});
  }

  onSettingsPress() {
    Actions.profile();
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
        <WebView
            ref={'webview'}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            source={{uri: this.state.url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onNavigationStateChange={this.onNavigationStateChange}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
          />
        </View>
    );
  }
}
{/* <View style={pageStyle}>
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
    </View>
    <View style={scoreSectionStyle}>
    </View>
  </View>
</ScrollView>
</View> */}

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
  dataCreate, 
  dataSave,
  dataFetch
})(HomeView);
