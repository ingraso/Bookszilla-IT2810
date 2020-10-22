import { combineReducers } from "redux";
import detailedBookIdReducer from "./detailedBookReducer";
import loginStatusReducer from "./loginReducer";

const rootReducer = combineReducers({
  loginStatusReducer,
  detailedBookIdReducer,
});

export default rootReducer;
