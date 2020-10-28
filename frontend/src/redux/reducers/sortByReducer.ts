import { updateSortBy, UPDATE_SORT_BY } from "../actions";

const initialState = {
  sortBy: "title",
};

type Actions = ReturnType<typeof updateSortBy>;

const sortByReducer = (state = initialState, action: Actions) => {
  if (action.type === UPDATE_SORT_BY) {
    return {
      ...state,
      sortBy: action.sortBy,
    };
  }
  return state;
};

export default sortByReducer;