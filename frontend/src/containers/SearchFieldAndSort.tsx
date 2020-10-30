import React from "react";
import SearchField from "../atoms/SearchField";
import { MdSwapVert } from "react-icons/md";
import "../styles/SearchField.css";
import { useSelector, useDispatch } from "react-redux";
import { updateSortBy, changeBookPage } from "../redux/actions";

/**
 * SearchFiledAndSort is a component that contains the searchfield and the
 * button and dropdown for sorting elements.
 * @var phonePage is used to decide if the search-field and sort-button
 * should be shown.
 * @var bookPage is used to start at page 0 again when we search for something new.
 */

const SearchFieldAndSort = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const bookPage: any = useSelector((state: any) => state.bookPage.bookPage);
  const dispatch = useDispatch();

  const updateSort = (sortBy: string) => {
    dispatch(updateSortBy(sortBy));
    if (bookPage > 0) {
      dispatch(changeBookPage(0));
    }
  };

  return (
    <div id="search-field-and-sort-container" className={phonePage}>
      <SearchField />
      <div className="dropdown">
        <button className="dropdown-button red-button">
          <MdSwapVert size="30px" />
        </button>
        <div className="dropdown-content">
          <button
            className="red-button"
            onClick={() => {
              updateSort("title");
            }}
          >
            Title (A-Z)
          </button>
          <button
            className="red-button"
            onClick={() => {
              updateSort("-title");
            }}
          >
            Title (Z-A)
          </button>
          <button
            className="red-button"
            onClick={() => {
              updateSort("author");
            }}
          >
            Author (A-Z)
          </button>
          <button
            className="red-button"
            onClick={() => {
              updateSort("-author");
            }}
          >
            Author (Z-A)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFieldAndSort;
