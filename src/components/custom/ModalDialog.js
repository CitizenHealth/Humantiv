import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from 'react-native';
import { scale } from "react-native-size-matters";
import { ModalWrapper } from '../common';
import { theme, primaryGreyTextStyle } from '../themes';
import {Fonts} from '../../resources/fonts/Fonts'
import {primaryGreyColor, graphGreyColor} from '../themes/theme';

class ModalDialog extends Component {

  _renderInnerText() {
    const {
      dialogTextButtonStyle,
      dialogButtonStyle,
      dialogButtonContainerStyle
    } = theme;

    if (Platform.OS === 'android') {
        return (         
            <View  style={dialogButtonContainerStyle}>
              <TouchableNativeFeedback
                onPress={this.props.onCancelPress}
              >
                <View
                  style={dialogButtonStyle}
                >
                  <Text style={dialogTextButtonStyle}>
                    {this.props.cancelLabel}  
                   </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={this.props.onAcceptPress}
              >
                <View
                  style={dialogButtonStyle}
                >
                  <Text style={dialogTextButtonStyle}> 
                    {this.props.acceptLabel}   
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>         
        );
      } else {
        return (
          <View  style={dialogButtonContainerStyle}>
            <TouchableOpacity
              onPress={this.props.onCancelPress}
            >
              <View 
                style={dialogButtonStyle}
              >
                <Text style={
                  dialogTextButtonStyle
                  }
                > 
                  {this.props.cancelLabel} 
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.onAcceptPress}
            >
              <View
                style={dialogButtonStyle}
              >
                <Text style={dialogTextButtonStyle}> 
                  {this.props.acceptLabel}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
     }
  }

  render() {
      const { 
        modalContent,
        dialogTextContainerStyle 
      } = theme;
      
      return (
        <ModalWrapper
          onRequestClose={this.props.onCancel}
          style= {[
            modalContent, { 
              width: scale(280), 
              height: scale(120)
            }]
          }
          visible={this.props.visible}>
            <View 
              style={dialogTextContainerStyle}
            >
              <Text 
                style= {[
                  primaryGreyTextStyle, 
                  {
                    flex: 1,
                    padding:15,
                    fontSize:16,
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    textAlign: 'left',
                    fontFamily: Fonts.regular,
                    color: graphGreyColor
                  }]
                }
              > 
                {this.props.label}
              </Text>  
            </View>      
            {this._renderInnerText()}
        </ModalWrapper>
        );
    } 
}

// const styles = StyleSheet.create({
// });

export { ModalDialog };
