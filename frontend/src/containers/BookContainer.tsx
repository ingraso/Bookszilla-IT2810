import React from "react";
import { Book } from "../atoms/Book";
import { useSelector } from "react-redux";
import { GET_BOOKS_BY_SEARCH } from "../assets/bookHandling";
import { useQuery } from "@apollo/client";

/**
 * BookContainer is a component that displays all books.
 * @var phonePage is used to decide if the book-container should be shown.
 * @var search is the string used to search for authors or books.
 */

export const BookContainer = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const search: string = useSelector((state: any) => state.search.searchString);
  const { loading, error, data } = useQuery(GET_BOOKS_BY_SEARCH, {
    variables: { search: search, page: 0, size: 18 },
  });

  return (
    <div id="book-container" className={phonePage}>
      {data?.booksBySearch?.map((bookData: any) => {
        return (
          <Book
            key={bookData.id}
            id={Number(bookData.id)}
            title={bookData.title}
            author={bookData.author}
            cover={bookData.image}
          />
        );
      })}
    </div>
  );
};
