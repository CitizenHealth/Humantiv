import React, { Component } from "react";
import { Text, View } from 'react-native';
import { Input } from '../common/Input';
import { theme } from '../themes';

class TextInput extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { inputContainerStyle, inputLabelStyle } = theme;
        return (
            <View style={inputContainerStyle}>
                <Text style={inputLabelStyle}> {this.props.label} </Text>
                <Input 
                    style= {{backgroundColor: '#3C6AB4', shadowColor: '#3C6AB4'}}
                    {...this.props}
                >
                </Input>
            </View>
        );
    }
}

export { TextInput };