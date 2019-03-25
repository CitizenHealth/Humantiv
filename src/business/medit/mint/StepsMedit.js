import {MeditCoefficients} from '../configuration';

export const getStepMedits = (steps, lastTimestamp, lastValue) => {
  // steps is a time series. Time is a UNIX time and value is the number of steps. 
  // i.e. steps = {
  //  12904673: 2789
  //  12904829: 3012
  // }
  console.log(`MEDIT MINTING: Steps Timestamps START: ${lastTimestamp}: ${lastValue}`);

  let medits = 0;
  let timestamp = lastTimestamp;

  let value = 0;
  for (let index = 0; index < steps.length ; index++) {   
    if (steps[index].time < lastTimestamp) {
      break;
    }
    if (steps[index].time === lastTimestamp) {
      value = lastValue;
    }
    if (steps[index].time > timestamp) {
      timestamp = steps[index].time;
    }
    medits += Math.round((steps[index].value - value)/MeditCoefficients.steps_factor);
  }
  console.log(`MEDIT MINTING: Steps Timestamps END: ${timestamp}: ${medits}`);
  return {
    medits: medits,
    timestamp: timestamp,
    value: (steps.length > 0) ? steps[0].value : 0
  };
}