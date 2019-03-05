import {MEDIFLUX_NOTIFICATION} from '../actions/types';

const INITIAL_STATE = {
  update: false
};

export default (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case MEDIFLUX_NOTIFICATION:
      return {
        ...state,
        update : (action.payload != null) ? action.payload : false
      }
    default:
      return state;
  }
}