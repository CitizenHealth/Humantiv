import React, { Component } from "react";
import { TextInput, View, Text } from "react-native";
import { theme } from '../themes';

class Input extends Component {
  
  render() {
    const { label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      enablesReturnKeyAutomatically,
      returnKeyType,
      keyboardType,
      autoFocus,
      editable
    } = this.props;
    const { inputStyle } = theme;

    return (
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize= "none"
          editable= {editable}
          enablesReturnKeyAutomatically= {enablesReturnKeyAutomatically}
        />
    );
  };
};

export { Input };
