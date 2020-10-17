import React from "react";
import Header from "./Atoms/Header";
import SearchFieldAndSort from "./Containers/SearchFieldAndSort";
import FilterAndBooks from "./Containers/FilterAndBooks";
import ToTop from "./Atoms/ToTop";
import BookDetails from "./Containers/BookDetails";
import "./Styles/Global.css";

function App() {
  return (
    <div>
      <Header />
      <SearchFieldAndSort />
      <FilterAndBooks />
      <BookDetails />
      <ToTop />
    </div>
  );
}

export default App;
