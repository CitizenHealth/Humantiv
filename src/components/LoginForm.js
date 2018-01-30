import React, { Component } from "react";
import { View, Text, Platform, Linking } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { scale } from "react-native-size-matters";
import Hyperlink from 'react-native-hyperlink';
import { Card, CardSection, Input, Button, RoundButton, HeaderImage, Spinner } from "./common";
import { emailChanged, passwordChanged, loginUser, loginGoogleUser, loginFacebookUser } from "../actions";
import Images from "../resources/images";

class LoginForm extends Component {
  state = { signUpModalVisible: false };

  onMailChangeText(text) {
    this.props.emailChanged(text);
  }

  onPasswordChangeText(text) {
    this.props.passwordChanged(text);
  }

  onSignInButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onGoogleSignInButtonPress() {
    this.props.loginGoogleUser();
  }

  onFacebookSignInButtonPress() {
    this.props.loginFacebookUser();
  }

  renderError() {
    const { error } = this.props;
    const { errorTextStyle } = styles;

    if (error) {
      return (
        <View style={{ justifyContent: 'center', backgroundColor: "red",height: 30 }}>
          <Text style={errorTextStyle}> {error} </Text>
        </View>
      );
    }
  }
  renderButton() {
    const { loading } = this.props;

    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onSignInButtonPress.bind(this)}>
        Sign In
      </Button>
    );
  }
  render() {
    const { footerStyles, pageStyle,
            logoStyles, textStyles, containerStyles,
            socialContainer, loginPageStyle,
            separatorStyles, logoTextStyles,
            loginCardStyle } = styles;

    const { email, password } = this.props;

    if (this.state.loggedIn) {
      Actions.main();
      return (<View />);
    }
    return (
      <View style={pageStyle}>
        <View style={containerStyles}>
          <View style={logoStyles}>
            <HeaderImage
              source={Images.img_login_header}
            />
          </View>
          <View style={logoTextStyles}>
            <Text style={textStyles}> Your true Health Score </Text>
          </View>
        </View>
        <View style={loginPageStyle}>
          <View style={loginCardStyle}>
            <Card>
              <CardSection>
                <Input
                  label="Email"
                  placeholder="email@provider.com"
                  value={email}
                  onChangeText={this.onMailChangeText.bind(this)}
                  keyboardType="email-address"
                  returnKeyType={ "next" }
                />
              </CardSection>
              <CardSection>
                <Input
                  secureTextEntry
                  label="Password"
                  placeholder="password"
                  value={password}
                  enablesReturnKeyAutomatically
                  returnKeyType={ "done" }
                  onChangeText={this.onPasswordChangeText.bind(this)}
                />
              </CardSection>
                {this.renderError()}
              <CardSection>
                {this.renderButton()}
              </CardSection>
            </Card>
            <View style={separatorStyles}>
              <Text style={[textStyles, {color: "#E9222E"}]} >- or -</Text>
            </View>
            <View style={socialContainer}>
              <RoundButton
                style={{ flex: 1}}
                source={Images.img_login_google}
                onPress={this.onGoogleSignInButtonPress.bind(this)}
              >
              </RoundButton>
              <RoundButton
                source={Images.img_login_facebook}
                onPress={this.onFacebookSignInButtonPress.bind(this)}
              >
              </RoundButton>
            </View>
          </View>
        </View>
        <View backgroundColor={footerStyles}>
          <Hyperlink
            linkStyle={ { color: '#E9222E' } }
            onPress={ (url, text) => Linking.openURL(url)}
            linkText={ url => url === 'http://citizenhealth.io' ? 'registration or login?' : url }
          >
            <Text style={textStyles}>Facing problems with http://citizenhealth.io</Text>
          </Hyperlink>
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
    justifyContent: "space-between",
    flex: 2,
    flexDirection: "column",
//    backgroundColor: "orange"
  },
  loginPageStyle: {
    justifyContent: "flex-start",
//    backgroundColor: "yellow",
    flex: 3
  },
  footerStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80,
    paddingBottom: 20
  },
  logoStyles: {
    flex: 2,

//    backgroundColor: "yellow",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  logoTextStyles: {
    flex: 1,
//    backgroundColor: "blue",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  loginCardStyle: {
//    backgroundColor: "red",
    justifyContent: "flex-start"
  },
  separatorStyles: {
    height: 40,
    justifyContent: "center",
//    backgroundColor: "green"
  },
  socialContainer: {
    flexDirection: "row",
    height: 100,
    paddingLeft: scale(80),
    paddingRight: scale(80),
    justifyContent: "center"
  },
  errorTextStyle: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "800"
  },
  textStyles: {
    flexGrow: 1,
    fontSize: 18,
    color: "#808080",
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "Arial", },
      android: { fontFamily: "Roboto" }
    })
  }
};

const mapStateToProps = state => {
  const { email, password, loading, error } = state.auth;
  return { email, password, loading, error };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  loginGoogleUser,
  loginFacebookUser
})(LoginForm);
