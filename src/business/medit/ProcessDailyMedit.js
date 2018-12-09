
import {MeditCoefficients} from './configuration';

const MINUTES_IN_HOUR = 60;

export const processDailyMedit = (meditTimestamp, meditTimestampValue, steps, activity, sleep) => {
  // steps, activities, and sleeps are a time series. Time is a UNIX time and value is the number of steps. 
  // i.e. steps = {
  //  12904673: 2789
  //  12904829: 3012
  //  ...
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

  while (localSteps.length > stepsIndex || 
         localSleep.length > sleepIndex || 
         localActivity.length > activityIndex ) { 
    
    let stepsTime =  (localSteps.length > stepsIndex) ? localSteps[stepsIndex].time  : Math.min();
    let sleepTime =  (localSleep.length > sleepIndex) ? localSleep[sleepIndex].time  : Math.min();
    let activityTime =  (localActivity.length > activityIndex) ? localActivity[activityIndex].time  : Math.min();

    let oldestDay = Math.min(stepsTime, sleepTime, activityTime);

    let medit = 0;

    if (stepsTime === oldestDay) {
      medit += Math.round(localSteps[stepsIndex].value/MeditCoefficients.steps_factor);
      stepsIndex++;
    }

    if (sleepTime === oldestDay) {
      let sleepMinutes = localSleep[sleepIndex].value*MINUTES_IN_HOUR;
      if (sleepMinutes >= MeditCoefficients.sleep_minimum) {
        medit += Math.round(sleepMinutes/MeditCoefficients.sleep_factor);
      }
      sleepIndex++;
    }

    if (activityTime === oldestDay) {
      medit += Math.round(localActivity[activityIndex].value/MeditCoefficients.activity_factor);
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