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

  while (localSteps.length > stepsIndex || 
         localSleep.length > sleepIndex || 
         localActivity.length > activityIndex ) { 
           
    let stepsTime =  (localSteps.length > stepsIndex) ? localSteps[stepsIndex].time  : Math.min();
    let sleepTime =  (localSleep.length > sleepIndex) ? localSleep[sleepIndex].time  : Math.min();
    let activityTime =  (localActivity.length > activityIndex) ? localActivity[activityIndex].time  : Math.min();
      
    let oldestDay = Math.min(stepsTime, sleepTime, activityTime);

    let dailySteps = 0;
    let dailyActivity = 0;
    let dailySleep = 0

    if (stepsTime === oldestDay) {
      dailySteps += localSteps[stepsIndex].value;
      stepsIndex++;
    }

    if (sleepTime === oldestDay) {
      dailySleep += localSleep[sleepIndex].value;
      sleepIndex++;
    }

    if (activityTime === oldestDay) {
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