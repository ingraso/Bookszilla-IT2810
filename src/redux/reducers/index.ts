import { combineReducers } from "redux";
import phonePageReducer from "./phonePage";

const rootReducer = combineReducers<any>({
  phonePage: phonePageReducer,
});

export default rootReducer;
