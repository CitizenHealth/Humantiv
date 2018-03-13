import React, { Component } from "react";
import { View, Text, Linking, TextField, MDButton } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { scale } from "react-native-size-matters";
import Hyperlink from 'react-native-hyperlink';
import { 
  Card, 
  CardSection, 
  RoundButton, 
  HeaderImage, 
  Spinner  
} from "./common";
import { 
  SignInButton,
  FacebookLoginButton, 
  GoogleLoginButton, 
  SignUpButton,
  IconInput,
  IconPasswordInput,
  ModalDialog,
  PasswordInputStrengthIndicator
} from './custom'; 
import { emailChanged, passwordChanged, loginUser, loginGoogleUser, loginFacebookUser } from "../actions";
import Images from "../resources/images";
import { theme, primaryBlueColor, primaryGreyColor, modalMessages} from './themes';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class LoginForm extends Component {
  state = { 
    signUpModalVisible: false,
    dialogState: modalMessages.noEmail,
    signInEnabled: false
   };

  dismissModal() {
    this.setState({signUpModalVisible: !this.state.signUpModalVisible});
  }

  createAccount() {

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
    const { primaryWhiteTextStyle } = theme;

    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <SignUpButton
        onPress={this.onSignInButtonPress.bind(this)}>
          <Text style={primaryWhiteTextStyle}> Sign In </Text>
      </SignUpButton>
    );
  }
  render() {
    const { footerStyles, pageStyle,
            logoStyle,
            socialContainer, loginPageStyle,
            separatorStyle, logoTextStyle,
            loginCardStyle, buttonContainerStyle
           } = styles;
    const { primaryWhiteTextStyle, primaryGreyTextStyle } = theme;

    const { email, password } = this.props;

    if (this.state.loggedIn) {
      Actions.main();
      return (<View />);
    }
    return (
      <View style={pageStyle}>
        <View style={logoStyle}>
          <HeaderImage
            source={Images.img_login_header}
          />
        </View>
        <View style={loginCardStyle}>
          <CardSection>
            <IconInput
              icon={Icons.envelopeO}
              placeholder="Email address"
              value={email}
              onChangeText={this.onMailChangeText.bind(this)}
              keyboardType="email-address"
              returnKeyType={ "next" }
            />
          </CardSection>
          <CardSection style={{borderColor: 'transparent'}}>
            <PasswordInputStrengthIndicator
              icon={Icons.lock}
              placeholder="Password"
              value={password}
              onChangeText={this.onPasswordChangeText.bind(this)}
            />
          </CardSection>
          </View>
          <View style={socialContainer}>
          {this.renderError()}
          {this.renderButton()}
          <View style={separatorStyle}>
            <Text style={[primaryGreyTextStyle, {color: primaryGreyColor}]} >- or -</Text>
          </View>
          <FacebookLoginButton
              onPress={this.onFacebookSignInButtonPress.bind(this)}
            >
              <FontAwesome 
                style={{color: 'white'}}
              >
                {Icons.facebook}
                <Text style={primaryWhiteTextStyle}>  Connect with Facebook</Text>
              </FontAwesome>
            </FacebookLoginButton>
            <GoogleLoginButton
              onPress={this.onGoogleSignInButtonPress.bind(this)}
            >
              <FontAwesome 
                style={{color: 'white'}}
              >
                {Icons.googlePlus}
                <Text style={primaryWhiteTextStyle}>  Connect with Google</Text>
              </FontAwesome>
            </GoogleLoginButton>
          </View>
      <View backgroundColor={footerStyles}>
          <Hyperlink
            linkStyle={ { color: primaryBlueColor } }
            onPress={ (url, text) => Actions.password()}
            linkText={ url => url === 'http://citizenhealth.io' ? 'password?' : url }
          >
            <Text style= {[primaryGreyTextStyle, {color: primaryGreyColor}]}>Forgot your http://citizenhealth.io</Text>
          </Hyperlink>
        </View>
        <ModalDialog
          visible={this.state.signUpModalVisible}
          label={this.state.dialogState.message}
          cancelLabel={this.state.dialogState.cancel}
          acceptLabel={this.state.dialogState.accept}
          onCancelPress={this.dismissModal.bind(this)}
          onAcceptPress={this.dismissModal.bind(this)}
        >
        </ModalDialog>
      </View>
              
        
    );
  }
}

const styles = {
  pageStyle: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1
  },
  loginPageStyle: {
    alignItems: 'space-around',
    justifyContent: "space-around",
    alignItems: "stretch",
//    backgroundColor: "yellow",
    flex: 4
  },
  footerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80,
    paddingBottom: 20
  },
  logoStyle: {
    flex: 3,

 //   backgroundColor: "yellow",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  logoTextStyle: {
    flex: 1,
//    backgroundColor: "blue",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  loginCardStyle: {
//    backgroundColor: "red",
    justifyContent: "space-around",
    paddingLeft: scale(20),
    paddingRight: scale(20)  
  },
  separatorStyle: {
    height: 40,
    alignItems: 'center',
    justifyContent: "center",
//    backgroundColor: "green"
  },
  buttonContainerStyle: {
    alignItems: 'stretch',
    justifyContent: "space-around",

  },
  socialContainer: {
    flexDirection: "column",
    height: 100,
    paddingLeft: scale(20),
    paddingRight: scale(20),
    justifyContent: "center",
    flex: 3
  },
  errorTextStyle: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "800"
  },
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
