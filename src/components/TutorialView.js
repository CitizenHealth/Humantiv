
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
import {primaryBlueColor} from './themes/theme';
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
        backgroundColor: this.props.tutorial_background_color,
      },
      {
        key: 'intelligence',
        title: 'Health Intelligence',
        text: 'Our AI analyzes data from multiple devices, services, and health providers.',
        image: Images.img_tutorial_1,
        imageStyle: styles.image,
        backgroundColor: this.props.tutorial_background_color,
      },
      {
        key: 'cryptocurrency',
        title: 'Cryptocurrency rewards',
        text: 'Receive Medits for improving your health.',
        image: Images.img_tutorial_1,
        imageStyle: styles.image,
        backgroundColor: this.props.tutorial_background_color,
      },
      {
        key: 'vote',
        title: 'Every vote counts',
        text: 'You decide how we change healthcare.',
        image: Images.img_tutorial_1,
        imageStyle: styles.image,
        backgroundColor: this.props.tutorial_background_color,
      },
      {
        key: 'change',
        title: 'Change is coming!',
        text: 'Be part of the growing movement changing healthcare from the ground up.',
        image: Images.img_tutorial_1,
        imageStyle: styles.image,
        backgroundColor: this.props.tutorial_background_color,
      }
    ];

    return (
      <View style={[containerStyle, {backgroundColor: this.props.tutorial_background_color}]}>
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
            <Text style={[buttonTextStyle, {color: this.props.tutorial_background_color}]}>
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
      width: 320,
      height: 200,
    },
    containerStyle: {
      flex: 1
    },
    buttonContainerstyle: {
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'white'
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