import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import SessionReducer from "./SessionReducer";
import ConfigReducer from "./ConfigReducer";
import FeedReducer from "./FeedReducer";
import TimeSeriesReducer from "./TimeSeriesReducer";
import HealthReducer from "./HealthReducer";
import DeviceReducer from "./DeviceReducer";
import LeaderboardReducer from "./LeaderboardReducer";
import MedifluxReducer from "./MedifluxReducer";


export default combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  session: SessionReducer,
  feed: FeedReducer,
  config: ConfigReducer,
  timeseries: TimeSeriesReducer,
  health: HealthReducer,
  device: DeviceReducer,
  play: LeaderboardReducer,
  mediflux: MedifluxReducer
});
