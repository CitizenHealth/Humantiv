import { DATA_CREATE, DATA_SAVE, DATA_FETCH, DATA_EXISTS } from "../actions/types";

const INITIAL_STATE = {
  children: {},
  registered: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_EXISTS:
      return {
        ...state,
        registered: action.payload.exists
      }
    case DATA_CREATE:
    return {
      ...state,
      children : {
        ...state.children,
        [action.payload.type] : {
          ...state.children[action.payload.type],
          [action.payload.prop] : action.payload.value
          }
        }
      };
    case DATA_SAVE:
      return state;
    case DATA_FETCH:
      return {
        ...state,
        children : {
          ...state.children,
          [action.payload.type] : action.payload.data
          }
      };
    default:
      return state;
  }
};
