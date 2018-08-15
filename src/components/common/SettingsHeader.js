import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import {IconButton} from './IconButton'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  graphGreyColor
} from '../themes'
import PropTypes from 'prop-types';
import { scale } from "react-native-size-matters";
import Images from "../../resources/images";


class SettingsHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string
  }
  static defaultProps = {
    name: "",
    email: "",
    image: ""
  }

  render() {
    const {
      containerStyle,
      upperContainerStyle,
      lowerContainer,
      upperTextContainer,
      lowerTextContainer,
      profileImageStyle,
      nameStyle,
      emailStyle
    } = styles;

    const screenWidth = Dimensions.get('window').width;
    const componentHeight = screenWidth * 0.55;
    const imageSize = 4*componentHeight / 7;

    return(
      <View style={[
        containerStyle,
        {
          height: componentHeight,
          width: screenWidth
        }
      ]}>
      <View style={upperContainerStyle}>
        </View>
        <View style={lowerContainer}>
          {/* <IconButton 
            viewStyles ={{
              height: imageSize/3,
              width: imageSize/3,
              backgroundColor: primaryBlueColor,
              marginRight: -imageSize*0.707,
              marginTop: -imageSize*0.293,
              borderRadius: imageSize/3
            }}
            onPress={() => {console.log("Change Picture")}}
          >
            <FontAwesome  style={{
              color: "#fff",
              fontSize: 16,
              }}
            >
              {Icons.pencil}</FontAwesome>
          </IconButton> */}
          <View style={upperTextContainer}>
            <Text style={nameStyle}>
              {this.props.name}
            </Text>
          </View>
          <View style={lowerTextContainer}>
            <Text style={emailStyle}>
              {this.props.email}
            </Text>
          </View>
        </View>
        <Image 
            style={[
              profileImageStyle,
              {
                position: 'absolute',
                width: imageSize,
                height: imageSize,
                top: 0,
                left: Dimensions.get('window').width/2 - imageSize/2,        
                borderRadius: imageSize/2
              }
            ]}
      source={(this.props.image === "" )? Images.img_user_profile : {uri: this.props.image}} />

      </View>
    )
  }
}

const styles = {
  containerStyle: {
    height: scale(200)
  },
  upperContainerStyle: {
    flex: 2,
    backgroundColor: "#f9fafc"
  },
  lowerContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#fff",
    overflow: 'visible'
  },
  upperTextContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  lowerTextContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  profileImageStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameStyle: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: graphGreyColor,
  },
  emailStyle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
  }
}

export {SettingsHeader};