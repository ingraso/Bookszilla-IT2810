export const UPDATE_DETAILED_BOOK_ID = "UPDATE_DETAILED_BOOK_ID";
export const CHANGE_LOGIN_STATUS = "CHANGE_LOGIN_STATUS";
export const UPDATE_PHONE_PAGE = "UPDATE_PHONE_PAGE";
export const UPDATE_BOOK_PAGE = "UPDATE_BOOK_PAGE";
export const CHANGE_SEARCH = "CHANGE_SEARCH";
export const UPDATE_SORT_BY = "UPDATE_SORT_BY";
export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";

export const changeDetailedBook = (id: string) => ({
  type: UPDATE_DETAILED_BOOK_ID,
  id,
});

export const changeLoginStatus = (loginStatus: boolean, token: string) => ({
  type: CHANGE_LOGIN_STATUS,
  loginStatus,
  token,
});

export const changePhonePage = (newPage: string) => ({
  type: UPDATE_PHONE_PAGE,
  newPage,
});

export const changeBookPage = (newPage: number) => ({
  type: UPDATE_BOOK_PAGE,
  newPage,
});

export const changeSearch = (searchString: string) => ({
  type: CHANGE_SEARCH,
  searchString,
});

export const updateSortBy = (sortBy: string) => ({
  type: UPDATE_SORT_BY,
  sortBy,
});

export const addFilter = (filter: string) => ({
  type: ADD_FILTER,
  filter,
});

export const removeFilter = (filter: string) => ({
  type: REMOVE_FILTER,
  filter,
});
