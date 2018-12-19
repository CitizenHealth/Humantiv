import { 
  DEVICE_INFO_FETCH, 
} from './types';

export const deviceInfoFetch = (info) => {
  return {type: DEVICE_INFO_FETCH, payload: info};
}