import React, { Component } from "react";
import { 
  TouchableOpacity, 
  View,
  StyleSheet,
  Image
} from "react-native";
import {
  medifluxMainColor, 
  medifluxWhiteColor,
  medifluxGreyColor
} from '../views/Colors';
import Images from '../images/images';
import PropTypes from 'prop-types';
import Spinner from "react-native-spinkit";
import { scale } from "react-native-size-matters";
import FontAwesome, { Icons } from 'react-native-fontawesome';

class DataSourceCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    title: "Can't fint it?",
    image: Images.img_cantfindit,
    width: 100,
    height: 100,
    selected: false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
        cardStyle,
    } = styles;

    const {
      title,
      width,
      height,
      image,
      selected,
      onSelect
    } = this.props;

    return (
    <View style={[cardStyle, {
        width: width,
        height: height
    }]}>
      <TouchableOpacity
        onPress= {() => onSelect()}
      >
        <View
          style = {{
            width: width, 
            height: height
          }}
        >
          <Image
            style={{ 
              width: width, 
              height: height,
            }} 
            source={image} 
          /> 
        </View>
      </TouchableOpacity>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
  },    
});

export { DataSourceCard };
