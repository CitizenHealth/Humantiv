
import React, {Component} from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image ,
    TouchableOpacity,
    Platform
} from 'react-native';
import { scale } from "react-native-size-matters";
import {TutorialSlider} from '../components/custom';
import Images from '../resources/images';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {primaryBlueColor, primaryWhiteColor} from './themes/theme';
import firebase from "react-native-firebase";
import {
  Sentry,
  SentrySeverity,
  SentryLog
} from 'react-native-sentry';



class TutorialView extends Component {

  componentWillMount() {
    // set a custom message
    // Sentry.captureMessage("TEST message", {
    //   level: SentrySeverity.Warning
    // }); // Default SentrySeverity.Error
    
    // // capture an exception
    // Sentry.captureException(new Error('Oops!'), {
    //   logger: 'Tutorial'
    // });
    
    // // capture a breadcrumb
    // Sentry.captureBreadcrumb({
    //   message: 'Tutorial run',
    //   category: 'action',
    //   data: {
    //       isbn: '978-1617290541',
    //       cartSize: '3'
    //   }
    // });
    
    // This will trigger a crash in the native sentry client
    //Sentry.nativeCrash();
    firebase.analytics().setCurrentScreen('Tutorial Screen', 'TutorialView')
  }

  componentDidCatch(error, info) {
    //Try Sentry to report rendering issues
    // capture an exception
    Sentry.captureException(new Error('Render Problem'), {
      logger: 'TutorialView'
    });
    
    console.log(`${displayName}: ${error} - ${info}`);
  }

  renderNextButton = () => {
    return (
      <View>
        
      </View>
    );
  }
  renderDoneButton = () => {
    return (
      <View>
        
      </View>
    );
  }

  render() {
    const {
      containerStyle, 
      buttonContainerstyle, 
      buttonStyle,
      buttonTextStyle
    } = styles;

    var slides = [
      {
        key: 'welcome',
        title: this.props.tutorial_title,
        text: this.props.tutorial_text,
        image: Images.img_tutorial_1,
        imageStyle: styles.image,
        backgroundColor: primaryWhiteColor,
      },
      {
        key: 'intelligence',
        title: 'Your personal health journey',
        text: 'Choose what Personal Health Journey best describes your needs. Each journey functions as a way to engage with your health. Consult your doctor before beginning any new routine.',
        image: Images.img_tutorial_2,
        imageStyle: styles.image,
        backgroundColor: primaryWhiteColor,
      },
      {
        key: 'datasources',
        title: 'Connect your wearables',
        text: 'Connect your data sources, like your watch, wearable or health tracker on your mobile device. More devices and data coming soon.',
        image: Images.img_tutorial_3,
        imageStyle: styles.image,
        backgroundColor: primaryWhiteColor,
      },
      {
        key: 'healthview',
        title: 'Stay healthy',
        text: 'Your activity, sleep, and steps generate a Health Score. This score changes with your activity and produces Health Event Notifications.',
        image: Images.img_tutorial_4,
        imageStyle: styles.image,
        backgroundColor: primaryWhiteColor,
      },
      {
        key: 'medit',
        title: 'Your activity generates Medit',
        text: 'Medit is a reward token that is stored in your personal wallet. The future uses for  Medit include paying for products, health services, and investment.',
        image: Images.img_tutorial_5,
        imageStyle: styles.image,
        backgroundColor: primaryWhiteColor,
      }
    ];

    return (
      <View style={[containerStyle, {backgroundColor: "#fff"}]}>
       <TutorialSlider style={{flex:1, alignItems: 'stretch'}}
          slides={slides}
          onSlideChange={(a, b) => console.log(`Active slide changed from ${b} to ${a}`)}
          renderNextButton={this.renderNextButton}
          renderDoneButton={this.renderDoneButton}
        />
        <View style={buttonContainerstyle}> 
          <TouchableOpacity 
            style={buttonStyle} 
            onPress={() => Actions.login()}
          >
            <Text style={[buttonTextStyle, {color: "#fff"}]}>
                GET STARTED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    image: {
      width: scale(320),
      height: scale(320),
    },
    containerStyle: {
      flex: 1
    },
    buttonContainerstyle: {
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: primaryBlueColor
    },
    buttonTextStyle: {
      textAlign: 'center',
      fontWeight: "600",
      fontSize: 16,
      marginBottom: 5,
      ...Platform.select({
          ios: { fontFamily: "Arial", },
          android: { fontFamily: "Roboto" }
      })
    }
  });
 
  const mapStateToProps = (state) => {
    const {
      tutorial_title, 
      tutorial_text,
      tutorial_background_color
    } = state.config.configuration;

    return {tutorial_title, tutorial_text, tutorial_background_color};
  }

export default connect(mapStateToProps)(TutorialView);