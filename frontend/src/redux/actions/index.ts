export const UPDATE_DETAILED_BOOK_ID = "UPDATE_DETAILED_BOOK_ID";
export const UPDATE_PHONE_PAGE = "UPDATE_PHONE_PAGE";

export const changeDetailedBook = (id: number) => ({
  type: UPDATE_DETAILED_BOOK_ID,
  id,
});

export const changePhonePage = (newPage: string) => ({
  type: UPDATE_PHONE_PAGE,
  newPage,
});
