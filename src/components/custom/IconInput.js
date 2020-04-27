import React, { Component } from "react";
import { View } from 'react-native';
import { Input } from '../common/Input';
import {theme, primaryBlueColor} from '../themes';
import FontAwesome, { RegularIcons } from 'react-native-fontawesome';
import {
  primaryGreyColor,
  secondaryGreyColor
} from '../themes/theme';

class IconInput extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { inputContainerStyle } = theme;
        return (
            <View style={inputContainerStyle}>
                <Input 
                    style= {{
                      backgroundColor: '#3C6AB4', 
                      shadowColor: '#3C6AB4',
                      color: secondaryGreyColor
                    }}
                    {...this.props}
                >
                </Input>
            </View>
        );
    }
}

export { IconInput };