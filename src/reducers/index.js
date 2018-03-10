import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import SessionReducer from "./SessionReducer";
import ConfigReducer from "./ConfigReducer";

export default combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  session: SessionReducer,
  config: ConfigReducer
});
