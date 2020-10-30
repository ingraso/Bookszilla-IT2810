import React from "react";
import { Book } from "../atoms/Book";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { changeBookPage } from "../redux/actions";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import {GET_BOOK_LIST_BY_IDS, GET_BOOKS_BY_SEARCH, GET_USER_INFO} from "../assets/queries";
import {url} from "inspector";

/**
 * BookContainer is a component that displays all books, and lets you move between pages.
 * @var bookPage is used to know which page of books the user is currently seeing.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = (props:{bookData: any, id: string}) => {
  const dispatch = useDispatch();
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  const changeBookPageHandler = (increase: boolean) => {
    if (bookPage > 0 && !increase) {
      dispatch(changeBookPage(bookPage - 1));
    } else if (increase) {
      dispatch(changeBookPage(bookPage + 1));
    }
  };

  const showingBookPage: string = String(bookPage + 1);

  return (
    <>
      <div id="book-container" className={phonePage}>
        {props.bookData?.map((bookData: any) => {
          return (
            <Book
              key={bookData.id}
              id={bookData.id}
              title={bookData.title}
              author={bookData.author !== "" ? bookData.author : "Unknown"}
              cover={bookData.image}
            />
          );
        })}
        <div id={props.id}>
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
