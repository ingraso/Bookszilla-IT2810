import { CHANGE_LOGIN_STATUS } from "../actions";

const initialState = {
  loginStatus: window.sessionStorage.getItem("loginStatus"),
  token: window.sessionStorage.getItem("token"),
};

const loginStatusReducer = (state = initialState, action: any) => {
  if (action.type === CHANGE_LOGIN_STATUS) {
    window.sessionStorage.setItem(
      "loginStatus",
      JSON.stringify(action.loginStatus)
    );
    window.sessionStorage.setItem(
      "token",
      JSON.stringify(action.token)
    );
    return Object.assign({}, state, {
      ...state,
      loginStatus: action.loginStatus,
      token: action.token,
    });
  }
  return state;
};

export default loginStatusReducer;
