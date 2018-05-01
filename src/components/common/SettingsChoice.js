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
import {Select, Option} from "react-native-chooser";

const screenWidth = Dimensions.get('window').width;
const componentWidth = screenWidth;
const componentHeight = 50;

class SettingsChoice extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      value : (props.choices) ? props.choices[0] : ""
    }
  }

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
        <Select
            onSelect = {() => {this.onSelect();}}
            defaultText  = {this.state.value}
            style = {inputStyle}
            textStyle = {{}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}
          >
          <Option value = {{name : "azhar"}}>Azhar</Option>
          <Option value = "johnceena">Johnceena</Option>
          <Option value = "undertaker">Undertaker</Option>
          <Option value = "Daniel">Daniel</Option>
          <Option value = "Roman">Roman</Option>
          <Option value = "Stonecold">Stonecold</Option>
          <Option value = "Rock">Rock</Option>
          <Option value = "Sheild">Sheild</Option>
          <Option value = "Orton">Orton</Option>
 
        </Select>
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

export {SettingsChoice};