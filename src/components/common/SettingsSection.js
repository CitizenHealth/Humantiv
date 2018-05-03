import React, { Component } from "react";
import { 
  Text,
  View,
  Dimensions
} from "react-native";
import { 
    theme, 
    primaryBlueColor, 
    graphGreenColor,
    graphOrangeColor,
    graphRedColor,
    graphGreyColor,
    secondaryGreyColor
} from '../themes';
import PropTypes from 'prop-types';
import { scale } from "react-native-size-matters";
import {Fonts} from '../../resources/fonts/Fonts'

class SettingsSection extends Component {
  static propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    title: "Title",
    width: 400,
    height: 50
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      containerStyle,
      titleContainerStyle,
      titleStyle,
      cardContainerStyle
    } = styles;

    const {
      title,
      children
    } = this.props;

    return (
        <View style={containerStyle}>
          <View style={titleContainerStyle}>
            <Text style={titleStyle}>
              {title}
            </Text>
          </View>
          <View style={cardContainerStyle}>
            {children}
          </View>
        </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  titleContainerStyle: {
    height: scale(60),
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleStyle: {
    textAlignVertical: 'center',
    fontSize: 22,
    fontFamily: Fonts.Regular,
    fontWeight: "400",
    color: secondaryGreyColor,
    marginLeft: scale(10)
  }, 
  cardContainerStyle: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  }
}

export {SettingsSection};
