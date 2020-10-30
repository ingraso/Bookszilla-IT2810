import { CHANGE_LOGIN_STATUS } from "../actions";

const initialState = {
  loginStatus: false,
  token: "",
};

const loginStatusReducer = (state = initialState, action: any) => {
  if (action.type === CHANGE_LOGIN_STATUS) {
    return Object.assign({}, state, {
      ...state,
      loginStatus: action.loginStatus,
      token: action.token,
    });
  }
  return state;
};

export default loginStatusReducer;
