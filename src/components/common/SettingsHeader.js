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
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import PropTypes from 'prop-types';

class SettingsHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string
  }
  static defaultProps = {
    name: "",
    email: "",
    image: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"
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
          <Image 
            style={[
              profileImageStyle,
              {
                width: imageSize,
                height: imageSize,
                marginTop: -imageSize/2,
                borderRadius: imageSize/2
              }
            ]}
            source={{uri: this.props.image}} />
          <IconButton 
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
          </IconButton>
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
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    height: 200
  },
  upperContainerStyle: {
    flex: 2,
    backgroundColor: "#f9fafc"
  },
  lowerContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    overflow: 'visible'
  },
  upperTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  lowerTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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