import { 
  TIMESERIES_ACTIVITY_FETCH,
  TIMESERIES_STEPS_FETCH,
  TIMESERIES_HEARTRATE_FETCH,
  TIMESERIES_SLEEP_FETCH,
  TIMESERIES_WEIGHT_FETCH,
  TIMESERIES_STRESS_FETCH,
  TIMESERIES_MEDIT_FETCH,
  TIMESERIES_SCORE_FETCH
  } from "../actions/types";
  
const INITIAL_STATE = {
  activity: [],
  steps: [],
  heartrate: [],
  sleep: [],
  weight: [],
  stress: [],
  medit: [],
  score: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMESERIES_ACTIVITY_FETCH:
      return {
        ...state,
        activity : action.payload
      };
    case TIMESERIES_STEPS_FETCH:
      return {
        ...state,
        steps : action.payload
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
    case TIMESERIES_MEDIT_FETCH:
      return {
        ...state,
        medit : action.payload
      };
    case TIMESERIES_SCORE_FETCH:
      return {
        ...state,
        score : action.payload
      };

    default:
      return state;
  }
};
