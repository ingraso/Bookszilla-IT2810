import React from "react";
import Header from "./atoms/Header";
import SearchFieldAndSort from "./containers/SearchFieldAndSort";
import FilterAndBooks from "./containers/FilterAndBooks";
import ToTop from "./atoms/ToTop";
import BookDetails from "./containers/BookDetails";
import Navbar from "./atoms/Navbar";
import "./styles/Global.css";

function App() {
  return (
    <div>
      <Header />
      <SearchFieldAndSort />
      <FilterAndBooks />
      <BookDetails />
      <ToTop />
      <Navbar />
    </div>
  );
}

export default App;
