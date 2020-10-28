import React, { useEffect } from "react";
import { Book } from "../atoms/Book";
//import * as book_data from "../assets/book_data.json";
import { useDispatch, useSelector } from "react-redux";
import {GET_ALL_BOOKS} from "../assets/bookHandling";
import {useQuery} from "@apollo/client";
import { changeBookPage } from "../redux/actions";
import { MdArrowBack, MdArrowForward } from "react-icons/md";


/**
 * BookContainer is a component that displays all books.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = () => {
  const dispatch = useDispatch();
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const {loading, error, data} = useQuery(GET_ALL_BOOKS, {variables: {page: 0 , size: 18}});
  console.log(loading, error);
  console.log("Data: ", data);

  const changeBookPageHandler = (increase: boolean) => {
    if (bookPage > 0 || increase) {
      dispatch(changeBookPage(increase));
    }
  };

  
  return (
    <div id="book-container" className={phonePage}>
      <div id="book-pages-buttons">
        <button className="red-button" onClick={() => changeBookPageHandler(false)}><MdArrowBack size="30px"/></button>
        <p>{bookPage+1}</p>
        <button className="red-button" onClick={() => changeBookPageHandler(true)}><MdArrowForward size="30px"/></button>
      </div>
      <br/>
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
