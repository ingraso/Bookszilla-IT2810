import React from "react";
import Header from "./Atoms/Header";
import SearchFieldAndSort from "./Containers/SearchFieldAndSort";
import FilterAndBooks from "./Containers/FilterAndBooks";
import ToTop from "./Atoms/ToTop";
import BookDetails from "./Containers/BookDetails";
import Navbar from "./Atoms/Navbar";
import "./Styles/Global.css";

function App() {

  return (
    <div>
      <Header />
      <SearchFieldAndSort />
      <FilterAndBooks />
      <BookDetails />
      <ToTop />
      <Navbar/>
    </div>
  );
}

export default App;
