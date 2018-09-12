
const STEPS_FACTOR = 10;
const SLEEP_FACTOR = 20;
const SLEEP_MINIMUM = 360 // minutes
const ACTIVITY_FACTOR = 0.5;
const MINUTES_IN_HOUR = 60;

export const getStepMedits = (steps, lastTimestamp, lastValue) => {
  // steps is a time series. Time is a UNIX time and value is the number of steps. 
  // i.e. steps = {
  //  12904673: 2789
  //  12904829: 3012
  // }
  
  // Temporary fix for the 1.12 Medit generation problem
  // If timestamp is between 1535698800 (8/31/2018-00:00:00 PST) and 
  // 1536822000 (9/13/2018-00:00:00 PST)
  if (lastTimestamp >= 1535698800 && lastTimestamp <= 1536822000) {
    lastTimestamp = 1535698800;
  }
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
    medits += Math.round((steps[index].value - value)/STEPS_FACTOR);
  }
  return {
    medits: medits,
    timestamp: timestamp,
    value: (steps.length > 0) ? steps[0].value : 0
  };
}

export const getActivityMedits = (activities, lastTimestamp, lastValue) => {
  // activity is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 30
  //  12904829: 26
  // }
  
  // Temporary fix for the 1.12 Medit generation problem
  // If timestamp is between 1535698800 (8/31/2018-00:00:00 PST) and 
  // 1536822000 (9/13/2018-00:00:00 PST)
  if (lastTimestamp >= 1535698800 && lastTimestamp <= 1536822000) {
    lastTimestamp = 1535698800;
  }

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
    medits += Math.round((activities[index].value - value)/ACTIVITY_FACTOR);
  }
  return {
    medits: medits,
    timestamp: timestamp,
    value: (activities.length > 0) ? activities[0].value : 0
  };
}

export const getSleepMedits = (sleeps, lastTimestamp, lastValue) => {
  // sleep is a time series. Time is a UNIX time and value is the number of minutes. 
  // i.e. steps = {
  //  12904673: 360
  //  12904829: 480
  // }
  
  // Temporary fix for the 1.12 Medit generation problem
  // If timestamp is between 1535698800 (8/31/2018-00:00:00 PST) and 
  // 1536822000 (9/13/2018-00:00:00 PST)
  if (lastTimestamp >= 1535698800 && lastTimestamp <= 1536822000) {
    lastTimestamp = 1535698800;
  }
  
  let medits = 0;
  let timestamp = lastTimestamp;

  let value = 0;
  for (let index = 0; index < sleeps.length ; index++) {
    if (sleeps[index].time < lastTimestamp) {
      break;
    }
    if (sleeps[index].time === lastTimestamp) {
      value = lastValue*MINUTES_IN_HOUR;
    }
    if (sleeps[index].time > timestamp) {
      timestamp = sleeps[index].time;
    }
    let sleepMinutes = sleeps[index].value*MINUTES_IN_HOUR;
    if (sleepMinutes >= SLEEP_MINIMUM) {
      medits += Math.round((sleepMinutes-value)/SLEEP_FACTOR);
    }
  }
  return {
    medits: medits,
    timestamp: timestamp,
    value: (sleeps.length > 0) ? sleeps[0].value : 0
  };
}

export const getHeartRateMedits = (heartrates, lastTimestamp) => {
  return 0;
}


