import React from "react";
import SearchField from "../Atoms/SearchField";
import { MdSwapVert } from "react-icons/md";
import "../Styles/SearchField.css";

/**
 * SearchFiledAndSort is a component that contains the searchfield and the
 * button and dropdown for sorting elements.
 */

const SearchFieldAndSort = () => {
  return (
    <div id="search-field-and-sort-container" className="book">
      <SearchField />
      <div className="dropdown">
        <button className="dropdown-button red-button">
          <MdSwapVert size="30px" />
        </button>
        <div className="dropdown-content">
          <button className="red-button">Title (A-Z)</button>
          <button className="red-button">Title (Z-A)</button>
          <button className="red-button">Published (new-old)</button>
          <button className="red-button">Published (old-new)</button>
        </div>
      </div>
    </div>
  );
};

export default SearchFieldAndSort;
