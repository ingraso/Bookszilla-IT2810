import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeDetailedBook } from "../redux/actions";
import "../styles/BookDetails.css";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../api/queries";
import { BOOK_URL } from "../index";
import BookListButtons from "../atoms/BookListButtons";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var phonePage uses redux store to decide if the component should be shown.
 * @var bookId is the id of the book currently being displayed.
 * @var token is the current users jwt token.
 * @var data is a book retrieved from the database.
 */

const BookDetails = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const bookId: any = useSelector((state: any) => state.id.id);

  const { data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
    context: { uri: BOOK_URL },
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

        {loginStatus ? <BookListButtons /> : null}
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
      return null;
    }
  }
};

export default BookDetails;
