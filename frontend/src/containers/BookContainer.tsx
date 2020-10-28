import React, { useEffect } from "react";
import { Book } from "../atoms/Book";
//import * as book_data from "../assets/book_data.json";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_BOOKS } from "../assets/bookHandling";
import { useQuery } from "@apollo/client";
import { changeBookPage } from "../redux/actions";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

/**
 * BookContainer is a component that displays all books, and lets you move between pages.
 * @var bookPage is used to know which page of books the user is currently seeing.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = () => {
  const dispatch = useDispatch();
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: { page: bookPage, size: 18 },
  });
  console.log(loading, error);
  console.log("Data: ", data);

  const changeBookPageHandler = (increase: boolean) => {
    if (bookPage > 0 || increase) {
      dispatch(changeBookPage(increase));
    }
  };

  const showingBookPage: string = String(bookPage + 1);

  return (
    <>
      <div id="book-container" className={phonePage}>
        {data?.books?.map((bookData: any) => {
          return (
            <Book
              key={bookData.id}
              id={bookData.id}
              title={bookData.title}
              author={bookData.author}
              cover={bookData.image}
            />
          );
        })}
        <div id="book-pages-buttons">
          {bookPage > 0 ? (
            <button
              className="red-button"
              onClick={() => changeBookPageHandler(false)}
            >
              <MdArrowBack size="30px" />
            </button>
          ) : null}
          <p>
            <h3>{"Page " + showingBookPage}</h3>
          </p>
          <button
            className="red-button"
            onClick={() => changeBookPageHandler(true)}
          >
            <MdArrowForward size="30px" />
          </button>
        </div>
      </div>
    </>
  );
};
