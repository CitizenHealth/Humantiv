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
  secondaryGreyColor,
  graphGreyColor, 
  primaryBlueColor,
  graphRedColor
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
    value: PropTypes.string,
    missing: PropTypes.string
  }

  static defaultProps = {
    label: "Label",
    placeholder: "",
    enablesReturnKeyAutomatically: false,
    autoFocus: false,
    unit: "Units",
    editable: true,
    value: "Value",
    missing: ""
  }
  constructor(props) {
    super(props);

    this.state = {
      text: props.value,
      missing: props.missing
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.value,
      missing: nextProps.missing
    });
  }
  
  renderTextArea() {
    const {
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
      inputStyle,
      valueContainerStyle,
      unitLabelStyle
    } = styles;

    return (
      <View style={valueContainerStyle}>
        <TextInput 
          style={[
            inputStyle,
            {
              color: (this.state.missing === "") ? highlightedGreyColor : graphRedColor
            }]}
          placeholder={placeholder}
          autoCorrect={false}
          value={(this.state.missing === "") ? this.state.text : this.state.missing }
          onChangeText={(text) => {
            var trimText = text;
            if (text !== "") {
              if (this.state.missing !== "") {
                this.setState({missing: ""})
                trimText = trimText.substr(trimText.length-1, 1)
              }
            } else {
              this.setState({missing: this.props.missing})
            }
            
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
          {(this.state.missing === "") ? ` ${unit}` : ""}
        </Text>
      </View>
    );
  }
  render() {
    const {
      label
    } = this.props;

    const {
      containerStyle,
      labelStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
        <Text style={labelStyle}>
          {label}
        </Text>
        {this.renderTextArea()}
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