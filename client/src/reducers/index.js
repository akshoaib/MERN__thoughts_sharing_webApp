import { combineReducers } from "redux";
import authReducer from "./authReducer";
import followReducer from "./followReducer";
import thoughtReducer from "./thoughtReducer";
import userReducer from "./userReducer";
const combineReducer = combineReducers({
  auth: authReducer,
  thought: thoughtReducer,
  user: userReducer,
  follower: followReducer,
});

export default combineReducer;
