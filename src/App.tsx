import React, { useState } from "react";
import Header from "./atoms/Header";
import Profile from "./containers/Profile";
import SearchFieldAndSort from "./containers/SearchFieldAndSort";
import FilterAndBooks from "./containers/FilterAndBooks";
import ToTop from "./atoms/ToTop";
import BookDetails from "./containers/BookDetails";
import "./styles/Global.css";
import "./styles/App.css";

function App() {

  const [pageShowing, changePageShowing] = useState("profile-page")

  return (
    <div>
      <Header changePage={changePageShowing}/>
      <div id="profile-page-container" className={pageShowing}>
        <Profile />
      </div>
      <div id="main-page-container" className={pageShowing}>
        <SearchFieldAndSort />
        <FilterAndBooks />
        <BookDetails />
      </div>
      <ToTop />
    </div>
  );
}

export default App;
