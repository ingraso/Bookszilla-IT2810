import React from "react";
import { MdSearch } from "react-icons/md";

/**
 * SearchField is a component for the search field itself and the
 * search button.
 */

const SearchField = () => {
  const updateSearch = () => {
    //TODO: update redux
  }

  return (
    <div id="search">
      <input
        type="text"
        id="search-bar"
        placeholder="Search for your favorite book"
      />
      <button className="red-button" id="search-button" onClick={updateSearch}>
        <MdSearch size="30px" />
      </button>
    </div>
  );
};

export default SearchField;
