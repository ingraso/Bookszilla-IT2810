import React from "react";
import Checkbox from "../atoms/Checkbox";
import "../styles/FilterMenu.css";

/**
 * FilterMenu is is a component that shows the different Checkboxes you can
 * choose between.
 */

const FilterMenu = () => {
  return (
    <div id="filter-menu">
      <label>LANGUAGE</label>
      <Checkbox text="English" />
      <Checkbox text="Spanish" />

      <label>GENRE</label>
      <Checkbox text="Romace" />
      <Checkbox text="Horror" />

      <label>PUBLISHER</label>
      <Checkbox text="Wiley" />
      <Checkbox text="Aschehoug" />
    </div>
  );
};

export default FilterMenu;
