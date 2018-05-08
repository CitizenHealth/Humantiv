import React, {Component} from 'react';
import {
  View,
  Switch,
  Text,
  Dimensions,
  Platform
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

class SettingsSwitch extends Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
  }

  static defaultProps = {
    label: "",
    value: false
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value : nextProps.value
    });
  }

  renderSwitch() {
    const {switchStyle} = styles;

    return (
      (Platform.OS == 'ios') ?
        <Switch
          onTintColor= {primaryBlueColor}
          onValueChange={(value) => {
            this.setState({value});
            this.props.onValueChange(value);
          }}
          value={this.state.value}
          style = {switchStyle}
        />
        : 
        <Switch
          onTintColor= {primaryBlueColor}
          thumbTintColor='#fff'
          onValueChange={(value) => {
            this.setState({value});
            this.props.onValueChange(value);
          }}
          value={this.state.value}
          style = {switchStyle}
        />
    );
  }

  render() {
    const {
      label,
      on
    } = this.props;

    const {
      containerStyle,
      labelStyle,
      inputStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
        <Text style={labelStyle}>
          {label}
        </Text>
        {this.renderSwitch()}
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
  inputStyle: {
    flex: 4,
    justifyContent: 'flex-end',
    textAlign: 'right',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor,
  },
  switchStyle: {
    marginRight: scale(10)
  }
  
}

export {SettingsSwitch};