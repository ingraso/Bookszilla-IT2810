import { changeBookPage, UPDATE_BOOK_PAGE } from "../actions/index";

const initialState = {
  bookPage: 0,
};

type Actions = ReturnType<typeof changeBookPage>;

const bookPageReducer = (state = initialState, action: Actions) => {
  if (action.type === UPDATE_BOOK_PAGE) {
    return {
      ...state,
      bookPage: action.newPage,
    };
  }
  return state;
};

export default bookPageReducer;
