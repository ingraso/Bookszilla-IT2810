import { changePhonePage, UPDATE_PHONE_PAGE } from "../actions";

const initialState = {
  phonePage: "home",
};

type Actions = ReturnType<typeof changePhonePage>;

const phonePageReducer = (state = initialState, action: Actions) => {
  if (action.type === UPDATE_PHONE_PAGE) {
    return {
      ...state,
      phonePage: action.newPage,
    };
  }
  return state;
};

export default phonePageReducer;
