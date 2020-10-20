import { createStore } from "redux";
import detailedBookIdReducer from "../reducers/index";

const store = createStore(detailedBookIdReducer);

export default store;
