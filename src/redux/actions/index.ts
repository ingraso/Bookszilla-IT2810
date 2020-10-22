export const UPDATE_DETAILED_BOOK_ID = "UPDATE_DETAILED_BOOK_ID";
export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS";

export const changeDetailedBook = (id: number) => ({
  type: UPDATE_DETAILED_BOOK_ID,
  id,
});

export const changeLoginStatus = (loginStatus: boolean) => ({
  type: CHANGE_LOGIN_STATUS,
  loginStatus,
});
