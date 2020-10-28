import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import store from "../redux/store";
import { useSelector } from "react-redux";
import "../styles/BookDetails.css";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../assets/bookHandling";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var bookDetailsClassName is used to choose if details of a book is shown.
 * @var phonePage uses redux store to decide if the component should be shown.
 */

const BookDetails = () => {
  const [bookDetailsClassName, setBookDetailsClassName] = useState<string>(
    "closed-book"
  );

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  const bookId: any = useSelector((state: any) => state.id.id);

  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  });

  let title: string = "";
  let author: string = "";
  let cover: string = "";
  let genres: Array<string> = [""];

  if (data) {
    title = data?.bookById?.title;
    author = data?.bookById?.author;
    cover = data?.bookById?.image;
    genres = data?.bookById?.genres;
  }

  // should only subscribe to changes in detailedBookId - because
  // now I think it will display a book on other changes in the store as well
  store.subscribe(() => displayDetailedView());

  const loginStatus: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  const displayDetailedView = () => {
    setBookDetailsClassName("opened-book");
  };

  const notImplemented = () => {
    alert("Not yet implemented :(");
  };

  return (
    <div className={bookDetailsClassName + " " + phonePage} id="book-details">
      <button
        className="close-button"
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

      {loginStatus ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};

export default BookDetails;
