import moment from 'moment';
import { hGraphConvert, calculateHealthScore }  from 'react-native-hgraph';
import healthScores from '../../configuration/healthscore.json';

const HOURS_TO_MILLISECONDS = 3600000;

export const getDailyHealthScore = (activity, sleep, steps, journey) => {
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

export const getHealthScore = (activity, sleep, steps) => {
    var healthData = [];

    if (activity && activity.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'exercise',
        {
          id          : 'activity',
          label       : 'Activity',
          value       : (activity[activity.length -1].value !== undefined) ? activity[activity.length -1].value : 0,
          healthyMin  : healthScores.activity.healthyMin, 
          healthyMax  : healthScores.activity.healthyMax,
          absoluteMin : healthScores.activity.absoluteMin,
          absoluteMax : healthScores.activity.absoluteMax,
          weight      : 5,
          unitLabel   : 'minutes'
        })
      )
    }

    if (sleep && sleep.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'exercise',
        {
          id          : 'sleep',
          label       : 'Sleep',
          value       : (sleep[sleep.length -1].value !== undefined) ? sleep[sleep.length -1].value : 0,
          healthyMin  : healthScores.sleep.healthyMin, 
          healthyMax  : healthScores.sleep.healthyMax,
          absoluteMin : healthScores.sleep.absoluteMin,
          absoluteMax : healthScores.sleep.absoluteMax,
          weight      : 3,
          unitLabel   : 'hours'
        })
      )
    }

    // if (heartrate && heartrate.length > 0 ) {
    //   healthData.push(
    //     hGraphConvert('male', 'exercise',
    //     {
    //       id          : 'heartrate',
    //       label       : 'Heart Rate',
    //       value       : (heartrate[heartrate.length -1].value !== undefined) ? heartrate[heartrate.length -1].value : 0,
    //       healthyMin  : healthScores.heartrate.healthyMin, 
    //       healthyMax  : healthScores.heartrate.healthyMax,
    //       absoluteMin : healthScores.heartrate.absoluteMin,
    //       absoluteMax : healthScores.heartrate.absoluteMax,
    //       weight      : 3,
    //       unitLabel   : 'bpm'
    //     })
    //   )
    // }

    // if (weight && weight.length) {
    //   healthData.push(
    //     hGraphConvert('male', 'exercise',
    //     {
    //       id          : 'weight',
    //       label       : 'Weight',
    //       value       : (weight[weight.length -1].value !== undefined) ? weight[weight.length -1].value : 0,
    //       healthyMin  : healthScores.weight.healthyMin, 
    //       healthyMax  : healthScores.weight.healthyMax,
    //       absoluteMin : healthScores.weight.absoluteMin,
    //       absoluteMax : healthScores.weight.absoluteMax,
    //       weight      : 3,
    //       unitLabel   : 'lbs'
    //     })
    //   )
    // }

    if (steps && steps.length) {
      healthData.push(
        hGraphConvert('male', 'exercise',
        {
          id          : 'steps',
          label       : 'Steps',
          value       : (steps[steps.length -1].value !== undefined) ? steps[steps.length -1].value : 0,
          healthyMin  : healthScores.steps.healthyMin, 
          healthyMax  : healthScores.steps.healthyMax,
          absoluteMin : healthScores.steps.absoluteMin,
          absoluteMax : healthScores.steps.absoluteMax,
          weight      : 5,
          unitLabel   : 'steps'
        })
      )
    }

    // The healthscore represents the score for the user health data since last sync
    return  {healthData: healthData, healthScore: (healthData.length === 0) ? 0 : Math.floor(calculateHealthScore(healthData))};  
}

export const needToSaveHealthScore = (scores) => {

  if (scores.length <= 0) {
    return true;
  }
  
  let currentTime = moment();
  let lastScoreTime = moment.unix(scores[scores.length-1].time);

  duration = moment.duration(currentTime.diff(lastScoreTime));
  durationMillisecond = duration.asMilliseconds();
  durationHours = durationMillisecond/HOURS_TO_MILLISECONDS
  if (durationHours > 24) {
    return true;
  }
  return false;
}

export const isTwentyFourHours = (unixTime1, unixTime2) => {
  
  let time1 = moment.unix(unixTime1);
  let time2 = moment.unix(unixTime2);

  let duration = moment.duration(time1.diff(time2));
  durationMillisecond = duration.asMilliseconds();
  durationHours = durationMillisecond/HOURS_TO_MILLISECONDS
  if (durationHours > 24) {
    return true;
  }
  return false;
}
