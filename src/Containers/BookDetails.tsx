import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import "../styles/BookDetails.css";

/**
 * BookDetail is a component that will show the details of a chosen book.
 * @var bookDetailsClassName is used to choose if details of a book is shown.
 * @var phonePage uses redux store to decide if the component should be shown.
 */

const BookDetails = () => {
  const [bookDetailsClassName, setBookDetailsClassName] = useState<string>(
    "opened-book"
  );

  const phonePage: any = useSelector((state: any) => state.phonePage);

  return (
    <div className={bookDetailsClassName + " " + phonePage} id="book-details">
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
