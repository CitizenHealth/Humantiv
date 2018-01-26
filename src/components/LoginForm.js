import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "firebase";
import { scale } from "react-native-size-matters";
import { Card, CardSection, Input, Button, HeaderImage, Spinner } from "./common";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import Images from "../resources/images";

class LoginForm extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({loggedIn: true});
        Actions.main();
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

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

  renderError() {
    const { error } = this.props;
    const { errorTextStyle } = styles;

    if (error) {
      return (
        <View style={{ backgroundColor: "white" }}>
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
            separatorStyles, imageStyle } = styles;

    const { email, password } = this.props;

    return (
      <View style={pageStyle}>
        <View style={logoStyles}>
          <HeaderImage
            style={imageStyle}
            source={Images.img_login_header}
          />
        </View>
        <View style={containerStyles}>
          <Text style={textStyles}> Your true Health Score </Text>
        </View>
        <View style={loginPageStyle}>
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
            <Text style={[textStyles, {color: "#E9222E"}, {height: 40 }]} >- or -</Text>
          </View>
          <View style={socialContainer}>
            <Button backgroundC="#E9222E">
              google
            </Button>
            <Button backgroundC="blue">
              facebook
            </Button>
          </View>
        </View>
        <View backgroundColor={footerStyles}>
          <Text style={textStyles}>Facing problems with registration or login?</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  pageStyle: {
    justifyContent: "space-between",
//    backgroundColor: "blue",
    flexDirection: "column",
    flex: 1
  },
  loginPageStyle: {
    height: 100,
    justifyContent: "space-around",
//    backgroundColor: "yellow",
    flexGrow: 1
  },
  imageStyle: {
    height: scale(20),
  },
  logoStyles: {
    flexGrow: 1,
//    backgroundColor: "orange",
    paddingLeft: 20,
    paddingRight: 20
  },
  separatorStyles: {
    flex: 0.5,
    height: 10,
    justifyContent: "center",
//    backgroundColor: "green",
    alignItems: "center"
  },
  socialContainer: {
    flexGrow: 1,
    flexDirection: "row",
    height: 40,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "space-between",
    padding: 40,
  },
  footerStyles: {
    flexGrow: 0,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  containerStyles: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
  },
  textStyles: {
    flexGrow: 1,
    fontSize: 18,
    paddingLeft: 20,
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

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
