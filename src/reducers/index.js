import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DataReducer from "./DataReducer";
import SessionReducer from "./SessionReducer";

export default combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  session: SessionReducer,
});
