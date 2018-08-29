import React, { Component } from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { scale } from "react-native-size-matters";
import Hyperlink from 'react-native-hyperlink';
import _ from 'lodash';
import Spinner from "react-native-spinkit";
import { 
  IconButton  
} from "./common";
import { 
  SignUpButton,
  ModalDialog,
} from './custom'; 
import { 
  nameChanged,
  emailChanged, 
  passwordChanged, 
  loginUser, 
  loginGoogleUser, 
  loginFacebookUser,
  loginClearError
} from "../actions";
import { theme, graphGreyColor, primaryBlueColor, primaryGreyColor, modalMessages} from './themes';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebase from "react-native-firebase";
import { TextField } from 'react-native-material-textfield';
import {Fonts} from '../resources/fonts/Fonts';
import {primaryWhiteColor} from './themes/theme';
import { 
  checkEmail
} from '../business';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');

    this.state = { 
      signUpModalVisible: false,
      dialogState: modalMessages.noEmail,
      signInEnabled: false,
      secureTextEntry: true,
      errors: {}
    };
  }

  // Text Input handlers
  updateRef(name, ref) {
    this[name] = ref;
  }

  onMailChangeText(text) {
    this.props.emailChanged(text);
    this.onChangeText(text);
  }

  onPasswordChangeText(text) {
    this.props.passwordChanged(text);
    this.onChangeText(text);
  }

  onChangeText(text) {
    ['email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onFocus() {
    let { errors = {} } = this.state;
    this.props.loginClearError();

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  renderPasswordAccessory() {
    const { secureTextEntry } = this.state;

    return (
      <TouchableOpacity 
        onPress={() => {this.setState({ secureTextEntry: !this.state.secureTextEntry })}} 
      > 
        <FontAwesome 
          style={{
              color: primaryBlueColor,
              fontSize: 24,
              width: 44,
              textAlign: 'right'
          }}
        >
          {(secureTextEntry) ? Icons.eye : Icons.eyeSlash}
        </FontAwesome>
      </TouchableOpacity>
    );
  }

  // Button press handlers

  onSignInButtonPress() {
    const { email, password } = this.props;

    let errors = {};

      ['email', 'password']
      .forEach((name) => {
        let value = this[name].value();
  
        if (!value) {
          errors[name] = 'Should not be empty';
        } else {
          if ('email' === name && !checkEmail(value)) {
            errors[name] = 'The email format is wrong';
          }
        }
      });
  
      this.setState({ errors });
      if (_.isEmpty(errors)) {
        this.props.loginUser({ email, password });
      }
  }

  //////////////////////
  dismissModal() {
    this.setState({signUpModalVisible: !this.state.signUpModalVisible});
  }

  createAccount() {

  }

  

  renderError() {
    const { error } = this.props;
    const { errorTextStyle } = styles;

    if (error) {
      return (
        <View style={{ justifyContent: 'center', backgroundColor: "red"}}>
          <Text style={errorTextStyle}> {error} </Text>
        </View>
      );
    }
  }
  renderButton() {
    const { loading } = this.props;
    const {primaryWhiteTextStyle, startSpinnerStyle} = theme;

    if (loading) {
      return (
        <View style={{
          justifyContent: "space-around",
          alignItems: 'center',
          flexDirection: "column",
          flex: 1
        }}>
          <Spinner 
            isVisible={true}
            size={scale(60)}
            type='ThreeBounce' 
            color={primaryBlueColor}
          />
        </View>
        );
    }
    return (
      <SignUpButton
        onPress={this.onSignInButtonPress.bind(this)}
      >
        <Text style={[primaryWhiteTextStyle, {fontSize: 14}]}>LOGIN</Text>
      </SignUpButton>
    );
  }
  render() {
    const { 
      pageStyle,
      logoStyle,
      socialContainer, 
      buttonContainerstyle,
      separatorStyle, 
      buttonTextStyle,
      loginCardStyle, 
      buttonContainerStyle,
      submitButtonStyle,
      titleTextStyle,
      headerStyle,
      textStyle
    } = styles;
    const { 
      iconStyle,
      iconTextStyle,
      inputStyle,
      inputTitleStyle, 
      primaryWhiteTextStyle, 
      primaryGreyTextStyle 
    } = theme;

    const { name, email, password, children } = this.props;

    const { errors , secureTextEntry } = this.state;

    firebase.analytics().setCurrentScreen('Login Screen', 'RegisterForm')

    if (this.state.loggedIn) {
      (children.profile && children.profile.journey) ? Actions.main(): Actions.journey();
      return (<View />);
    }
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: primaryWhiteColor }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={pageStyle}
        scrollEnabled={true}
      >
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={logoStyle}>
          <View style={headerStyle}>
            <IconButton onPress={() => {Actions.pop()}}>
              <FontAwesome>{Icons.angleLeft}</FontAwesome>
            </IconButton> 
            <View style={{
              height: 60,
              width: 60
            }}/>                   
          </View>
        </View>
        <View style={{
          flex: 3, 
          marginRight: scale(40)
          }}>
          <Text style={titleTextStyle}>
            Health
          </Text>
          <Text style={titleTextStyle}>
            is a journey 
          </Text>
        </View>
        <View style={loginCardStyle}>
             <TextField
              ref={this.emailRef}
              label='Email address'
              value={email}
              onChangeText={this.onMailChangeText.bind(this)}
              keyboardType="email-address"          
              autoCorrect={false}
              autoCapitalize='none'
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus.bind(this)}
              onSubmitEditing={this.onSubmitEmail.bind(this)}
              returnKeyType='next'
              error={errors.email}
              textColor={graphGreyColor}
              baseColor={graphGreyColor}
              tintColor={primaryGreyColor}
              labelTextStyle={inputStyle}
              titleTextStyle={inputTitleStyle}
            />
            <TextField
              label='Password'
              ref={this.passwordRef}
              secureTextEntry={secureTextEntry}
              value={password}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus.bind(this)}
              onChangeText={this.onPasswordChangeText.bind(this)}
              onSubmitEditing={this.onSubmitPassword.bind(this)}
              returnKeyType='done'
              error={errors.password}
              title='Between 8 and 20 characters'
              titleFontSize={8}
              maxLength={20}
              characterRestriction={20}
              renderAccessory={this.renderPasswordAccessory.bind(this)}
              textColor={graphGreyColor}
              baseColor={graphGreyColor}
              tintColor={primaryGreyColor}
              labelTextStyle={inputStyle}
              titleTextStyle={inputTitleStyle}
              titleFontSize={14}
            />
          </View>
          <View style={submitButtonStyle}>
            {this.renderButton()}
          </View>
          <View style={separatorStyle}>
          <Hyperlink
            linkStyle={ { color: primaryBlueColor } }
            onPress={ (url, text) => Actions.password()}
            linkText={ url => url === 'http://citizenhealth.io' ? 'password?' : url }
          >
            <Text style= {[primaryGreyTextStyle, {color: primaryGreyColor}]}>Forgot your http://citizenhealth.io</Text>
          </Hyperlink>

          </View>      
          <View style={socialContainer}>
          </View>
          {this.renderError()}   
        <ModalDialog
          visible={this.state.signUpModalVisible}
          label={this.state.dialogState.message}
          cancelLabel={this.state.dialogState.cancel}
          acceptLabel={this.state.dialogState.accept}
          onCancelPress={this.dismissModal.bind(this)}
          onAcceptPress={this.dismissModal.bind(this)}
        >
        </ModalDialog>
        </SafeAreaView> 
      </KeyboardAwareScrollView>  
    );
  }
}

