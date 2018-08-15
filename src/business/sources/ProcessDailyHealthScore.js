import {getDailyHealthScore} from "./CalculateHealthScore";

export const processDailyHealthScore = (scores, scoreTimestamp, healthscore, total, steps, activity, sleep) => {
   
  let dailyHealthScores = [];

  // This algorithm can be optimized greatly but as this is an MVP and time is critical, I am opting for simplicity 
  // and development speed
  let localSteps = steps.reverse();
  let localSleep = sleep.reverse();
  let localActivity = activity.reverse();

  // Traverse the 3 arrays (steps, sleep, activity) by time and calculate the daily medit for each day
  let stepsIndex = 0;
  let activityIndex = 0;
  let sleepIndex = 0; 

  let localTotal = total;
  let localHealthscore = healthscore;

  while (localSteps.length > stepsIndex && 
         localSleep.length > sleepIndex && 
         localActivity.length > activityIndex ) { 
           
    let oldestDay = Math.min(localSteps[stepsIndex].time, localSleep[sleepIndex].time, localActivity[activityIndex].time);

    let dailySteps = 0;
    let dailyActivity = 0;
    let dailySleep = 0

    if (localSteps[stepsIndex].time === oldestDay) {
      dailySteps += localSteps[stepsIndex].value;
      stepsIndex++;
    }

    if (localSleep[sleepIndex].time === oldestDay) {
      dailySleep += localSleep[sleepIndex].value;
      sleepIndex++;
    }

    if (localActivity[activityIndex].time === oldestDay) {
      dailyActivity += localActivity[activityIndex].value;
      activityIndex++;
    }

    // Skip measurements already processed before
    if (scoreTimestamp && oldestDay < scoreTimestamp) {
      continue;
    }

    let score = getDailyHealthScore(dailyActivity, dailySleep, dailySteps, "journey placeholder");

    if (scoreTimestamp && oldestDay > scoreTimestamp
        || !scoreTimestamp) {
      localHealthscore = (localHealthscore*localTotal + score)/(localTotal + 1);
      localTotal++;
    } else if (scoreTimestamp) {
      if (scores.history && scores.history.length !== 0) {
        let keys = Object.keys(scores.history);
        let index = keys.indexOf(`${scoreTimestamp}`)-1;
        let time = keys[index];
        localHealthscore = ( scores.history[time]*(localTotal-1) + score)/(localTotal);
      }
    }

    dailyHealthScores.push({
      score: localHealthscore,
      timestamp: Math.round((new Date()).getTime() / 1000),
      time: oldestDay
    });
  }

  steps.reverse();
  activity.reverse();
  sleep.reverse();
  
  return {
    dailyHealthScores: dailyHealthScores.reverse(),
    scoreTimeStamp: (dailyHealthScores.length > 0) ? dailyHealthScores[0].time : undefined,
    healthscore: localHealthscore,
    total: localTotal
  };
}