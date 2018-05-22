import {FEED_FILTERS_FETCH, FEED_FILTERS_UPDATE, FEED_FETCH, FEED_ADD, FEED_DELETE} from '../actions/types';

const INITIAL_STATE = {
  stories: {},
  filters: {}
};

export default (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case FEED_ADD:
    return state;
    case FEED_DELETE:
      return state;
    case FEED_FETCH:
      return {
        ...state,
        stories : (action.payload != null) ? action.payload : {}
      }
    case FEED_FILTERS_FETCH:
      return {
        ...state,
        filters : (action.payload != null) ? action.payload : {}
      }
    case FEED_FILTERS_UPDATE:
    return {
      ...state,
      filters: [...state.filters, [ { [action.payload.key]: action.payload.value} ]]
    }
    default:
      return state;
  }
}