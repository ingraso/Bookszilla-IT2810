import React from "react";
import FilterMenu from "./FilterMenu";
import "../styles/FilterAndBooks.css";
import { BookContainer } from "./BookContainer";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_BY_SEARCH } from "../assets/queries";
import { useSelector } from "react-redux";
import { BOOK_URL } from "../index";

/**
 * FilterAndBooks is a component containing the filter menu and the books.
 * @var bookPage is used to know which page of books the user is currently seeing.
 * @var search is the string used to search for authors or books.
 * @var filters is a list containing the current filers being used.
 * @var sortBy is what the resulting list of books should be sorted by.
 */

const FilterAndBooks = () => {
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const search: string = useSelector((state: any) => state.search.searchString);
  const filters: string[] = useSelector((state: any) => state.filter.filters);
  const sortBy: string = useSelector((state: any) => state.sortBy.sortBy);
  const { data } = useQuery(GET_BOOKS_BY_SEARCH, {
    variables: {
      search: search,
      filters: filters,
      page: bookPage,
      size: 18,
      sortBy: sortBy,
    },
    context: { uri: BOOK_URL },
  });

  return (
    <div id="flex-container">
      <FilterMenu />
      <BookContainer bookData={data?.booksBySearch} id="main-page-book-container" />
    </div>
  );
};

export default FilterAndBooks;
