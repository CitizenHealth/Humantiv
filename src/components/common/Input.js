import React from "react";
import { TextInput, View, Text } from "react-native";

const Input = (props) => {
  const { label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    enablesReturnKeyAutomatically,
    returnKeyType,
    keyboardType,
    autoFocus,

  } = props;
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}> {label} </Text>
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
        enablesReturnKeyAutomatically= {enablesReturnKeyAutomatically}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    color: "#E9222E",
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
};

export { Input };
