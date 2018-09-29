import React, { Component } from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  UIManager,
  LayoutAnimation,
  Animated,
  Easing,
  Dimensions
 } from "react-native";
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { scale } from "react-native-size-matters";
import Hyperlink from 'react-native-hyperlink';
import Spinner from "react-native-spinkit";
import { 
  Card, 
  CardSection, 
  RoundButton, 
  HeaderImage, 
  IconButton  
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
import { 
  nameChanged,
  emailChanged, 
  passwordChanged, 
  registerUser, 
  loginGoogleUser, 
  loginFacebookUser,
  loginClearError 
} from "../actions";
import Images from "../resources/images";
import { theme, graphGreyColor, primaryBlueColor, primaryGreyColor, modalMessages} from './themes';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebase from "react-native-firebase";
import { TextField } from 'react-native-material-textfield';
import {Fonts} from '../resources/fonts/Fonts';
import {
  primaryGreenColor, 
  graphGreenColor, 
  graphOrangeColor,
  secondaryGreenColor, 
  primaryBackgroungColor, 
  primaryWhiteColor
} from './themes/theme';
import { 
  checkEmail,
  checkPassword
} from '../business';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ANIMATION_DURATION = 500;

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.nameRef = this.updateRef.bind(this, 'name');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');

    // Animation values
    this.scalingFacebookValue = new Animated.Value(0); // declare animated value
    this.scalingGoogleValue = new Animated.Value(0); // declare animated value
    this.scalingEmailValue = new Animated.Value(0); // declare animated value

    const imagePositionValue = new Animated.Value(-SCREEN_WIDTH); // declare animated value

    const titlePositionValue = new Animated.Value(-SCREEN_WIDTH); // declare animated value
    const subTitlePositionValue = new Animated.Value(-SCREEN_WIDTH); // declare animated value

    const buttonOpacityValue = new Animated.Value(0); // declare animated value

    const facebookIconPositionValue = new Animated.Value(scale(-200)); // declare animated value
    const googleIconPositionValue = new Animated.Value(scale(-200)); // declare animated value
    const emailIconPositionValue = new Animated.Value(scale(-200)); // declare animated value

    this.state = { 
      signUpModalVisible: false,
      dialogState: modalMessages.noEmail,
      signInEnabled: false,
      secureTextEntry: true,
      titlePosition: titlePositionValue,
      subTitlePosition: subTitlePositionValue,
      facebookIconPosition: facebookIconPositionValue,
      googleIconPosition: googleIconPositionValue,
      emailIconPosition: emailIconPositionValue,
      imagePosition: imagePositionValue,
      buttonOpacity: buttonOpacityValue,
      errors: {},
    };
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.imagePosition, {
        toValue: 40,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        delay: 0
      }),
      Animated.timing(this.state.titlePosition, {
        toValue: 40,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        delay: 0
      }),
      Animated.timing(this.state.subTitlePosition, {
        toValue: 40,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        delay: 250
      }),
      Animated.timing(this.state.buttonOpacity, {
        toValue: 1,
        duration: 2*ANIMATION_DURATION,
        easing: Easing.linear,
        delay: 500
      }),
      Animated.timing(this.state.facebookIconPosition, {
        toValue: 0,
        duration: ANIMATION_DURATION/2,
        easing: Easing.linear,
        delay: 0
      }),
      Animated.timing(this.state.googleIconPosition, {
        toValue: 0,
        duration: ANIMATION_DURATION/2,
        easing: Easing.linear,
        delay: 500
      }),
      Animated.timing(this.state.emailIconPosition, {
        toValue: 0,
        duration: ANIMATION_DURATION/2,
        easing: Easing.linear,
        delay: 1000
      })
    ]).start();  
  }

  // Text Input handlers
  updateRef(name, ref) {
    this[name] = ref;
  }

  onNameChangeText(text) {
    this.props.nameChanged(text);
    this.onChangeText(text);
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
    ['name', 'email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitName() {
    this.email.focus();
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
    const { name, email, password } = this.props;

    let errors = {};

    ['name', 'email', 'password']
    .forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if ('email' === name && !checkEmail(value)) {
          errors[name] = 'The email format is wrong';
        }
        if ('password' === name) {
          let passwordCheck = checkPassword(value);
          if(!passwordCheck.valid) {
            errors[name] = passwordCheck.message;
          }
        }
      }
    });

    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.props.registerUser({ name, email, password });
    }
  }

  onGoogleSignInButtonPress() {
    this.props.loginGoogleUser();
  }

  onFacebookSignInButtonPress() {
    this.props.loginFacebookUser();
  }

  //////////////////////
  dismissModal() {
    this.setState({signUpModalVisible: !this.state.signUpModalVisible});
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
    const {primaryWhiteTextStyle} = theme;

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
          <Text style={[primaryWhiteTextStyle, {fontSize: 14}]}>CREATE MY ACCOUNT</Text>
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
      imageStyle
    } = styles;

    const { 
      iconStyle,
      iconTextStyle,
      inputStyle,
      inputTitleStyle, 
      primaryWhiteTextStyle, 
      primaryGreyTextStyle 
    } = theme;

    const { 
      name, 
      email, 
      password, 
      children 
    } = this.props;

    const { 
      errors, 
      secureTextEntry, 
      titlePosition,
      subTitlePosition,
      facebookIconPosition,
      googleIconPosition,
      emailIconPosition,
      imagePosition,
      buttonOpacity
    } = this.state;

    firebase.analytics().setCurrentScreen('Register Screen', 'RegisterForm')

    if (this.state.loggedIn) {
      (children.profile && children.profile.journey) ? Actions.main(): Actions.journey();
      return (<View />);
    }

    // Social buttons Animation
    let scalingFacebook = this.scalingFacebookValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25] // degree of rotation
    });
    let transformFacebookStyle = { transform: [{ scale: scalingFacebook }] };

    let scalingGoogle = this.scalingGoogleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25] // degree of rotation
    });
    let transformGoogleStyle = { transform: [{ scale: scalingGoogle }] };
    
    let scalingEmail = this.scalingEmailValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25] // degree of rotation
    });
    let transformEmailStyle = { transform: [{ scale: scalingEmail }] };

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: primaryWhiteColor }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={pageStyle}
        scrollEnabled={true}
      >
        <Animated.View 
          style={[logoStyle, {marginLeft: imagePosition}]}
        >
          <HeaderImage
            source={Images.img_login_logo}
          />
        </Animated.View>
        <View
          style = {{flex: 3}}
        >
          <Animated.View style=
            {{
              marginRight: titlePosition
            }}
          >
            <Text style={titleTextStyle}>
              Health 
            </Text>
          </Animated.View>
          <Animated.View style=
            {{
              marginRight: subTitlePosition
            }}
          >
            <Text style={titleTextStyle}>
              is a journey 
            </Text>
          </Animated.View>
        </View>
        <View style={loginCardStyle}>
            <TextField
              ref={this.nameRef}
              label='Name'
              value={name}
              onChangeText={this.onNameChangeText.bind(this)}
              keyboardType="default"          
              autoCorrect={false}
              autoCapitalize='words'
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus.bind(this)}
              onSubmitEditing={this.onSubmitName.bind(this)}
              returnKeyType='next'
              error={errors.name}
              textColor={graphGreyColor}
              baseColor={graphGreyColor}
              tintColor={primaryGreyColor}
              labelTextStyle={inputStyle}
              titleTextStyle={inputTitleStyle}
            />
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
              renderAccessory={this.renderPasswordAccessory.bind(this)}
              textColor={graphGreyColor}
              baseColor={graphGreyColor}
              tintColor={primaryGreyColor}
              labelTextStyle={inputStyle}
              titleTextStyle={inputTitleStyle}
              titleFontSize={14}
            />
          </View>
          <Animated.View style={[submitButtonStyle, {opacity: buttonOpacity}]}>
            {this.renderButton()}
          </Animated.View>
          <View style={separatorStyle}>
            <Text style={[primaryGreyTextStyle, {color: primaryGreyColor}]} >or login with</Text>
          </View>      
          <View style={socialContainer}>
            <Animated.View
              style={{marginBottom: facebookIconPosition}}
            >
              <TouchableOpacity 
                style={iconStyle} 
                onPress={() => {
                  Animated.timing(this.scalingFacebookValue, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear
                  }).start(()=>{
                    Animated.timing(this.scalingFacebookValue, {
                      toValue: 0,
                      duration: 100,
                      easing: Easing.linear
                    }).start(this.onFacebookSignInButtonPress.bind(this));
                  });                
                }}
              >
                <Animated.View
                  style={transformFacebookStyle}
                >
                  <Image
                    style={imageStyle}
                    source={Images.img_login_facebook}
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{marginBottom: googleIconPosition}}
            >
              <TouchableOpacity 
                style={iconStyle} 
                onPress={() => {
                  Animated.timing(this.scalingGoogleValue, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear
                  }).start(()=>{
                    Animated.timing(this.scalingGoogleValue, {
                      toValue: 0,
                      duration: 100,
                      easing: Easing.linear
                    }).start(this.onGoogleSignInButtonPress.bind(this));
                  });                
                }}
              >
                <Animated.View
                  style={transformGoogleStyle}
                >
                  <Image
                    style={imageStyle}
                    source={Images.img_login_google}
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{marginBottom: emailIconPosition}}
            >
              <TouchableOpacity 
                style={iconStyle} 
                onPress={() => {
                  Animated.timing(this.scalingEmailValue, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear
                  }).start(()=>{
                    Animated.timing(this.scalingEmailValue, {
                      toValue: 0,
                      duration: 100,
                      easing: Easing.linear
                    }).start(Actions.login());
                  });                
                }}
              >
                <Animated.View
                  style={transformEmailStyle}
                >
                  <Image
                    style={imageStyle}
                    source={Images.img_login_email1}
                  />
                </Animated.View>
              </TouchableOpacity>
              </Animated.View>
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
        </KeyboardAwareScrollView>  
      </SafeAreaView> 
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
    justifyContent: 'center',
    alignContent: 'flex-end'
  },
  logoTextStyle: {
    flex: 1,
//    backgroundColor: "blue",
    paddingLeft: scale(80),
    paddingRight: scale(80)
  },
  loginCardStyle: {
    height: 200,
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
    height: 80,
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
  imageStyle: {
    height: 44,
    width: 44
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: "grey",
    // shadowOpacity: 0.7
  }
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
  registerUser,
  loginGoogleUser,
  loginFacebookUser,
  loginClearError
})(RegisterForm);
