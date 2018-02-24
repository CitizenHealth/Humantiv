import React, { Component } from "react";
import { View } from 'react-native';
import { Input } from '../common/Input';
import {theme, primaryBlueColor} from '../themes';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class IconInput extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { inputContainerStyle } = theme;
        return (
            <View style={inputContainerStyle}>
                <FontAwesome 
                    style={{
                        color: primaryBlueColor,
                        fontSize: 24,
                        width: 44,
                        textAlign: 'center'
                    }}
                >
                    {this.props.icon}
                </FontAwesome>
                <Input 
                    style= {{backgroundColor: '#3C6AB4', shadowColor: '#3C6AB4'}}
                    {...this.props}
                >
                </Input>
            </View>
        );
    }
}

export { IconInput };