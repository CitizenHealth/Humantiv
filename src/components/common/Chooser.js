import React from "react";
import { Picker, Text, View } from "react-native";

const Chooser = (props) => {
  const { pickerTextStyle, pickerContainerStyle, pickerStyle } = styles;

  return (
    < View
      style={pickerContainerStyle}
    >
      <Text style={pickerTextStyle} >Shift</Text>
      <Picker
        style={pickerStyle}
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
      >
        <Picker.Item label="Monday" value="Monday" />
        <Picker.Item label="Tueday" value="Tueday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>
    </View>
  );
};

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    color: "#E9222E"
  },
  pickerStyle: {
    flex: 1
  },
  pickerContainerStyle: {
    flex: 1,
    flexDirection: "column"
  }
};

export { Chooser };
