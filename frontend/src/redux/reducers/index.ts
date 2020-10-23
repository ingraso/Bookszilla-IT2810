import { combineReducers } from "redux";
import detailedBookIdReducer from "./detailedBookReducer";
import loginStatusReducer from "./loginReducer";
import phonePageReducer from "./phonePage";

const rootReducer = combineReducers<any>({
  phonePage: phonePageReducer,
  id: detailedBookIdReducer,
  loginStatus: loginStatusReducer,
});

export default rootReducer;
