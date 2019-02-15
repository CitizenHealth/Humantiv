import {LEADERBOARD_FETCH} from '../actions/types';


const INITIAL_STATE = {
  leaderboard: []
};

export default (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case LEADERBOARD_FETCH:
      return {
        ...state,
        leaderboard : (action.payload != null) ? action.payload : {}
      }
    default:
      return state;
  }
}