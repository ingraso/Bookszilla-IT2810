import React from "react";
import { Book } from "../atoms/Book";
import * as book_data from "../assets/book_data.json";
import { useSelector } from "react-redux";

/**
 * BookContainer is a component that displays all books.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  return (
    <div id="book-container" className={phonePage}>
      {Object.values(book_data.books).map((bookData) => {
        return (
          <Book
            key={bookData.id}
            id={Number(bookData.id)}
            title={bookData.title}
            author={bookData.author}
            cover={bookData.cover}
          />
        );
      })}
    </div>
  );
};
