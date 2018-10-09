import axios from 'axios';
import moment from 'moment';
import {
  convertMinutesToHours,
  convertSecondsToMinutes
} from '../Helpers';
import convert from 'convert-units';
import AppleHealthKit from 'rn-apple-healthkit';

const MAX_SERIES_NUMBER = 30;

export const getNativeActivityTimeSeries = () => {
  let options = {
    startDate: (new Date(2016,10,1)).toISOString()
  };


  return new Promise( (resolve, reject) => {
    AppleHealthKit.getAppleExerciseTime(options: Object, (err: Object, results: Object) => {
      if (err) {
          return;
      }
      let val = [];

      for (var index = 0; index< Math.min(results.length,MAX_SERIES_NUMBER); index++) {
        let item = results[index];

        let startDateUnix = moment(item.startDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()
        let endDateUnix = moment(item.endDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()

        let value = item.value;

        let time_series = {
          timestamp: moment(new Date()).unix(),
          time: moment(item.startDate, "YYYY-MM-DD").unix(),
          value: value,
          source: "Apple Health"
        }
        val.push(time_series);
      }
      console.log(results)
      resolve(val);
    });
  })
}

export const getNativeStepsTimeSeries = () => {
  let options = {
    startDate: (new Date(2016,10,1)).toISOString()
  };


  return new Promise( (resolve, reject) => {
    AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
      if (err) {
          return;
      }
      let val = [];

      for (var index = 0; index< Math.min(results.length,MAX_SERIES_NUMBER) ; index++) {
        let item = results[index];

        let startDateUnix = moment(item.startDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()
        let endDateUnix = moment(item.endDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()

        let time_series = {
          timestamp: moment(new Date()).unix(),
          time: moment(item.startDate, "YYYY-MM-DD").unix(),
          value: item.value,
          source: "Apple Health"
        }
        val.push(time_series);
      }
      console.log(results)
      resolve(val);
    });
  })
}

export const getNativeSleepTimeSeries = () => {
  let options = {
    startDate: (new Date(2016,10,1)).toISOString(),
    endDate: (new Date()).toISOString(), // optional; default now
    limit:10, // optional; default no limit
  };


  return new Promise( (resolve, reject) => {
    AppleHealthKit.getSleepSamples(options, (err, results) => {
      if (err) {
          return;
      }
      let val = [];

      for (var index = 0; index< Math.min(results.length,MAX_SERIES_NUMBER); index++) {
        let item = results[index];

        let startDateUnix = moment(item.startDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()
        let endDateUnix = moment(item.endDate, "YYYY-MM-DDThh:mm:ss.SSSZ").unix()

        let duration = (endDateUnix-startDateUnix)/60;

        let time_series = {
          timestamp: moment(new Date()).unix(),
          time: moment(item.startDate, "YYYY-MM-DD").unix(),
          value: convertMinutesToHours(duration),
          source: "Apple Health"
        }
        val.push(time_series);
      }
      console.log(results)
      resolve(val);
    });
  })
}

export const getNativeHeartrateTimeSeries = () => {
  let options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: (new Date(2016,4,27)).toISOString(), // required
    endDate: (new Date()).toISOString(), // optional; default now
    ascending: false, // optional; default false
    limit:10, // optional; default no limit
  };


  return new Promise( (resolve, reject) => {
    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
      if (err) {
          return;
      }
      let val = [];

      for (var index = 0; index< Math.min(results.length,MAX_SERIES_NUMBER); index++) {
        let item = results[index];

        let time_series = {
          timestamp: moment(new Date()).unix(),
          time: moment(item.startDate, "YYYY-MM-DD").unix(),
          value: item.value,
          source: "Apple Health"
        }
        val.push(time_series);
      }
      console.log(results)
      resolve(val);
    });
  })
}

export const getNativeWeightTimeSeries = (access_token) => {
  const url = `https://api.humanapi.co/v1/human/weight/readings?access_token=${access_token}`

  return new Promise( (resolve, reject) => {
    axios({
      method:'get',
      url:url,
      responseType:'json'
    })
    .then(function(response) {
      let val = [];
      response.data.map( (item, index) => {
        if (index< MAX_SERIES_NUMBER) {
          let weight = item.value;
          if ( item.unit === 'kg') {
            weight = parseFloat(convert(weight).from('kg').to('lb').toFixed(2));
          }
          let time_series = {
            timestamp: moment(item.updatedAt, "YYYY-MM-DDThh:mm:ss.SSSZ").unix(),
            time: moment(item.date, "YYYY-MM-DD").unix(),
            value: weight,
            source: "Apple Health"
          }
          val.push(time_series);
        }
      })
      resolve(val);

  //    console.log(response.data);
    })
    .catch(error => {
      console.log(error)
    });
  })
}