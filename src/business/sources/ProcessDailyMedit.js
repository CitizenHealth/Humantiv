
const STEPS_FACTOR = 10;
const SLEEP_FACTOR = 20;
const SLEEP_MINIMUM = 360 // minutes
const ACTIVITY_FACTOR = 0.5;
const MINUTES_IN_HOUR = 60;

export const processDailyMedit = (meditTimestamp, meditTimestampValue, steps, activity, sleep) => {
  // steps, activities, and sleeps are a time series. Time is a UNIX time and value is the number of steps. 
  // i.e. steps = {
  //  12904673: 2789
  //  12904829: 3012
  // }
  
  let dailyMedits = [];

  // This algorithm can be optimized greatly but as this is an MVP and time is critical, I am opting for simplicity 
  // and development speed
  let localSteps = steps.reverse();
  let localSleep = sleep.reverse();
  let localActivity = activity.reverse();

  // Traverse the 3 arrays (steps, sleep, activity) by time and calculate the daily medit for each day
  let stepsIndex = 0;
  let activityIndex = 0;
  let sleepIndex = 0; 
  
  let seriesNumber = 0;

  while (localSteps.length > stepsIndex && 
         localSleep.length > sleepIndex && 
         localActivity.length > activityIndex ) { 
           
    let oldestDay = Math.min(localSteps[stepsIndex].time, localSleep[sleepIndex].time, localActivity[activityIndex].time);

    let medit = 0;
    let timeStamp = 0;

    if (localSteps[stepsIndex].time === oldestDay) {
      medit += Math.round(localSteps[stepsIndex].value/STEPS_FACTOR);
      stepsIndex++;
    }

    if (localSleep[sleepIndex].time === oldestDay) {
      let sleepMinutes = localSleep[sleepIndex].value*MINUTES_IN_HOUR;
      if (sleepMinutes >= SLEEP_MINIMUM) {
        medit += Math.round(sleepMinutes/SLEEP_FACTOR);
      }
      sleepIndex++;
    }

    if (localActivity[activityIndex].time === oldestDay) {
      medit += Math.round(localActivity[activityIndex].value/ACTIVITY_FACTOR);
      activityIndex++;
    }

    // Skip measurements already processed before
    if (meditTimestamp && oldestDay < meditTimestamp) {
      continue;
    }

    if (meditTimestamp && 
      oldestDay === meditTimestamp &&
      localSteps.length > stepsIndex && 
      localSleep.length > sleepIndex && 
      localActivity.length > activityIndex) {
      medit = medit - meditTimestampValue;
    }

    dailyMedits.push({
      medit: medit,
      timestamp: Math.round((new Date()).getTime() / 1000),
      time: oldestDay
    });
  }
  steps.reverse();
  activity.reverse();
  sleep.reverse();
  
  return {
    dailyMedits: dailyMedits.reverse(),
    meditTimeStamp: (dailyMedits.length > 0) ? dailyMedits[0].time : undefined,
    meditTimeStampValue:  (dailyMedits.length > 0) ? dailyMedits[0].medit : undefined,
  };
}