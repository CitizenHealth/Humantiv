import { 
  DEVICE_INFO_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  sources: [],
  devices: [],
  isNativeAvailable: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DEVICE_INFO_FETCH:
      return {
        ...state,
        sources: action.payload.sources,
        devices: action.payload.devices,
        isNativeAvailable: action.payload.isNativeAvailable,
      };
    default:
      return state;
  }
}