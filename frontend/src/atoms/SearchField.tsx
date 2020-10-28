import React, { useState } from "react";
import { changeSearch } from "../redux/actions";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";

/**
 * SearchField is a component for the search field itself and the
 * search button.
 * @var searchValue keeps the value to search on, and is updated when the input is changed.
 */

const SearchField = () => {
  const [searchValue, changeSearchValue] = useState<string>("");
  const dispatch = useDispatch();

  const updateSearch = () => {
    dispatch(changeSearch(searchValue));
  };

  const handleInputChange = (e: any) => {
    changeSearchValue(e.target.value);
  };

  return (
    <div id="search">
      <input
        type="text"
        id="search-bar"
        placeholder="Search for your favorite book"
        onChange={handleInputChange}
      />
      <button className="red-button" id="search-button" onClick={updateSearch}>
        <MdSearch size="30px" />
      </button>
    </div>
  );
};

export default SearchField;
