import React from "react";
import { useDispatch } from "react-redux";
import { changeDetailedBook, changePhonePage } from "../redux/actions";
import "../styles/Book.css";

interface BookProps {
  id: string;
  title: string;
  author: string;
  cover: string;
}

/**
 * Book is a representation of a book, with its title,
 * author and cover image.
 * @param props
 */
export const Book = (props: BookProps) => {
  const dispatch = useDispatch();

  const handleBookClick = (id: string) => {
    updateDetailedBook(id);
    dispatch(changePhonePage("book"));
  };

  const updateDetailedBook = (id: string) => {
    dispatch(changeDetailedBook(id));
  };

  return (
    <div
      id={String(props.id)}
      className="single-book"
      onClick={() => handleBookClick(props.id)}
    >
      <img src={props.cover} alt="`SOME book cover" />
      <p className="title">{props.title}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};
