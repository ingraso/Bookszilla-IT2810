import { addFilter, removeFilter, ADD_FILTER, REMOVE_FILTER } from "../actions";

const initialState = {
  filters: [] as Array<string>,
};

type Actions = ReturnType<typeof addFilter> | ReturnType<typeof removeFilter>;

const filterReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: state.filters.concat(action.filter),
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter !== action.filter),
      };
  }
  return state;
};

export default filterReducer;
