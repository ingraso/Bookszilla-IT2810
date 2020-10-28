import { changeBookPage, UPDATE_BOOK_PAGE } from "../actions/index";

const initialState = {
  bookPage: 0,
};

type Actions = ReturnType<typeof changeBookPage>;

const bookPageReducer = (state = initialState, action: Actions) => {
  if (action.type === UPDATE_BOOK_PAGE) {
    if (action.increase) {
      return {
        ...state,
        bookPage: state.bookPage + 1,
      };
    } else {
      return {
        ...state,
        bookPage: state.bookPage - 1,
      };
    }
  }
  return state;
};

export default bookPageReducer;
