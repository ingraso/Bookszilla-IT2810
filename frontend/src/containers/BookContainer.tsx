import React from "react";
import { Book } from "../atoms/Book";
import * as book_data from "../assets/book_data.json";
import { useSelector } from "react-redux";
import {GET_ALL_BOOKS} from "../assets/bookHandling";
import {useQuery} from "@apollo/client";


/**
 * BookContainer is a component that displays all books.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const {loading, error, data} = useQuery(GET_ALL_BOOKS);
  console.log(loading, error);
  console.log("Data: ", data);
  /*return (
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
  );*/
  return (
    <div id="book-container" className={phonePage}>
      {data?.books?.map((bookData:any) => {
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
  )};
