import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  secondaryGreyColor,
  graphGreyColor, 
  primaryBlueColor
} from '../themes'
import { scale } from "react-native-size-matters";
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {primaryGreyColor} from '../themes/theme';
import {formatTime} from '../../business/Helpers';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsTime extends Component {
  static propTypes = {
    label: PropTypes.string,
    onValidate: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    label: "Time",
    value: formatTime(new Date())
  }
  constructor(props) {
    super(props);

    this.state = {
      text: props.value,
      isDateTimePickerVisible: false
    }
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (time) => {
    console.log('A date has been picked: ', time);
    this.props.onValidate(time);
    this.setState({text: formatTime(time)})
    this.hideDateTimePicker();
  };
  
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
      valueContainerStyle,
      dateStyle,
      buttonTextStyle,
      datePickerContainerStyle
    } = styles;

    return (
      <View style={valueContainerStyle}>
        <TouchableOpacity 
          onPress={this.showDateTimePicker}>
          <Text
            style = {dateStyle}
          >
            {this.state.text}
          </Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          cancelTextStyle={buttonTextStyle}
          confirmTextStyle={buttonTextStyle}
          datePickerContainerStyleIOS={datePickerContainerStyle}
          datePickerModeAndroid="spinner"
          titleIOS="Pick a time"
          titleStyle={buttonTextStyle}
          mode= "time"
        />
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
  datePickerContainerStyle: {
    backgroundColor: 'white'
  },
  containerStyle: {
    height: componentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 1,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  dateStyle: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: primaryGreyColor,
    marginLeft: scale(10)
  },
  labelStyle: {
    flex: 2,
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: graphGreyColor,
    marginLeft: scale(10)
  },
  buttonTextStyle: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: primaryBlueColor
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

export {SettingsTime};