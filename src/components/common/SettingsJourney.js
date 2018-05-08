import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  theme,
  highlightedGreenColor, 
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import {IconButton} from './IconButton';
import {Icon} from './Icon';
import { scale } from "react-native-size-matters";
import PropTypes from 'prop-types';
import journeyData from '../../configuration/journey.json';
import {primaryGreenColor} from '../themes/theme';


const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsJourney extends Component {
  static propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.number,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: "energy",
    color: primaryBlueColor
  }

  constructor(props) {
    super(props);

    const {type} = this.props;
  }

  render() {
    const {
      color,
      onPress,
      type
    } = this.props;

    const {
      containerStyle,
      goalContainerStyle,
      iconContainerStyle,
      titleContainerStyle,
      titleStyle,
      buttonContainerStyle,
      buttonTextStyle
    } = styles;
    
    const {
      iconStyle,
      iconTextStyle
    } = theme;

    var icon = "";
    var title = "";
    journeyData.map((item, index) => {
      if (item.key === type) {
        title=item.title;
        icon=item.icon;
      }
    })

    const width = Dimensions.screenWidth
    return(
      <View style={containerStyle}>
        <View style={goalContainerStyle}>
          <View style={[iconContainerStyle,
            {
              width: this.props.size/6.3,
              marginTop: this.props.size/17
            }
          ]}>
            <Icon
              name={icon}
              color= {color}
              size= {scale(32)}
            />
          </View>
          <View style={titleContainerStyle}>
            <Text style={[titleStyle,
            {color: color}]}>
            {title}
            </Text>
          </View>
        </View>
        <View style={buttonContainerStyle}>
          <TouchableOpacity
            onPress={onPress}
            style= {{flex: 1}}
          > 
            <Text style={buttonTextStyle}>
              Change Journey
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = {
  containerStyle: {
    height: componentHeight+30,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  goalContainerStyle: {
    height: componentHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  iconContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  titleContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: primaryGreenColor,
    fontFamily: Fonts.regular,
    marginLeft: 10,
    marginRight: 10
  },
  buttonContainerStyle: {
    width: screenWidth,
    backgroundColor: primaryGreenColor,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    fontFamily: Fonts.regular,
  }
}

export {SettingsJourney};