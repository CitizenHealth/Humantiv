const MAX_SERIES_NUMBER = 30;

export default class DataSource {
  
  constructor({
                maxNumber = MAX_SERIES_NUMBER, 
                startDate = (new Date(2016,10,1)).toISOString(),
                endDate = (new Date()).toISOString(),
                accessToken = ''
              } = {}) {
    
    // Records options and other parameters
    this.maxNumber = maxNumber;
    this.startDate = startDate;
    this.endDate = endDate;
    this.accessToken = accessToken;

    // This is a trick to make the class abstract. It can't be instantiated if 
    if (new.target === DataSource) {
      throw new TypeError("Cannot construct DataSource instances directly");
    }
  }

  // Promise returning an activity array of objects:
  // {
  //    timestamp: // Time the entry was updated,
  //    time:      // Time the entry was measured
  //    value:     // Value of the entry
  //    source:    // Data source: "Apple Health", "Fitbit", "Misfit", "Withings"
  // }
  getActivityTimeSeries() {
  }

  // Promise returning a steps array of objects:
  // {
  //    timestamp: // Time the entry was updated,
  //    time:      // Time the entry was measured
  //    value:     // Value of the entry
  //    source:    // Data source: "Apple Health", "Fitbit", "Misfit", "Withings"
  // }
  getStepsTimeSeries() {
  }

  // Promise returning a sleep array of objects:
  // {
  //    timestamp: // Time the entry was updated,
  //    time:      // Time the entry was measured
  //    value:     // Value of the entry
  //    source:    // Data source: "Apple Health", "Fitbit", "Misfit", "Withings"
  // }
  getSleepTimeSeries() {
  }

  // Promise returning a heart rate array of objects:
  // {
  //    timestamp: // Time the entry was updated,
  //    time:      // Time the entry was measured
  //    value:     // Value of the entry
  //    source:    // Data source: "Apple Health", "Fitbit", "Misfit", "Withings"
  // }
  getHeartrateTimeSeries() {
  }

  getAllTimeSeries() {
    return Promise.all([this.getStepsTimeSeries(), this.getActivityTimeSeries(), this.getSleepTimeSeries(), this.getHeartrateTimeSeries()])
  }
}