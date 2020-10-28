import React, { useEffect } from "react";
import { Book } from "../atoms/Book";
import * as book_data from "../assets/book_data.json";
import { useSelector } from "react-redux";
import {GET_BOOKS_BY_SEARCH} from "../assets/bookHandling";
import {useQuery} from "@apollo/client";


/**
 * BookContainer is a component that displays all books.
 * @var phonePage is used to decide if the book-container should be shown.
 */

export const BookContainer = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const search: string = ""; //TODO: update search to match redux from search field
  const {loading, error, data} = useQuery(GET_BOOKS_BY_SEARCH, {variables: { search: search, page: 0 , size: 18}});

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return function cleanup() {
      window.removeEventListener("scroll", () => handleOnScroll);
    }
  })

  // https://medium.com/@alfianlosari/graphql-cursor-infinite-scroll-pagination-with-react-apollo-client-and-github-api-fafbc510b667
  const handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    console.log("scrollTop: " + scrollTop + ", scrollHeight: "
     + scrollHeight + ", clientHeight: " + clientHeight + ", scrolledToBottom: " + scrolledToBottom);
    if (scrolledToBottom) {
      //this.props.onLoadMore();
    }
  };
  if (/*!this.props.entries && this.props.loading*/ false) return <p>Loading....</p>;

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
      {data?.booksBySearch?.map((bookData:any) => {
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
