import React from "react";
import { MdSearch } from "react-icons/md";

/**
 * SearchField is a component for the search field itself and the
 * search button.
 */

const SearchField = () => {
  /**
   * className skal byttes ut med state fra redux når jeg finner ut av det
   */

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
