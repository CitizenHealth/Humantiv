import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import SessionReducer from "./SessionReducer";
import ConfigReducer from "./ConfigReducer";
import FeedReducer from "./FeedReducer";
import HealthReducer from "./HealthReducer";
import TimeSeriesReducer from "./TimeSeriesReducer";

export default combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  session: SessionReducer,
  feed: FeedReducer,
  config: ConfigReducer,
  health: HealthReducer,
  timeseries: TimeSeriesReducer
});
