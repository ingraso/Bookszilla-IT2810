import React from "react";
import FilterMenu from "./FilterMenu";
import "../Styles/FilterAndBooks.css";
import { useSelector } from "react-redux";

/**
 * FilterAndBooks is a component containing the filter menu and the books.
 * @var phonePage is used to decide if the book-container should be shown.
 */

const FilterAndBooks = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage);

  return (
    <div id="flex-container">
      <FilterMenu />
      <div id="book-container" className={phonePage}>
        Hei
      </div>
    </div>
  );
};

export default FilterAndBooks;
