
import {MeditCoefficients} from '../configuration';
const MINUTES_IN_HOUR = 60;

export const getSleepMedits = (sleeps, lastTimestamp, lastValue) => {
  // sleep is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 360
  //  12904829: 480
  // }
    
  let medits = 0;
  let timestamp = lastTimestamp;

  let value = 0;
  for (let index = 0; index < sleeps.length ; index++) {
    if (sleeps[index].time < lastTimestamp) {
      break;
    }
    if (sleeps[index].time === lastTimestamp) {
      value = lastValue*MINUTES_IN_HOUR-MeditCoefficients.sleep_minimum;
    }
    if (sleeps[index].time > timestamp) {
      timestamp = sleeps[index].time;
    }
    let sleepMinutes = sleeps[index].value*MINUTES_IN_HOUR;
    if (sleepMinutes >= MeditCoefficients.sleep_minimum) {
      medits += Math.round((sleepMinutes-MeditCoefficients.sleep_minimum-value)/MeditCoefficients.sleep_factor);
    }
  }
  return {
    medits: medits,
    timestamp: timestamp,
    value: (sleeps.length > 0) ? sleeps[0].value : 0
  };
}
