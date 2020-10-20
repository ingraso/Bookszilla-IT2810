import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import "../Styles/Navbar.css";

/**
 * Navbar is a component for the navigation bar that will be shown on
 * screens with width <= 850px.
 */

const Navbar = () => {
  // Need logic for changing the classNames based on redux
  // Must alså check for whether or not a person is signed in. There is
  // no logic or css for this yet

  return (
    <div id="navbar">
      <button id="navbar-profile" className="book">
        <MdAccountCircle size="30px" />
      </button>
      <button id="navbar-filter" className="book">
        <FiFilter size="30px" />
      </button>
      <button id="navbar-home" className="book">
        <MdHome size="30px" />
      </button>
      <button id="navbar-book" className="book">
        <BsBook size="30px" />
      </button>
      <button id="navbar-sign-out" className="book">
        <BsBoxArrowRight size="30px" />
      </button>
    </div>
  );
};

export default Navbar;
