import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import SessionReducer from "./SessionReducer";
import ConfigReducer from "./ConfigReducer";
import FeedReducer from "./FeedReducer";
import TimeSeriesReducer from "./TimeSeriesReducer";
import HealthReducer from "./HealthReducer";


export default combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  session: SessionReducer,
  feed: FeedReducer,
  config: ConfigReducer,
  timeseries: TimeSeriesReducer,
  health: HealthReducer
});
