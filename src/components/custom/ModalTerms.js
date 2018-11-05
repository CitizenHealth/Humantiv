import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Linking
} from 'react-native';
import { scale } from "react-native-size-matters";
import { 
  ModalWrapper,
  Button
 } from '../common';
import { primaryBlueColor, primaryWhiteColor } from '../themes';
import {Fonts} from '../../resources/fonts/Fonts';
import {graphGreyColor} from '../themes/theme';

class ModalTerms extends Component {

  _renderInnerText() {
    const {
      dialogTextButtonStyle,
      dialogButtonStyle,
      dialogButtonContainerStyle
    } = styles;
    return (
      <View  style={dialogButtonContainerStyle}>        
        <View 
          style={dialogButtonStyle}
        >
          <Button
            onPress={() => {
              this.props.onAcceptPress}
            }
            style={{
              marginLeft: scale(60),
              marginRight: scale(60)
            }}
          >
            <Text style={dialogTextButtonStyle}> Accept </Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
      const { 
        modalContent,
        buttonTextStyle,
        titleTextStyle,
        dialogTextContainerStyle 
      } = styles;
      
      return (
        <ModalWrapper
          onRequestClose={this.props.onCancel}
          style= {modalContent}
          visible={this.props.visible}>
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View 
              style={dialogTextContainerStyle}
            >
              <Text 
                style= {titleTextStyle}
              > 
                Privacy Policy
              </Text>
              <Text 
                style= {buttonTextStyle}
              > 
                In order to start using Humantiv, please agree to our
              </Text> 
              <TouchableOpacity 
                onPress={() => Linking.openURL(this.props.url)}
              >
                <Text style= {[buttonTextStyle, {color: primaryBlueColor}]}>Terms & Privacy Policy</Text>
              </TouchableOpacity>  
              {this._renderInnerText()}
            </View>      
            </SafeAreaView>
          </ModalWrapper>
        );
    } 
}

const styles = StyleSheet.create({

  dialogTextContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dialogButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50)
  },
  dialogButtonContainerStyle: {
    height: scale(50),
    marginTop: scale(50),
    justifyContent: 'center'
  },
  dialogTextButtonStyle: {
    height: scale(50),
    paddingTop: scale(12),
    fontWeight: 'normal',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    color: primaryWhiteColor,
    fontFamily: Fonts.regular
  },
  modalContent: {
    alignItems: 'stretch',
    justifyContent: "center",
    flexDirection:'column',
    backgroundColor: primaryWhiteColor,
    shadowOffset:{  width: 20,  height: 20,  },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    width: Dimensions.get('screen').width, 
    height: Dimensions.get('screen').height
  },
  buttonContainerstyle: {
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  titleTextStyle: {
    textAlign: 'center',
    fontWeight: "900",
    fontSize: 22,
    marginBottom: 5,
    fontFamily: Fonts.regular,
    color: graphGreyColor,
    marginLeft: scale(15),
    marginRight: scale(15),
    marginBottom: 10
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: Fonts.regular,
    color: graphGreyColor,
    marginLeft: 15,
    marginRight: 15
  }
});
// const styles = StyleSheet.create({
// });

export { ModalTerms };
