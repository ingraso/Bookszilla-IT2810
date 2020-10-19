import React from "react";
import FilterMenu from "./FilterMenu";
import "../styles/FilterAndBooks.css";
import { BookContainer } from "./BookContainer";

/**
 * FilterAndBooks is a component containing the filter menu and the books.
 */

const FilterAndBooks = () => {
  return (
    <div id="flex-container">
      <FilterMenu />
      <BookContainer />
    </div>
  );
};

export default FilterAndBooks;
