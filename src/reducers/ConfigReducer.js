import { CONFIG_UPDATE} from '../actions/types';

const INITIAL_STATE = {
    configuration: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONFIG_UPDATE:
    return {
      ...state, 
       configuration: {
        ...state.configuration, [action.payload.prop]: action.payload.value
       }
      };
    default:
      return state;
  }
};
