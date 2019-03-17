import moment from 'moment';
import AppleHealthKit from 'rn-apple-healthkit';
import DataSource from '../DataSource';
import {
  convertMinutesToHours
} from '../../utilities';

class AppleWatch extends DataSource {

  constructor(options) {
    super(options);
  }

 getStepsTimeSeries() {
    let options = {
      startDate: this.startDate,
      limit:this.maxNumber, // optional; default no limit
    };
    const self = this;
    return new Promise( (resolve, reject) => {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          reject(err);
        }
        let val = [];

        for (var index = 0; index< Math.min(results.length,self.maxNumber) ; index++) {
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

  getActivityTimeSeries() {
    let options = {
      startDate: this.startDate,
      limit:this.maxNumber, // optional; default no limit
    };
    const self = this;

    return new Promise( (resolve, reject) => {
        AppleHealthKit.getAppleExerciseTime((options: Object), (err: Object, results: Object) => {
        if (err) {
          reject(err);
        }
        let val = [];
        console.log (JSON.stringify(results));
        
        for (var index = 0; index< Math.min(results.length,self.maxNumber) ; index++) {
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
      })
    })
  }

  getSleepTimeSeries() {
    let options = {
      startDate: this.startDate,
      endDate: this.endDate, // optional; default now
      limit:this.maxNumber, // optional; default no limit
    };
    const self = this;

    return new Promise( (resolve, reject) => {
      AppleHealthKit.getSleepSamples(options, (err, results) => {
        if (err) {
          reject(err);
        }
        let val = [];

        for (var index = 0; index< Math.min(results.length,self.maxNumber); index++) {
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

 getHeartrateTimeSeries() {
    let options = {
      startDate: this.startDate, // required
      endDate: this.endDate, // optional; default now
      limit:this.maxNumber, // optional; default no limit
    };
    const self = this;


    return new Promise( (resolve, reject) => {
      AppleHealthKit.getHeartRateSamples(options, (err, results) => {
        if (err) {
            reject(err);
        }
        let val = [];

        for (var index = 0; index< Math.min(results.length,self.maxNumber); index++) {
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

    // Array of 
  // {
  //   source: "fitbit", "misfit", "movable",
  //   device: "Fitbit Flex 2",
  //   synctime: "YYYY-MM-DDThh:mm:ss.SSS"
  // }
  getSources() {
    let options = {
      startDate: this.startDate, // required
      endDate: this.endDate, // optional; default now
      limit: this.maxNumber, // optional; default no limit
    };

    return new Promise( (resolve,reject) => {
      let val = [];
      let wearable = {
        source: "apple",
        device: "Apple Watch",
        synctime: moment(new Date()).unix() 
      }
      // Init HealthKit
      let options = {
        permissions: {
            read: ["Height", "Weight", "DateOfBirth", "StepCount", "HeartRate", "SleepAnalysis", "AppleExerciseTime", "BiologicalSex"]
       }
      };
      
      AppleHealthKit.initHealthKit((options: Object), (err: string, results: Object) => {
        if (err) {
            console.log("error initializing Healthkit: ", err);
            reject(err);
        }
    
        // TODO: 
        // Height Example
        AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
          if (err) {
            console.log(`Date of Birth ERROR: ${err}`);
            reject(err);
          }
          console.log(`Date of Birth: ${results}`);
        });
        val.push(wearable);
        resolve(val); 
      });
    }) 
  }
}

export {AppleWatch};