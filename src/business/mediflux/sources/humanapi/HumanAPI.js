import axios from 'axios';
import moment from 'moment';
import DataSource from '../DataSource';
import {
  convertMinutesToHours,
  convertSecondsToMinutes
} from '../../utilities';

class HumanAPI extends DataSource {

  constructor(options) {
    super(options);
  }

  getActivityTimeSeries() {
    const url = `https://api.humanapi.co/v1/human/activities/summaries?access_token=${this.accessToken}`
    const self = this;

    return new Promise( (resolve, reject) => {
      axios({
        method:'get',
        url:url,
        responseType:'json'
      })
      .then(function(response) {
        let val = [];
        response.data.map( (item, index) => {
          if (index< self.maxNumber) {
            let time_series = {
              timestamp: moment(item.updatedAt, "YYYY-MM-DDThh:mm:ss.SSSZ").unix(),
              time: moment(item.date, "YYYY-MM-DD").unix(),
              value: convertSecondsToMinutes(item.duration),
              source: item.source
            }
            val.push(time_series);
          }
        })
        resolve(val);
      })
      .catch(error => {
        reject(error)
      });
    })
  }

  getStepsTimeSeries() {
    const url = `https://api.humanapi.co/v1/human/activities/summaries?access_token=${this.accessToken}`
    const self = this;

    return new Promise( (resolve, reject) => {
      axios({
        method:'get',
        url:url,
        responseType:'json'
      })
      .then(function(response) {
        let val = [];
        response.data.map( (item, index) => {
          if (index< self.maxNumber) {
            let time_series = {
              timestamp: moment(item.updatedAt, "YYYY-MM-DDThh:mm:ss.SSSZ").unix(),
              time: moment(item.date, "YYYY-MM-DD").unix(),
              value: item.steps,
              source: item.source
            }
            val.push(time_series);
          }
        })
        resolve(val);
      })
      .catch(error => {
        reject(error)
      });
    })
  }

  getSleepTimeSeries() {
    const url = `https://api.humanapi.co/v1/human/sleeps/summaries?access_token=${this.accessToken}`
    const self = this;

    return new Promise( (resolve, reject) => {
      axios({
        method:'get',
        url:url,
        responseType:'json'
      })
      .then(function(response) {
        let val = [];
        response.data.map( (item, index) => {
          if (index< self.maxNumber) {
            let time_series = {
              timestamp: moment(item.updatedAt, "YYYY-MM-DDThh:mm:ss.SSSZ").unix(),
              time: moment(item.date, "YYYY-MM-DD").unix(),
              value: convertMinutesToHours(item.timeAsleep),
              source: item.source
            }
            val.push(time_series);
          }
        })
        resolve(val);
      })
      .catch(error => {
        reject(error)
      });
    })
  }

  getHeartrateTimeSeries() {
    const url = `https://api.humanapi.co/v1/human/heart_rate/summaries?access_token=${this.accessToken}`
    const self = this;

    return new Promise( (resolve, reject) => {
      axios({
        method:'get',
        url:url,
        responseType:'json'
      })
      .then(function(response) {
        let val = [];
        response.data.map( (item, index) => {
          if (index< self.maxNumber) {
            let time_series = {
              timestamp: moment(item.updatedAt, "YYYY-MM-DDThh:mm:ss.SSSZ").unix(),
              time: moment(item.date, "YYYY-MM-DD").unix(),
              value: item.restingHR,
              source: item.source
            }
            val.push(time_series);
          }
        })
        resolve(val);
      })
      .catch(error => {
        reject(error)
      });
    })
  }
}

export {HumanAPI};