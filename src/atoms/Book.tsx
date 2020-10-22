import React from "react";
import { changeDetailedBook } from "../redux/actions";
import store from "../redux/store";
import "../styles/Book.css";

interface BookProps {
  id: number;
  title: string;
  author: string;
  cover: string;
}

/*const updateDetailedBook = (id: number) => {
  store.dispatch(changeDetailedBook(id));
};*/

/**
 * Book is a representation of a book, with its title,
 * author and cover image.
 * @param props
 */
export const Book = (props: BookProps) => {
  return (
    <div id={String(props.id)} className="single-book">
      <img src={props.cover} alt="`SOME book cover" />
      <p className="title">{props.title}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};
