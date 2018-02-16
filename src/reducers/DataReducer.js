import { DATA_CREATE, DATA_SAVE, DATA_EDIT, DATA_FETCH } from "../actions/types";

const INITIAL_STATE = {
  children: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case DATA_EDIT:
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
