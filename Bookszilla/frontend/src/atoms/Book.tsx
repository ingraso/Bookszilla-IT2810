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
 * @param props contains the id, title, author and url for a picture of the cover of the book
 */
export const Book = (props: BookProps) => {
  const dispatch = useDispatch();

  const handleBookClick = (id: string) => {
    dispatch(changeDetailedBook(id));
    dispatch(changePhonePage("book"));
  };

  return (
    <div
      id={String(props.id)}
      className="single-book"
      onClick={() => handleBookClick(props.id)}
    >
      <img src={props.cover} alt={"Book cover for" + props.title} />
      <p className="title">{props.title}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};
