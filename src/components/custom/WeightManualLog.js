import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Units } from '../themes';
import {
  SettingsDate,
  SettingsTime,
  SettingsTextEntry,
  SettingsChoice
} from '../common'
import { 
  View
} from "react-native";
import {Header} from '../common/Header';

class WeightManualLog extends Component {
  static propTypes = {
    onValidate: PropTypes.func,
    value: PropTypes.number,
    unit: PropTypes.string,
  }

  static defaultProps = {
    value: 0.0,
    unit: Units.Weight.Pounds
  }

  constructor(props) {
    super(props);

    this.state = {
      unit: Units.Weight.Pounds
    }
  }

  render() {
    const {
      containerStyle,
      timeContainerStyle,
      entryStyle,
      dateContainer
    } = styles;

    return (
      <View
        style={containerStyle}
      >
        <View
          style={dateContainer}
        >
          <SettingsDate
            style = {entryStyle}
            label="Date"
            value="Today"
            onValidate={(date) => {console.log(`Change Date: ${date}`)}}
          />
        </View>
        <View
          style={dateContainer}
        >
          <SettingsTime
            style = {entryStyle}
            label="Time"
            onValidate={(time) => {console.log(`Change Date: ${time}`)}}
          />
        </View>
        <View
          style={timeContainerStyle}
        >
          < SettingsTextEntry
            style = {{flex: 1}}
            label="Weight"
            placeholder=""
            onChangeText= {(text) => {console.log("text")}}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            keyboardType="numeric"
            autoFocus={false}
            value="83"
            unit={this.state.unit}
            missing=""
          />
          < SettingsChoice
            label=""
            style={{width: 150}}
            textStyle={{width: 150}}
            onSelect= {
              (value, label) => {this.setState({unit: Units.Weight[label]})}
            }
            value = {(this.state.unit == Units.Weight.Pounds) ? "Pounds" : "Kilograms"}
            choices = {["Kilograms","Pounds"]}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  dateContainer: {
    alignItems: 'center',
  },
  containerStyle: {
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  timeContainerStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
}
export {WeightManualLog};