import { CHANGE_LOGIN_STATUS } from "../actions";

/**
 * We had this reducer set up to keep the user signed in after refreshing the page,
 * however due to last minute bugs we had remove the sessionStorage functionality
 */

const initialState = {
  /*loginStatus: window.sessionStorage.getItem("loginStatus"),
  token: window.sessionStorage.getItem("token"),*/
  loginStatus: false,
  token: "",
};

const loginStatusReducer = (state = initialState, action: any) => {
  if (action.type === CHANGE_LOGIN_STATUS) {
    /*window.sessionStorage.setItem(
      "loginStatus",
      JSON.stringify(action.loginStatus)
    );
    window.sessionStorage.setItem(
      "token",
      JSON.stringify(action.token)
    );*/
    return Object.assign({}, state, {
      ...state,
      loginStatus: action.loginStatus,
      token: action.token,
    });
  }
  return state;
};

export default loginStatusReducer;
