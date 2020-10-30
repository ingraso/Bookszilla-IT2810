import React from "react";
import FilterMenu from "./FilterMenu";
import "../styles/FilterAndBooks.css";
import { BookContainer } from "./BookContainer";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_BY_SEARCH } from "../assets/queries";
import { useSelector } from "react-redux";

/**
 * FilterAndBooks is a component containing the filter menu and the books.
 */

const FilterAndBooks = () => {
  const bookList: string[] = [];

  return (
    <div id="flex-container">
      <FilterMenu />
      <BookContainer bookList={bookList} />
    </div>
  );
};

export default FilterAndBooks;
