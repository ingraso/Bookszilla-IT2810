import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeDetailedBook } from "../redux/actions";
import "../styles/BookDetails.css";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../assets/bookHandling";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var phonePage uses redux store to decide if the component should be shown.
 * @var bookId is the Id of the book that we want to see the details of.
 * @var data is a book retrieved from the database.
 */

const BookDetails = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const bookId: any = useSelector((state: any) => state.id.id);
  const { data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
  });

  const dispatch = useDispatch();

  const changeBookIdToEmptyString = () => {
    dispatch(changeDetailedBook(""));
  };

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

  const loginStatus: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  const notImplemented = () => {
    alert("Not yet implemented :(");
  };

  if (bookId !== "") {
    return (
      <div id="book-details" className={phonePage}>
        <button
          id="close-book-details"
          className="close-button"
          onClick={() => changeBookIdToEmptyString()}
        >
          <MdClose size="20px" />
        </button>
        <img src={cover} alt={"Book cover for" + title} />
        <p className="title">
          <b>Title:</b> <i>{title}</i>
        </p>
        <p className="author">
          <b>Author:</b> {author ? author : "Unknown"}
        </p>
        <p className="genre">
          <b>Genres:</b>
          {genres.map((genre) => {
            return <p key={genre}> {genre}</p>;
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
  } else {
    if (window.screen.width <= 850 && phonePage === "book") {
      return (
        <h3 id="fill-text-book-details">
          To display a book, go to "home" and press on a book
        </h3>
      );
    } else {
      return <></>;
    }
  }
};

export default BookDetails;
