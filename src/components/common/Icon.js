import React, {Component} from 'react';
import {Text} from 'react-native';

const Icon = ({name}) => {
    const {textStyle} = styles;

    var code ="e91c";

    switch (name) {
        case "head":
            code = "\e900";
            break;
        case "trophee":
            code = "\e901";
            break;
        case "graph":
            code = "\e902";
            break;
        case "blocks":
            code = "\e900";
            break;
        case "hand_grey":
            code = "\e901";
            break;
        case "hand_green":
            code = "\e902";
            break;
        case "plus_blue":
            code = "\e916";
            break;        
        default:
            break;
    }

    return (
        <Text style={textStyle}>
            {code}
        </Text>
    );
}

const styles = {
    textStyle: {
      textAlign: 'center',
      fontWeight: "600",
      fontSize: 16,
      marginBottom: 5,
      fontFamily: "icomoon"
    }
}

export {Icon}