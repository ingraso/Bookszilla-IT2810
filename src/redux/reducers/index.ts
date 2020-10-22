import { combineReducers } from "redux";
import phonePageReducer from "./phonePage";
import detailedBookIdReducer from "./detailedBookReducer";

const rootReducer = combineReducers<any>({
  phonePage: phonePageReducer,
  detailedBookIdReducer,
});

export default rootReducer;
