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


class WalletCard extends Component {
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
    height: 200/1.25
  }

  constructor(props) {
    super(props);

    this.props.height = this.props.width / 1.25;
  }

  getGradientConfig() {
    const {icon} = this.props;
    
    switch(icon) {
      case 'medit':
        return {
          colors: ['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)'],
          image: Images.img_medit_wallet_bg
        }
      case 'medex':
        return {
          colors: ['rgba(50, 211, 148,1)','rgba(144, 222, 75,0.7)'],
          image: Images.img_medex_wallet_bg
        }
      default:
        return {
          colors: ['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)'],
          image: Images.img_medit_wallet_bg
        }
    }     
  }

  render() {
    const {
        cardStyle,
        valueContainerStyle,
        valueTextStyle,
        titleTextStyle,
        containerStyle
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
      <View
        style={[containerStyle,{shadowColor: color}]}
      >
        <LinearGradient style={[cardStyle, {
          overflow: 'hidden',
          width: width,
          height: height
        }]}
          start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
            colors={config.colors}>
          <ImageBackground 
            style={valueContainerStyle}
            source={config.image}
          >
            <Icon
              name={icon}
              color= "#fff"
              size= {24}/>
            <Text style={valueTextStyle}>
                {value}
            </Text>
              
            <Text style={[
              titleTextStyle,
              {
                color: "#fff", 
                opacity: 0.8
              }
            ]}>
                {title}
            </Text>
          </ImageBackground>        
        </LinearGradient>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 3,
    borderBottomWidth: 0,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    flex: 1
  },
  cardStyle: {
    borderRadius: 3
  },
  valueContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  valueTextStyle: {
    fontSize: 36,
    fontWeight: "400",
    color: "#fff",
    fontFamily: Fonts.regular
  },
  titleTextStyle: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: -5,
    fontFamily: Fonts.regular
  }
});

export { WalletCard };
