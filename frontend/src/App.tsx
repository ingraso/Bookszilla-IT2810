import React, { useState } from "react";
import Header from "./containers/Header";
import Profile from "./containers/Profile";
import SearchFieldAndSort from "./containers/SearchFieldAndSort";
import FilterAndBooks from "./containers/FilterAndBooks";
import ToTop from "./atoms/ToTop";
import BookDetails from "./containers/BookDetails";
import Navbar from "./atoms/Navbar";
import "./styles/Global.css";
import "./styles/App.css";

/**
 * App contains all the other components of the webpage.
 * @var pageShowing is used for screens where the width >= 850px, to decide if
 * the profile-page or the main-page should be shown.
 */

function App() {
  const [pageShowing, changePageShowing] = useState("main-page");

  return (
    <div>
      <Header changePage={changePageShowing} />
      <div>
        {pageShowing === "main-page" ? (
          <div id="main-page-container" className={pageShowing}>
            <SearchFieldAndSort />
            <FilterAndBooks />
            <BookDetails />
          </div>
        ) : (
          <div id="profile-page-container" className={pageShowing}>
            <Profile />
          </div>
        )}
      </div>
      <ToTop />
      <Navbar changePage={changePageShowing} />
    </div>
  );
}

export default App;
