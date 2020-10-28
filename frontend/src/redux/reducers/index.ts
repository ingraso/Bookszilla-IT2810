import { combineReducers } from "redux";
import detailedBookIdReducer from "./detailedBookReducer";
import loginStatusReducer from "./loginReducer";
import phonePageReducer from "./phonePage";
import bookPageReducer from "./bookPageReducer";
import searchReducer from "./searchReducer";
import sortByReducer from "./sortByReducer";

const rootReducer = combineReducers<any>({
  phonePage: phonePageReducer,
  id: detailedBookIdReducer,
  loginStatus: loginStatusReducer,
  bookPage: bookPageReducer,
  search: searchReducer,
  sortBy: sortByReducer,
});

export default rootReducer;
