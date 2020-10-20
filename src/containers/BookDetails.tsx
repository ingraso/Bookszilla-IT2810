import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import store from "../redux/store";
import "../styles/BookDetails.css";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var bookDetailsClassName is used to choose if details of a book is shown.
 */

const BookDetails = () => {
  const [bookDetailsClassName, setBookDetailsClassName] = useState<string>(
    "closed-book"
  );
  // remember to remove this after retrieving data from db
  let title: string = "The Spice Shelf Girls";
  let author: string = "Xu Wang";
  let cover: string = "../../sunset.jpg";
  let genres: Array<string> = ["Drama", "Documentary"];

  store.subscribe(() => displayDetailedView());

  const displayDetailedView = () => {
    setBookDetailsClassName("opened-book");
    // if id !== 0 => get data for book with id 'props.id' and display this
    console.log(store.getState()); // to show that another book cover is clicked
  };

  const notImplemented = () => {
    alert("Not yet implemented :(");
  };

  return (
    <div className={bookDetailsClassName} id="book-details">
      <button
        id="close-button"
        onClick={() => setBookDetailsClassName("closed-book")}
      >
        <MdClose size="20px" />
      </button>
      <img src={cover} alt="SOME book cover" />
      <p className="title">Title: {title}</p>
      <p className="author">Author: {author}</p>
      <p className="genre">
        Genres:
        {genres.map((genre) => {
          return <b key={genre}> {genre}</b>;
        })}
      </p>

      <button
        id="favorite-button"
        className="red-button"
        onClick={notImplemented}
      >
        Favorite
      </button>
      <button
        id="wish-to-read-button"
        className="red-button"
        onClick={notImplemented}
      >
        Wish to read
      </button>
      <button
        id="have-read-button"
        className="red-button"
        onClick={notImplemented}
      >
        Have read
      </button>
    </div>
  );
};

export default BookDetails;
