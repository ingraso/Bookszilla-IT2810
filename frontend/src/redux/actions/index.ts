export const UPDATE_DETAILED_BOOK_ID = "UPDATE_DETAILED_BOOK_ID";
export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS";
export const UPDATE_PHONE_PAGE = "UPDATE_PHONE_PAGE";
export const CHANGE_SEARCH = "CHANGE_SEARCH";

export const changeDetailedBook = (id: number) => ({
  type: UPDATE_DETAILED_BOOK_ID,
  id,
});

export const changeLoginStatus = (loginStatus: boolean) => ({
  type: CHANGE_LOGIN_STATUS,
  loginStatus,
});

export const changePhonePage = (newPage: string) => ({
  type: UPDATE_PHONE_PAGE,
  newPage,
});

export const changeSearch = (searchString: string) => ({
  type: CHANGE_SEARCH,
  searchString,
});
