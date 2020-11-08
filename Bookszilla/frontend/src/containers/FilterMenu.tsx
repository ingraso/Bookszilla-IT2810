import React from "react";
import { useSelector } from "react-redux";
import Checkbox from "../atoms/Checkbox";
import "../styles/FilterMenu.css";

/**
 * FilterMenu is is a component that shows the different Checkboxes you can
 * choose between.
 * @var phonePage is used to decide if the filter-component should be shown.
 */

const FilterMenu = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  return (
    <div id="filter-menu" className={phonePage}>
      <label>GENRES TO SEE</label>
      <Checkbox id="calendar" text="Calendars" />
      <Checkbox id="comic" text="Comics & Graphic Novels" />
      <Checkbox id="humor" text="Humor & Entertainment" />
      <Checkbox id="literature" text="Literature & Fiction" />
      <Checkbox id="mystery" text="Mystery, Thriller & Suspense" />
      <Checkbox id="romance" text="Romance" />
      <Checkbox id="fantasy" text="Science Fiction & Fantasy" />
      <Checkbox id="test" text="Test Preparation" />
    </div>
  );
};

export default FilterMenu;
