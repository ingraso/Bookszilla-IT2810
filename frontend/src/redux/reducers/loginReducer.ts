import { CHANGE_LOGIN_STATUS } from "../actions";

const initialState = {
  loginStatus: false,
};

const loginStatusReducer = (state = initialState, action: any) => {
  if (action.type === CHANGE_LOGIN_STATUS) {
    return Object.assign({}, state, {
      loginStatus: action.loginStatus,
    });
  }
  return state;
};

export default loginStatusReducer;
