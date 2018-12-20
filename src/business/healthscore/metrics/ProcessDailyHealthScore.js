const MAXIUM_SCORED_DAYS = 90;

import healthScores from '../configuration/healthscore.json';

// Returns an object
// {
//   dailyHealthScores: array of previous daily health scores,
//   scoreTimeStamp: Latest daily health score time stamp,
//   healthscore: latest daily health score,
//   total: total days with scores
// }
export const processDailyHealthScore = (scores, scoreTimestamp, healthscore, steps, activity, sleep) => {
   
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

  let scoreHistoryLength = (scores.history) ? scores.history.length : 0;
  let localTotal = Math.min(scoreHistoryLength, MAXIUM_SCORED_DAYS);
  let localHealthscore = healthscore;

  while (localSteps.length > stepsIndex || 
         localSleep.length > sleepIndex || 
         localActivity.length > activityIndex ) { 
           
    // Math.min() is always smaller than any number
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
    
    // We make sure to update the last day measured as it might be easured early in the day before the data was collected for the whole day.
    if (scoreTimestamp && oldestDay > scoreTimestamp
        || !scoreTimestamp) {
      localHealthscore = (localHealthscore*localTotal + score)/(localTotal + 1);
      localTotal++;
    } else if (scoreTimestamp) {
      if (scores.history && scores.history.length !== 0) {
        let keys = Object.keys(scores.history);
        let index = keys.indexOf(`${scoreTimestamp}`)-1;
        // This check is done to avoid empty days
        if (index>=0) {
          let time = keys[index];
          localHealthscore = ( scores.history[time]*(localTotal-1) + score)/(localTotal);
        } else {
          localHealthscore = 0;
        }
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
  };
}

const getDailyHealthScore = (activity, sleep, steps, journey) => {
  // This is the function that has all the logic of calculating the daily health score

  let stepsScore = getMetricScore(
    steps, 
    healthScores.steps.absoluteMin, 
    healthScores.steps.healthyMin, 
    healthScores.steps.healthyMax, 
    healthScores.steps.absoluteMax
  );
  let activityScore = getMetricScore(
    activity, 
    healthScores.activity.absoluteMin, 
    healthScores.activity.healthyMin, 
    healthScores.activity.healthyMax, 
    healthScores.activity.absoluteMax
  );
  let sleepScore = getMetricScore(
    sleep, 
    healthScores.sleep.absoluteMin, 
    healthScores.sleep.healthyMin, 
    healthScores.sleep.healthyMax, 
    healthScores.sleep.absoluteMax
  );

  let stepsWeight = getMetricWeight("steps", journey)
  let activityWeight = getMetricWeight("activity", journey)
  let sleepWeight = getMetricWeight("sleep", journey)
  
  return (stepsWeight*stepsScore + activityWeight*activityScore + sleepWeight*sleepScore)/(stepsWeight + activityWeight + sleepWeight);
}

const getMetricScore =  (metric, absoluteMin, healthyMin, healthyMax, absoluteMax) => {
  let metricScore = 0;

  if (metric) {
    // 
    if (metric < absoluteMin || metric > absoluteMax) {
      metricScore = 0;
    }
    if (metric >= healthyMin && metric <= healthyMax) {
      metricScore = 100;
    }
    if (metric >= absoluteMin && metric < healthyMin) {
      metricScore = 100 * (metric - absoluteMin)/(healthyMin - absoluteMin);;
    }
    if (metric > healthyMax && metric <= absoluteMax) {
      metricScore = 100 * (metric - absoluteMax)/(healthyMax - absoluteMax);
    }
  }
  return metricScore;
}

const getMetricWeight =  (metric, journey) => {
  let metricWeight = 0;

  switch (metric) {
    case "steps": 
      metricWeight = 4;
      break;
    case "activity": 
      metricWeight = 8;
      break;
    case "sleep": 
      metricWeight = 6;
      break;
    default: 
      metricWeight = 4;
      break;
  }
  return metricWeight; 
}

