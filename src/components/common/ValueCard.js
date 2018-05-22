import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { theme, primaryBlueColor } from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {Icon} from './Icon';
import {Fonts} from '../../resources/fonts/Fonts'
import LinearGradient from 'react-native-linear-gradient';
import {primaryBackgroungColor} from '../themes/theme';


class ValueCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    backgroundImage: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    title: "",
    value: 0,
    icon: "",
    backgroundImage: "",
    color: "#dddddd",
    width: 200,
    height: 200/2.50
  }

  constructor(props) {
    super(props);

    this.props.height = this.props.width / 2.40;
  }

  getGradientConfig() {
    const {icon} = this.props;
    
    switch(icon) {
      case 'medit':
        return {
          colors: ['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)'],
          image: Images.img_medit_bg
        }
      case 'medex':
        return {
          colors: ['rgba(50, 211, 148,1)','rgba(144, 222, 75,0.7)'],
          image: Images.img_medex_bg
        }
      default:
        return {
          colors: ['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)'],
          image: Images.img_medit_bg
        }
    }     
  }

  render() {
    const {
        cardStyle,
        valueContainerStyle,
        valueTextStyle,
        titleTextStyle,
        valueTextAlignStyle
    } = styles;

    const {
        color,
        icon,
        title,
        value,
        width,
        height
    } = this.props;

    const config = this.getGradientConfig(icon);

    return (
      <LinearGradient 
      style={[cardStyle, {
        overflow: 'hidden',
        width: width,
        height: height
      }]}
          start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
          colors={config.colors}
        >
      <ImageBackground 
      style={valueContainerStyle}
        source={config.image}
      >
        
          <View style={valueTextAlignStyle}>
            <Text style={valueTextStyle}>
                {value}
            </Text>
            <Icon
            name={icon}
            color= "#fff"
            size= {16}/>
          </View>
            <Text style={[
              titleTextStyle,
              {
                color: "#fff", 
                opacity: 0.7
              }
            ]}>
                {title}
            </Text>
            </ImageBackground>
        </LinearGradient>        

    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex : 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow:'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  cardStyle: {
    borderRadius: 3
  },
  valueContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  valueTextAlignStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  valueTextStyle: {
    fontSize: 36,
    fontWeight: "400",
    color: "#fff",
    marginRight: 5,
    fontFamily: Fonts.regular
  },
  titleTextStyle: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
    marginTop: -5,
    fontFamily: Fonts.regular
  }
});

export { ValueCard };
