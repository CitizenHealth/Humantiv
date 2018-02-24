import React, { Component } from "react";
import { Button } from '../common/Button';

class GoogleLoginButton extends Button {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Button 
                {...this.props}
                style = {
                    [this.props.style, {
                        backgroundColor: '#D94A42', 
                        shadowColor: '#D94A42'
                    }]
                }
            />
        );
    }
}

export { GoogleLoginButton };