import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "../Styles/BookDetails.css";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var bookDetailsClassName is used to choose if details of a book is shown.
 */

const BookDetails = () => {
  const [bookDetailsClassName, setBookDetailsClassName] = useState<string>(
    "opened-book"
  );

  // className="home" må gjøres om til en state i redux

  return (
    <div className={bookDetailsClassName + " book"} id="book-details">
      <button
        id="close-button"
        onClick={() => setBookDetailsClassName("closed-book")}
      >
        <MdClose size="20px" />
      </button>
      [Sett inn detaljer om boken her. Book-details er en flexboks for å sette
      inn ting i, med flex-direction column. Btw: boksen scroller ved overflow]
    </div>
  );
};

export default BookDetails;
