import React, { Component } from "react";
import { 
    View, 
    TouchableOpacity, 
    TouchableNativeFeedback,
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
            return (Icons.eyeSlash);
        } else {
            return (Icons.eye);
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
                <TouchableNativeFeedback 
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
                </TouchableNativeFeedback>
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
                {this.renderInput()}            
                {this.renderDisplayPassword()}
            </View>
        );
    }
}

export { IconPasswordInput };