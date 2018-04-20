import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  Image
} from "react-native";
import { theme, primaryBlueColor } from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {Icon} from './Icon';
import {Fonts} from '../../resources/fonts/Fonts'


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

  render() {
    const {
        cardStyle,
        valueContainerStyle,
        valueTextStyle,
        titleTextStyle
    } = styles;

    const {
        color,
        icon,
        title,
        value,
        width,
        height
    } = this.props;

    return (
      <View style={[cardStyle, {
          shadowColor: color,
          borderColor: color,
          backgroundColor: color,
          width: width,
          height: height
      }]}>
        <View style={valueContainerStyle}>
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
              opacity: 0.7
            }
          ]}>
              {title}
          </Text>
        </View>        
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderRadius: 3,
    borderBottomWidth: 0,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10
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
