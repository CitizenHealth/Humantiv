import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TouchableNativeFeedback,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { scale } from "react-native-size-matters";
import { ModalWrapper } from '../common';
import { primaryBlueColor, primaryWhiteColor, primaryGreyColor } from '../themes';
import {Fonts} from '../../resources/fonts/Fonts';
import {graphGreyColor} from '../themes/theme';

class ModalScreen extends Component {

  _renderInnerText() {
    const {
      dialogTextButtonStyle,
      dialogButtonStyle,
      dialogButtonContainerStyle
    } = styles;
    return (
      <View  style={dialogButtonContainerStyle}>        
        <View 
          style={[dialogButtonStyle, 
            {borderRightColor: primaryWhiteColor,
            borderRightWidth: 1}]
          }
        >
          <TouchableOpacity
            onPress={this.props.onCancelPress}
          >
            <Text style={dialogTextButtonStyle}
            > 
              {this.props.cancelLabel} 
            </Text>
          </TouchableOpacity>
        </View>

        <View 
          style={[dialogButtonStyle, 
            {borderLeftColor: primaryWhiteColor,
            borderLeftWidth: 1}]}
        >
          <TouchableOpacity
            onPress={this.props.onAcceptPress}
          >
            <Text style={dialogTextButtonStyle}
            > 
              {this.props.acceptLabel} 
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
      const { 
        modalContent,
        buttonTextStyle,
        dialogTextContainerStyle 
      } = styles;
      
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ModalWrapper
            onRequestClose={this.props.onCancel}
            style= {modalContent}
            visible={this.props.visible}>
              <View 
                style={dialogTextContainerStyle}
              >
                <Text 
                  style= {buttonTextStyle}
                > 
                  {this.props.label}
                </Text> 
                {this._renderInnerText()} 
              </View>      
          </ModalWrapper>
        </SafeAreaView>
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
    width: Dimensions.get('screen').width/2, 
    alignItems: 'stretch',
    height: scale(50)
  },
  dialogButtonContainerStyle: {
    marginTop: 20,
    height: scale(50),
    flexDirection:'row',
    backgroundColor: primaryBlueColor,
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

export { ModalScreen };
