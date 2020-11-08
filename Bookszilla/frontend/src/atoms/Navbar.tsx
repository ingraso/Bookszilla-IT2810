import React, { Dispatch, SetStateAction } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import "../styles/Navbar.css";
import { changePhonePage } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

type NavbarProps = {
  changePage: Dispatch<SetStateAction<string>>;
};

/**
 * Navbar is a component for the navigation bar that will be shown on
 * screens with width <= 850px.
 * @var phonePage uses redux store to decide which button should be marked.
 * @var dispatch is used to move between different pages on click.
 */

const Navbar = ({ changePage }: NavbarProps) => {
  const dispatch = useDispatch();

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const changeDisplayedPhonePage = (toSide: string) => {
    dispatch(changePhonePage(toSide));
    toSide === "profile" ? changePage("profile-page") : changePage("main-page");
    if (toSide === "home") {
      topFunction();
    }
  };

  return (
    <div id="navbar">
      <button
        id="navbar-filter"
        className={phonePage}
        onClick={() => changeDisplayedPhonePage("filter")}
      >
        <FiFilter size="30px" />
      </button>
      <button
        id="navbar-home"
        className={phonePage}
        onClick={() => changeDisplayedPhonePage("home")}
      >
        <MdHome size="30px" />
      </button>
      <button
        id="navbar-book"
        className={phonePage}
        onClick={() => changeDisplayedPhonePage("book")}
      >
        <BsBook size="30px" />
      </button>
      <button
        id="navbar-profile"
        className={phonePage}
        onClick={() => changeDisplayedPhonePage("profile")}
      >
        <MdAccountCircle size="30px" />
      </button>
    </div>
  );
};

export default Navbar;
