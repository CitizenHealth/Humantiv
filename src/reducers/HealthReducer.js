import {HEALTH_SCORE_SAVE} from '../actions/types';

const INITIAL_STATE = {
  healthscore: -1,
};

export default (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case HEALTH_SCORE_SAVE:
      return state;
    default:
      return state;
  }
}
