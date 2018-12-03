import {
  AppleHealth,
  HumanAPI
} from "./sources";

// Strategy pattern
class Mediflux {
  constructor(datasource) {
    this.datasource = datasource;
  }
  
  getActivityTimeSeries() {
    return this.datasource.getActivityTimeSeries();
  }

  getStepsTimeSeries() {
    return this.datasource.getStepsTimeSeries();
  }

  getSleepTimeSeries() {
    return this.datasource.getSleepTimeSeries();
  }

  getHeartrateTimeSeries() {
    return this.datasource.getHeartrateTimeSeries();
  }

  // Get all timeseries from the wearable source
  //
  // Returns: N/A
  // Throws: Exception
  getAllTimeSeries() {
    return this.datasource.getAllTimeSeries();
  }
}

// Factory pattern
const createMedifluxSource = (source, options) => {
  switch (source) {
    case 'apple_health':
      return new AppleHealth(options);
    case 'humanapi':
      return new HumanAPI(options);
    default:
      return new HumanAPI(options);
  }
}

export {Mediflux, createMedifluxSource} 