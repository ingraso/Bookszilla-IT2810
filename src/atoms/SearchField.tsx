import React from "react";
import { MdSearch } from "react-icons/md";

/**
 * SearchField is a component for the search field itself and the
 * search button.
 */

const SearchField = () => {
  return (
    <div id="search">
      <input
        type="text"
        id="search-bar"
        placeholder="Search for your favorite books"
      />
      <button className="red-button" id="search-button">
        <MdSearch size="30px" />
      </button>
    </div>
  );
};

export default SearchField;
