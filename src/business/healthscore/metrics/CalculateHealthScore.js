import { 
  hGraphConvert, 
  calculateHealthScore 
}  from 'react-native-hgraph';
import healthScores from '../configuration/healthscore.json';

// Returns an object:
// {
//   healthData: // 
//   healthScore: // The user healthScore
// }
// 
export const getHealthScore = (steps, activity, sleep) => {
    var healthData = [];

    if (activity && activity.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'exercise',
        {
          id          : 'activity',
          label       : 'Activity',
          value       : (activity[0].value !== undefined) ? activity[0].value : 0,
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
          value       : (sleep[0].value !== undefined) ? sleep[0].value : 0,
          healthyMin  : healthScores.sleep.healthyMin, 
          healthyMax  : healthScores.sleep.healthyMax,
          absoluteMin : healthScores.sleep.absoluteMin,
          absoluteMax : healthScores.sleep.absoluteMax,
          weight      : 3,
          unitLabel   : 'hours'
        })
      )
    }

    if (steps && steps.length) {
      healthData.push(
        hGraphConvert('male', 'exercise',
        {
          id          : 'steps',
          label       : 'Steps',
          value       : (steps[0].value !== undefined) ? steps[0].value : 0,
          healthyMin  : healthScores.steps.healthyMin, 
          healthyMax  : healthScores.steps.healthyMax,
          absoluteMin : healthScores.steps.absoluteMin,
          absoluteMax : healthScores.steps.absoluteMax,
          weight      : 4,
          unitLabel   : 'steps'
        })
      )
    }

    // The healthscore represents the score for the user health data since last sync
    return  {
      healthData: healthData, 
      healthScore: (healthData.length === 0) ? 0 : Math.floor(calculateHealthScore(healthData))
    };  
}

// const calculateHealthScore = (data) => {
//   // TODO: Review score calcs
//   let totalWeight = 0;
//   data.map(d => {
//     totalWeight += d.weight;
//   });

//   // if (totalWeight !== 100) {
//   //   throw "Total weight of values does not equal 100%";
//   // }

//   let scoreTotal = 0;

//   data.map(d => {
//     const score = calculateScoreFromMetric(d);
//     const weightPercentage = d.weight / totalWeight;
//     const weightedScore = weightPercentage * score;
//     scoreTotal += weightedScore;
//   });

//   return scoreTotal * 100;
// }

// const calculateScoreFromMetric = (metric) => {
//   let scale;

//   // TODO: Review score calcs
//   if (metric.value > metric.healthyMax) {
//     // if it's high, healthyMax to absoluteMax, 1 to 0
//     scale = scaleLinear()
//       .domain([metric.healthyMax, metric.absoluteMax])
//       .range([1, 0]);
//   } else if (metric.value < metric.healthyMin) {
//     // if it's low, healthyMin to absolute Min, 1 to 0
//     scale = scaleLinear()
//       .domain([metric.healthyMin, metric.absoluteMin])
//       .range([1, 0]);
//   } else {
//     // if it's healthy, perfect score
//     return 1;
//   }

//   return scale(metric.value);
// }

// const scaleSigmoid = (scale) => {
//   var domain = scale.domain;
//   var range = scale.range;


// }