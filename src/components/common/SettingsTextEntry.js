import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import { scale } from "react-native-size-matters";
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsTextEntry extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    enablesReturnKeyAutomatically: PropTypes.bool,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    autoFocus: PropTypes.bool,
    unit: PropTypes.string,
    editable: PropTypes.bool,
    value: PropTypes.string
  }

  static defaultProps = {
    label: "Label",
    placeholder: "",
    enablesReturnKeyAutomatically: false,
    autoFocus: false,
    unit: "Units",
    editable: true,
    value: "Value"
  }
  constructor(props) {
    super(props);

    this.state = {
      text: props.value
    }
  }
  
  render() {
    const {
      label,
      placeholder,
      onChangeText,
      enablesReturnKeyAutomatically,
      returnKeyType,
      keyboardType,
      autoFocus,
      unit,
      editable
    } = this.props;

    const {
      containerStyle,
      labelStyle,
      inputStyle,
      valueContainerStyle,
      unitLabelStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <View style={valueContainerStyle}>
          <TextInput 
            style={inputStyle}
            placeholder={placeholder}
            autoCorrect={false}
            value={this.state.text}
            onChangeText={(text) => {
              var trimText = text;
              this.setState({text: trimText});
              onChangeText(trimText);
            }}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            autoCapitalize= "none"
            editable= {editable}
            enablesReturnKeyAutomatically= {enablesReturnKeyAutomatically}
            underlineColorAndroid="transparent"
          />
          <Text style={unitLabelStyle}>
            {` ${unit}`}
          </Text>
        </View>
      </View>
    )
  }
}
const styles = {
  containerStyle: {
    height: componentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  labelStyle: {
    textAlignVertical: 'center',
    flex: 2,
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: graphGreyColor,
    marginLeft: scale(10)
  },
  valueContainerStyle: {
    flex: 4,
    flexDirection: 'row',
    marginRight: scale(10),
    justifyContent: 'flex-end',
  },
  inputStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,

  },
  unitLabelStyle: {
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
    textAlignVertical: 'center'
  }
}

export {SettingsTextEntry};