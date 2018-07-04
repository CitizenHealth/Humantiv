import { DATA_CREATE, DATA_SAVE, DATA_EDIT, DATA_FETCH, DATA_EXISTS, HUMANAPI_DATA_FETCH, TIMESTAMPS_EXISTS } from "../actions/types";

const INITIAL_STATE = {
  children: {},
  hapiPublicToken: {},
  registered: undefined,
  stepsExist: false,
  activityExists: false,
  sleepExists: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMESTAMPS_EXISTS:
      return {...state,
        [action.payload.type]: action.payload.exists
      }
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
    case HUMANAPI_DATA_FETCH:
      return {
        ...state,
        hapiPublicToken : action.payload.data
      };
    default:
      return state;
  }
};
