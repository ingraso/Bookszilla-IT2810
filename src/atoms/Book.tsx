import React from "react";
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
  return (
    <div className="book">
      <img src={props.cover} alt="SOME book cover" />
      <p className="title">{props.title}</p>
      <p className="author">by {props.author}</p>
    </div>
  );
};

/**
 *       {props.genres.map((genre) => {
        return (
          <p className="genre" key={genre}>
            {genre}
          </p>
        );
      })}
 */
