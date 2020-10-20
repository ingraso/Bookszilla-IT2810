import React from "react";
import { Book } from "../atoms/Book";
import * as book_data from "../assets/book_data.json";

export const BookContainer = () => {
  return (
    <div id="book-container">
      {Object.values(book_data.books).map((bookData) => {
        return (
          <Book
            key={bookData.id}
            id={bookData.id}
            title={bookData.title}
            author={bookData.author}
            cover={bookData.cover}
          />
        );
      })}
    </div>
  );
};