const styles = {
  keyboardPageStyle: {
    flex: 1
  },
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
    marginBottom: scale(20)
  },
  logoStyle: {
    flex: 3,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  logoTextStyle: {
    flex: 1,
//    backgroundColor: "blue",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  loginCardStyle: {
    height: 170,
//    backgroundColor: "red",
    justifyContent: "space-around",
    paddingLeft: scale(40),
    paddingRight: scale(40) ,
//    backgroundColor: 'blue', 
    paddingBottom: 20,
  },
  submitButtonStyle: {
    justifyContent: 'center',
    height: 80,
    paddingLeft: scale(40),
    paddingRight: scale(40)
  },
  separatorStyle: {
    alignItems: 'center',
    justifyContent: "center",
//    backgroundColor: "green"
  },
  socialContainer: {
    flexDirection: "row",
    height: 100,
    paddingLeft: scale(40),
    paddingRight: scale(40),
    justifyContent: "center",
    alignItems: 'center'
  },
  titleTextStyle: {
    textAlign: "right",
    fontSize: 30,
    color: primaryGreyColor,
    fontWeight: "800",
    fontFamily: Fonts.regular
  },
  errorTextStyle: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "800",
    flexWrap: 'wrap',
    fontFamily: Fonts.regular
  },
  buttonContainerstyle: {
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Fonts.regular
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height: scale(60),
    alignItems: 'center',
    alignContent: 'stretch'
  },
};

const mapStateToProps = state => {
  const { name, email, password, loading, error } = state.auth;
  const { children } = state.data;
  return { name, email, password, loading, error, children };
};

export default connect(mapStateToProps, {
  nameChanged,
  emailChanged,
  passwordChanged,
  loginUser,
  loginGoogleUser,
  loginFacebookUser,
  loginClearError
})(LoginForm);
