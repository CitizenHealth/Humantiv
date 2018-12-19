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
    width: scale(100),
    height: scale(100),
    selected: false,
  }

  constructor(props) {
    super(props);


    this.state = {
      isSelected: props.selected
    }
  }

  render() {
    const {
        cardStyle,
    } = styles;

    const {
      isSelected
    } = this.state;
    
    const {
      title,
      width,
      height,
      image,
      onSelect
    } = this.props;

    return (
    <View style={[cardStyle, {
        width: width,
        height: height,
    }]}>
      <TouchableOpacity
        onPress= {() => {
          let selected = this.state.isSelected;
          onSelect(selected);
        }}
      >
        <View
          style = {{
            width: width, 
            height: height
          }}
        >
          <Image
            style={{ 
              width: width-5, 
              height: height-5,
            }} 
            source={image} 
          /> 
        </View>
        <View
          style= {{
            position: 'absolute',
            width: width,
            height: height,
            top: 0,
            backgroundColor: medifluxMainColor,
            opacity: (isSelected) ? 0.6 : 0
          }}
        />
      </TouchableOpacity>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1
  },    
});

export { DataSourceCard };
