import React, {Component} from 'react';
import {
  View,
  WebView,
  StyleSheet,
  Platform
} from 'react-native';
import {IconButton} from './common';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
  primaryBlueColor,
  primaryBackgroungColor
} from './themes';
import PropTypes from 'prop-types';
import { Actions } from "react-native-router-flux";
import {primaryWhiteColor} from './themes/theme';

class WebPageView extends Component {

  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: ""
  }

  componentWillMount() {
    console.log("HI")
  }

  render() {
    const {
      pageStyle,
      navigationBarStyle,

    } = styles;

    return (
      <View style={pageStyle}>
        <View style={navigationBarStyle}>
        <IconButton 
          textStyles= {{color: primaryWhiteColor}}
          onPress={() => {
            this.props.backPress();
            Actions.pop();
          }}>
          <FontAwesome>{Icons.chevronLeft}</FontAwesome>
        </IconButton>
      </View>

        <WebView 
          style={styles.webViewStyle} 
          source={{uri: this.props.url}} 
          javaScriptEnabled={true}
          domStorageEnabled={true}  
        />  
      </View>   
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
      backgroundColor: primaryBlueColor,
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      flex: 1
  },
  navigationBarStyle: {
    height: 20,
    paddingTop: 20,
    paddingLeft: 0,
    justifyContent: "center",

  },
  webViewStyle:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
  }
})

export default WebPageView;