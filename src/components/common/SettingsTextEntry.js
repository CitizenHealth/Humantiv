import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import { scale } from "react-native-size-matters";

const screenWidth = Dimensions.get('window').width;
const componentWidth = screenWidth;
const componentHeight = 50;

class SettingsTextEntry extends Component {

  
  render() {
    const {
      label,
      placeholder,
      onChangeText,
      enablesReturnKeyAutomatically,
      returnKeyType,
      keyboardType,
      autoFocus,
      value,
      unit,
      editable
    } = this.props;

    const {
      containerStyle,
      labelStyle,
      inputStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput 
          style={inputStyle}
          placeholder={placeholder}
          autoCorrect={false}
          value={`${value} ${unit}`}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize= "none"
          editable= {editable}
          enablesReturnKeyAutomatically= {enablesReturnKeyAutomatically}
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}
const styles = {
  containerStyle: {
    width: componentWidth,
    height: componentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  labelStyle: {
    textAlignVertical: 'center',
    flex: 2,
    fontSize: 18,
    fontFamily: Fonts.light,
    fontWeight: "400",
    color: graphGreyColor,
    marginLeft: scale(10)
  },
  inputStyle: {
    flex: 4,
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
    marginRight: scale(10)
  }
}

export {SettingsTextEntry};