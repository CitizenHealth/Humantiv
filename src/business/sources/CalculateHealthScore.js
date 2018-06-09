import { hGraphConvert, calculateHealthScore }  from 'react-native-hgraph';


export const getHealthScore = (activity, sleep, weight, heartrate) => {
    var healthData = [];

    if (activity && activity.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'Activity',
        {
          id          : 'exercise',
          label       : 'Activity',
          value       : (activity[activity.length -1].value !== undefined) ? activity[activity.length -1].value : 0,
          healthyMin  : 2000, 
          healthyMax  : 10000,
          absoluteMin : 1,
          absoluteMax : 10000,
          weight      : 5,
          unitLabel   : 'steps'
        })
      )
    }

    if (sleep && sleep.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'Activity',
        {
          id          : 'sleep',
          label       : 'Sleep',
          value       : (sleep[sleep.length -1].value !== undefined) ? sleep[sleep.length -1].value : 0,
          healthyMin  : 7, 
          healthyMax  : 12,
          absoluteMin : 0.1,
          absoluteMax : 24,
          weight      : 3,
          unitLabel   : 'hours'
        })
      )
    }

    if (heartrate && heartrate.length > 0 ) {
      healthData.push(
        hGraphConvert('male', 'Activity',
        {
          id          : 'heartrate',
          label       : 'Heart Rate',
          value       : (heartrate[heartrate.length -1].value !== undefined) ? heartrate[heartrate.length -1].value : 0,
          healthyMin  : 50, 
          healthyMax  : 120,
          absoluteMin : 20,
          absoluteMax : 200,
          weight      : 3,
          unitLabel   : 'bpm'
        })
      )
    }

    if (weight && weight.length) {
      healthData.push(
        hGraphConvert('male', 'Activity',
        {
          id          : 'weight',
          label       : 'Weight',
          value       : (weight[weight.length -1].value !== undefined) ? weight[weight.length -1].value : 0,
          healthyMin  : 120, 
          healthyMax  : 190,
          absoluteMin : 1,
          absoluteMax : 1000,
          weight      : 3,
          unitLabel   : 'lbs'
        })
      )
    }

    return  {healthData: healthData, healthScore: Math.floor(calculateHealthScore(healthData))};  
}
