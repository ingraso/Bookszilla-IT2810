import { UPDATE_DETAILED_BOOK_ID } from "../actions";

const initialState = {
  id: 0,
};

const detailedBookIdReducer = (state = initialState, action: any) => {
  if (action.type === UPDATE_DETAILED_BOOK_ID) {
    return Object.assign({}, state, {
      id: action.id,
    });
  }
  return state;
};
export default detailedBookIdReducer;
