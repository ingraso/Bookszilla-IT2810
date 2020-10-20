import React from "react";
import FilterMenu from "./FilterMenu";
import "../Styles/FilterAndBooks.css";

/**
 * FilterAndBooks is a component containing the filter menu and the books.
 */

const FilterAndBooks = () => {
  // className="home" må gjøres om til en state i redux

  return (
    <div id="flex-container">
      <FilterMenu />
      <div id="book-container" className="book">
        Hei
      </div>
    </div>
  );
};

export default FilterAndBooks;
