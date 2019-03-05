import { 
  MEDIFLUX_NOTIFICATION,
} from "./types";

export const medifluxNotification = (value) => {
  return (dispatch) => {
		dispatch({ type: MEDIFLUX_NOTIFICATION, payload: value });
	}
};