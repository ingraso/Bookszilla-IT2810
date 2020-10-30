import { CHANGE_LOGIN_STATUS } from "../actions";

const initialState = {
  loginStatus: window.sessionStorage.getItem("loginStatus"),
};

const loginStatusReducer = (state = initialState, action: any) => {
  if (action.type === CHANGE_LOGIN_STATUS) {
    window.sessionStorage.setItem(
      "loginStatus",
      JSON.stringify(action.loginStatus)
    );
    return Object.assign({}, state, {
      loginStatus: action.loginStatus,
    });
  }
  return state;
};

export default loginStatusReducer;
