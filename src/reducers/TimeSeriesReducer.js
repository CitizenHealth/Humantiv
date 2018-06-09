import { 
  TIMESERIES_ACTIVITY_FETCH,
  TIMESERIES_HEARTRATE_FETCH,
  TIMESERIES_SLEEP_FETCH,
  TIMESERIES_WEIGHT_FETCH,
  TIMESERIES_STRESS_FETCH,
  } from "../actions/types";
  
const INITIAL_STATE = {
  activity: [],
  heartrate: [],
  sleep: [],
  weight: [],
  stress: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMESERIES_ACTIVITY_FETCH:
      return {
        ...state,
        activity : action.payload
      };
    case TIMESERIES_HEARTRATE_FETCH:
      return {
        ...state,
        heartrate : action.payload
      };
    case TIMESERIES_SLEEP_FETCH:
      return {
        ...state,
        sleep : action.payload
      };
    case TIMESERIES_WEIGHT_FETCH:
      return {
        ...state,
        weight : action.payload
      };
    case TIMESERIES_STRESS_FETCH:
      return {
        ...state,
        stress : action.payload
      };
    default:
      return state;
  }
};
