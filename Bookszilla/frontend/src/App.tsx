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
 * App is at the top of the components hierarchy of the webpage.
 * @var pageShowing is used for screens where the width is > 850px, to decide if
 * the profile-page or the main-page should be shown. If pageShowing === "main-page"
 * the main-page with searchfield, filter, books ++ is shown, and if
 * pageShowing === "profile-page", the profile-page is shown.
 */

const App = () => {
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
};

export default App;
