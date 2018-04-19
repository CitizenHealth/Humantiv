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

    return (
      <View style={[cardStyle, {
          shadowColor: color,
          borderColor: color,
          backgroundColor: color,
          width: width,
          height: height
      }]}>
        <View style={valueContainerStyle}>
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
