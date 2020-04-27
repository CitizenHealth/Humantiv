import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import PropTypes from 'prop-types';
import { scale } from "react-native-size-matters";
import {Select, Option} from "react-native-chooser";
import {primaryGreyColor, primaryWhiteColor} from '../themes/theme';
import FontAwesome, { RegularIcons } from 'react-native-fontawesome';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsButton extends Component {

  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    label: "",
    disabled: false
  }

  render() {
    const {
      label,
      on
    } = this.props;

    const {
      containerStyle,
      labelStyle,
      inputStyle,
      fontAwesomeStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={{
            flexGrow:1, 
            height: componentHeight,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Text style={labelStyle}>
            {label}
          </Text>
          <View>
          <FontAwesome 
            style={fontAwesomeStyle}
          >
            {RegularIcons.angleRight}
          </FontAwesome>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = {
  fontAwesomeStyle: {
    marginRight: scale(10),
    justifyContent: 'flex-end',
    fontSize: 35,
    width: 35,
    textAlign: 'center',
    color: primaryWhiteColor,
  },
  containerStyle: {
    height: componentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    backgroundColor: primaryBlueColor,
    elevation: 1
  },
  labelStyle: {
    textAlignVertical: 'center',
    flex: 2,
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: primaryWhiteColor,
    marginLeft: scale(10)
  },
  inputStyle: {
    flex: 4,
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
  },
  switchStyle: {
    marginRight: scale(10)
  }
  
}

export {SettingsButton};