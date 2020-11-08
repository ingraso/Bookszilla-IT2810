import { changeSearch, CHANGE_SEARCH } from "../actions";

const initialState = {
  searchString: "",
};

type Actions = ReturnType<typeof changeSearch>;

const searchReducer = (state = initialState, action: Actions) => {
  if (action.type === CHANGE_SEARCH) {
    return {
      ...state,
      searchString: action.searchString,
    };
  }
  return state;
};

export default searchReducer;
