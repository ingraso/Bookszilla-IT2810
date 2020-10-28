import { combineReducers } from "redux";
import detailedBookIdReducer from "./detailedBookReducer";
import loginStatusReducer from "./loginReducer";
import phonePageReducer from "./phonePage";
import bookPageReducer from "./bookPageReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers<any>({
  phonePage: phonePageReducer,
  id: detailedBookIdReducer,
  loginStatus: loginStatusReducer,
  bookPage: bookPageReducer,
  filter: filterReducer,
});

export default rootReducer;
