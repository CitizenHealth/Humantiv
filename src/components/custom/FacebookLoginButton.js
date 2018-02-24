import React, { Component } from "react";
import { Button } from '../common/Button';

class FacebookLoginButton extends Button {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Button 
                style= {{backgroundColor: '#3C6AB4', shadowColor: '#3C6AB4'}}
                {...this.props}
            />
        );
    }
}

export { FacebookLoginButton };