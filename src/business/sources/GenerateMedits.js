
const STEPS_FACTOR = 10;
const SLEEP_FACTOR = 20;
const SLEEP_MINIMUM = 360 // minutes
const ACTIVITY_FACTOR = 0.5;
const MINUTES_IN_HOUR = 60;

export const getStepMedits = (steps, lastTimestamp) => {
  // steps is a time series. Time is a UNIX time and value is the number of steps. 
  // i.e. steps = {
  //  12904673: 2789
  //  12904829: 3012
  // }
  
  let medits = 0;
  let timestamp = lastTimestamp;

  for (let index = 0; index < steps.length ; index++) {
    if (steps[index].time <= lastTimestamp) {
      break;
    }
    if (steps[index].time > timestamp) {
      timestamp = steps[index].time;
    }
    medits += Math.round(steps[index].value/STEPS_FACTOR);
  }
  return {
    medits: medits,
    timestamp: timestamp
  };
}

export const getActivityMedits = (activities, lastTimestamp) => {
  // activity is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 30
  //  12904829: 26
  // }

  let medits = 0;
  let timestamp = lastTimestamp;

  for (let index = 0; index < activities.length ; index++) {
    if (activities[index].time <= lastTimestamp) {
      break;
    }
    if (activities[index].time > timestamp) {
      timestamp = activities[index].time;
    }
    medits += Math.round(activities[index].value/ACTIVITY_FACTOR);
  }
  return {
    medits: medits,
    timestamp: timestamp
  };
}

export const getSleepMedits = (sleeps, lastTimestamp) => {
  // sleep is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 360
  //  12904829: 480
  // }
  
  let medits = 0;
  let timestamp = lastTimestamp;

  for (let index = 0; index < sleeps.length ; index++) {
    if (sleeps[index].time <= lastTimestamp) {
      break;
    }
    if (sleeps[index].time > timestamp) {
      timestamp = sleeps[index].time;
    }
    let sleepMinutes = sleeps[index].value*MINUTES_IN_HOUR;
    if (sleepMinutes >= SLEEP_MINIMUM) {
      medits += Math.round((sleepMinutes-SLEEP_MINIMUM)/SLEEP_FACTOR);
    }
  }
  return {
    medits: medits,
    timestamp: timestamp
  };
}

export const getHeartRateMedits = (heartrates, lastTimestamp) => {
  return 0;
}


