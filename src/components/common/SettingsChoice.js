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
import PropTypes from 'prop-types';
import { scale } from "react-native-size-matters";
import {Select, Option} from "react-native-chooser";
import {primaryGreyColor} from '../themes/theme';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsChoice extends Component {

  static propTypes = {
    label: PropTypes.string,
    choices: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    label: "",
    choices: [],
    value: ""
  }
 
  constructor(props) {
    super(props);

    this.state = {
      value : (props.choices.includes(props.value)) ? 
      props.value : props.choices[0]
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value : (nextProps.choices.includes(nextProps.value)) ? 
      nextProps.value : nextProps.choices[0]
    });
  }

  renderLabel() {
    const {label} = this.props;
    const {labelStyle} = styles;

    if (label !== "" ) {
      return(
      <Text style={labelStyle}>
       {label}
      </Text>
      )
    }
  }

  render() {
    const {
      label,
      choices,
      onChangeChoice,
      value,
      style,
      textStyle
    } = this.props;

    const {
      containerStyle,
      labelStyle,
      inputStyle
    } = styles;
    
    return(
      <View style={[containerStyle, style]}>
        {this.renderLabel()}
        <Select
            onSelect = {(value, label) => {
              this.setState({value : value});
              this.props.onSelect(value, label);
            }}
            defaultText  = {this.state.value}
            textStyle = {[inputStyle, textStyle]}
            transparent = {true}
            backdropStyle = {{
              borderWidth: 1,
              shadowOffset:{  width: 3,  height: 3,  },
              shadowColor: '#000',
              shadowOpacity: 0.4,
              borderRadius: 3,
              shadowColor: "#000",
              borderColor: "#ddd",
            }}
            style = {{
              borderWidth: 0        
            }}
            optionListStyle = {{
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: "center",
              backgroundColor: "#fff",
              height: 45*choices.length
            }}
          >
          {this.props.choices.map((choice, index) =>{
            return (
              <Option
               styleText = {[labelStyle, {textAlign: 'center'}]}
               value = {choice}
               key = {index}
              >
                {choice}
              </Option>
            );
          })}
        </Select>
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
    elevation: 1,
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
  inputStyle: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
  }
}

export {SettingsChoice};