import React, { Component } from "react";
import { Button } from '../common';

class SignUpButton extends Button {

    constructor(props) {
       super(props);
    }

    render() {
        return (
            <Button 
                 {...this.props}
            />
        );
    }
}

export { SignUpButton };
