import React, {Component} from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'

const Icon = ({name, size, color}) => {
    const {textStyle} = styles;

    var code ="q";

    switch (name) {
        case "head":
            code = "w";
            break;
        case "trophee":
            code = "x";
            break;
        case "graph":
            code = "y";
            break;
        case "blocks":
            code = "z";
            break;
        case "thumbs_up_grey":
            code = "A";
            break;
        case "thumbs_up_green":
            code = "B";
            break;
        case "thumbs_down_grey":
            code = "C";
            break;        
        case "thumbs_down_red":
            code = "D";
            break; 
        case "heart_on":
            code = "E";
            break; 
        case "hands_heart":
            code = "F";
            break; 
        case "heart_off":
            code = "G";
            break; 
        case "market_on":
            code = "H";
            break; 
        case "market_off":
            code = "a";
            break; 
        case "runner":
            code = "b";
            break; 
        case "settings_on":
            code = "c";
            break; 
        case "settings_off":
            code = "d";
            break; 
        case "swimmer":
            code = "e";
            break; 
        case "vote_on":
            code = "f";
            break; 
        case "vote_off":
            code = "g";
            break; 
        case "wallet_on":
            code = "h";
            break; 
        case "wallet_off":
            code = "i";
            break; 
        case "plus_grey":
            code = "j";
            break;        
        case "plus_blue":
            code = "k";
            break;   
        case "bell":
            code = "l";
            break;               
        case "pencil":
            code = "m";
            break;               
        case "bench":
            code = "n";
            break;               
        case "heart_rate":
            code = "o";
            break;               
        case "mdx":
            code = "p";
            break;               
        case "medit_small":
            code = "q";
            break;               
        case "medit":
            code = "s";
            break;               
        case "sandwich":
            code = "t";
            break;               
        case "search":
            code = "u";
            break;               
        case "sleep":
            code = "v";
            break;                         
        default:
            break;
    }

    return (
        <Text style={
            [textStyle,
            {fontSize: ({size}) ? size : 16, color: color}]}>
            {code}
        </Text>
    );
}

const styles = StyleSheet.create({
    textStyle: {
      textAlign: 'center',
      fontWeight: "200",
      fontFamily: Fonts.icons
    }
});

export {Icon}