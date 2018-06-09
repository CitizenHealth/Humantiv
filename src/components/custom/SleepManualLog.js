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
import {
  formatTime,
  timeBetweenDates,
  formatHoursMinutes
} from '../../business/Helpers';
import Moment from 'moment';

class SleepManualLog extends Component {
  static propTypes = {
    onValidate: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  static defaultProps = {
    value: new Date(0, 0, 0, 0, 0, 0, 0)
  }

  constructor(props) {
    super(props);

    this.state = {
      unit: Units.Weight.Pounds,
      start_time: new Date(),
      end_time: new Date(),
      time: props.value,
      day: new Date()
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
            label="Day"
            onValidate={
              (day) => {
              this.setState({
                day: day
              });
              this.props.onValidate(day, `${formatHoursMinutes(this.state.time)}`);
            }
          }
          />
        </View>
        <View
          style={dateContainer}
        >
          <SettingsTime
            style = {entryStyle}
            label="Bed Time"
            onValidate={
              (time) => {
              this.setState({
                start_time: time,
                time: timeBetweenDates(this.state.end_time,time)
              });
              this.props.onValidate(this.state.day, `${formatHoursMinutes(this.state.time)}`);
            }
          }
          />
        </View>
        <View
          style={dateContainer}
        >
          <SettingsTime
            style = {entryStyle}
            label="Wake Up Time"
            onValidate={
              (time) => {
                this.setState({
                  end_time: time,
                  time: timeBetweenDates(time,this.state.start_time)
                });
                this.props.onValidate(this.state.day, `${formatHoursMinutes(this.state.time)}`);
              }
            }
          />
        </View>
        <View
          style={timeContainerStyle}
        >
          <SettingsTextEntry
            style = {{flex: 1}}
            label=""
            placeholder=""
            onChangeText= {(text) => {console.log("text")}}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            keyboardType="numeric"
            autoFocus={false}
            enabled={false}
            value={`${formatHoursMinutes(this.state.time)}`}
            unit=""
            missing=""
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
export {SleepManualLog};