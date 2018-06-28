import React, { Component } from "react";
import { 
    View, 
    TouchableOpacity,
    Platform
 } from 'react-native';
import { Input } from '../common/Input';
import {theme, primaryBlueColor} from '../themes';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class IconPasswordInput extends Component {

    state = {isPasswordVisible: false};

    constructor(props) {
        super(props);
    }

    renderShowIcon() {
        if (this.state.isPasswordVisible) {
            return (Icons.eye);
        } else {
            return (Icons.eyeSlash);
        }
    }

    renderInput() {
        const inputStyle = {backgroundColor: primaryBlueColor, shadowColor: primaryBlueColor};

        if (this.state.isPasswordVisible) {
            return (
                <Input 
                    style= {inputStyle}
                    {...this.props}
                />   
            );
        } else {
            return (
                <Input 
                    style= {inputStyle}
                    {...this.props}
                    secureTextEntry 
                />   
            );
        }
    }

    renderDisplayPassword() {
        if (Platform.OS === 'android') {
            return (
                <TouchableOpacity 
                    onPress={() => {this.setState({isPasswordVisible: !this.state.isPasswordVisible})}} 
                > 
                    <FontAwesome 
                        style={{
                            color: primaryBlueColor,
                            fontSize: 24,
                            width: 44,
                            textAlign: 'center'
                        }}
                    >
                        {this.renderShowIcon()}
                    </FontAwesome> 
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity 
                    onPress={() => {this.setState({isPasswordVisible: !this.state.isPasswordVisible})}}
                >
                    <FontAwesome 
                        style={{
                            color: primaryBlueColor,
                            fontSize: 24,
                            width: 44,
                            textAlign: 'center'
                        }}
                    >
                        {this.renderShowIcon()}
                    </FontAwesome>   
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { inputContainerStyle } = theme;

        return (
            <View style={inputContainerStyle}>
                {this.renderInput()}            
                {this.renderDisplayPassword()}
            </View>
        );
    }
}

export { IconPasswordInput };