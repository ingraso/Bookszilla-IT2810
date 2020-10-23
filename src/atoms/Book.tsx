import React from "react";
import { useDispatch } from "react-redux";
import { changeDetailedBook } from "../redux/actions";
import "../styles/Book.css";

interface BookProps {
  id: number;
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

  const updateDetailedBook = (id: number) => {
    dispatch(changeDetailedBook(id));
  };

  return (
    <div
      id={String(props.id)}
      className="single-book"
      onClick={() => updateDetailedBook(props.id)}
    >
      <img src={props.cover} alt="`SOME book cover" />
      <p className="title">{props.title}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};
