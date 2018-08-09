import {HEALTH_FETCH, HEALTH_ADD, HEALTH_DELETE, HEALTH_SCORE_SET, HEALTH_SCORE_SAVE} from '../actions/types';

const INITIAL_STATE = {
  healthscore: -1,
  timeseries: {}
};

export default (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case HEALTH_ADD:
      return state;
    case HEALTH_SCORE_SAVE:
      return state;
    case HEALTH_DELETE:
      return state;
    case HEALTH_FETCH:
      return {
        ...state,
        timeseries : {
          ...state.timeseries,
          [action.payload.type] : action.payload.data
          }
      }
    case HEALTH_SCORE_SET:
      return {
        ...state,
        healthscore: action.payload.data
      }
    default:
      return state;
  }
}