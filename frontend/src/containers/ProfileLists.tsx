import { BookContainer } from "./BookContainer";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_LIST_BY_IDS } from "../assets/queries";
import { useSelector } from "react-redux";
import { BOOK_URL } from "../index";

/**
 * Returns a BookContainer with the books corresponding to the list of ids received
 * @param bookList: an array of bookIds
 * @var bookPage is used to know which page of books the user is currently seeing.
 */

export const ProfileLists = (props: { bookList: string[] }) => {
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const { data } = useQuery(GET_BOOK_LIST_BY_IDS, {
    variables: {
      page: bookPage,
      size: 18,
      ids: props.bookList,
    },
    context: { uri: BOOK_URL },
  });

  return (
    <BookContainer bookData={data?.booksByIds} id="profile-book-container" />
  );
};
