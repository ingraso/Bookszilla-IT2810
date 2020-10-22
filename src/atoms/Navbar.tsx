import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import "../styles/Navbar.css";
import { changePhonePage } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

/**
 * Navbar is a component for the navigation bar that will be shown on
 * screens with width <= 850px.
 * @var phonePage uses redux store to decide which button should me marked.
 * @var dispatch is used to move between different pages on click.
 */

const Navbar = () => {
  const dispatch = useDispatch();

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function clickHome() {
    dispatch(changePhonePage("home"));
    topFunction();
  }

  return (
    <div id="navbar">
      <button
        id="navbar-profile"
        className={phonePage}
        onClick={() => dispatch(changePhonePage("profile"))}
      >
        <MdAccountCircle size="30px" />
      </button>
      <button
        id="navbar-filter"
        className={phonePage}
        onClick={() => dispatch(changePhonePage("filter"))}
      >
        <FiFilter size="30px" />
      </button>
      <button id="navbar-home" className={phonePage} onClick={clickHome}>
        <MdHome size="30px" />
      </button>
      <button
        id="navbar-book"
        className={phonePage}
        onClick={() => dispatch(changePhonePage("book"))}
      >
        <BsBook size="30px" />
      </button>
      <button id="navbar-sign-out" className={phonePage}>
        <BsBoxArrowRight size="30px" />
      </button>
    </div>
  );
};

export default Navbar;
