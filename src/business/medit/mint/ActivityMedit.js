import {MeditCoefficients} from '../configuration';

export const getActivityMedits = (activities, lastTimestamp, lastValue) => {
  // activity is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 30
  //  12904829: 26
  // }
  console.log(`MEDIT MINTING: Activity Timestamps START: ${lastTimestamp}: ${lastValue}`);

  let medits = 0;
  let timestamp = lastTimestamp;

  let value = 0;
  for (let index = 0; index < activities.length ; index++) {
    if (activities[index].time < lastTimestamp) {
      break;
    }
    if (activities[index].time === lastTimestamp) {
      value = lastValue;
    }
    if (activities[index].time > timestamp) {
      timestamp = activities[index].time;
    }
    medits += Math.round((activities[index].value - value)/MeditCoefficients.activity_factor);
  }
  console.log(`MEDIT MINTING: Activity Timestamps END: ${timestamp}: ${medits}`);

  return {
    medits: medits,
    timestamp: timestamp,
    value: (activities.length > 0) ? activities[0].value : 0
  };
}


