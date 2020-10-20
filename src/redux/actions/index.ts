export const UPDATE_DETAILED_BOOK_ID = "UPDATE_DETAILED_BOOK_ID";

export const changeDetailedBook = (id: number) => ({
  type: UPDATE_DETAILED_BOOK_ID,
  id,
});
