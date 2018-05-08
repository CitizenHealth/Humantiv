import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  theme,
  highlightedGreyColor, 
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import {IconButton} from './IconButton';
import {Icon} from './Icon';
import { scale } from "react-native-size-matters";
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsDataSource extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: "Add source",
    icon: "plus_blue",
    color: primaryBlueColor
  }
  
  render() {
    const {
      label,
      icon,
      color,
      onPress
    } = this.props;

    const {
      containerStyle,
      cardButtonTitleStyle
    } = styles;
    
    const {
      iconStyle,
      iconTextStyle
    } = theme;

    return(
      <View style={containerStyle}>
        <IconButton
          onPress={onPress}
          viewStyles={iconStyle}
          textStyles={iconTextStyle}
        >
          <Icon name={icon}/>
        </IconButton>
        <Text style={[cardButtonTitleStyle,{
         color: color
        }]}>
         {label}
        </Text>
      </View>
    )
  }
}
const styles = {
  containerStyle: {
    height: componentHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  cardButtonTitleStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: primaryBlueColor,
    fontFamily: Fonts.regular,
    paddingRight: 10
  },

}

export {SettingsDataSource};