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
    dispatch(changeDetailedBook(id));
    dispatch(changePhonePage("book"));
  };

  const shortenTitle = (title: string) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    }
    return title;
  };

  return (
    <div
      id={String(props.id)}
      className="single-book"
      onClick={() => handleBookClick(props.id)}
    >
      <img src={props.cover} alt={"Book cover for" + props.title} />
      <p className="title">{shortenTitle(props.title)}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};
