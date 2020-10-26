import React, { Dispatch, SetStateAction } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { BsBook, BsBoxArrowInRight } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import "../styles/Navbar.css";
import { changeLoginStatus, changePhonePage } from "../redux/actions";
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

  const loginStatus: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // function to change which page is shown
  function clickButtonOnNavbar(toSide: string) {
    dispatch(changePhonePage(toSide));
    toSide === "profile" ? changePage("profile-page") : changePage("main-page");
    if (toSide === "home") {
      topFunction();
    }
  }

  const displaySignIn = () => {
    dispatch(changePhonePage("login"));
  };

  return (
    <div id="navbar">
      <button
        id="navbar-profile"
        className={phonePage}
        onClick={() => clickButtonOnNavbar("profile")}
      >
        <MdAccountCircle size="30px" />
      </button>
      <button
        id="navbar-filter"
        className={phonePage}
        onClick={() => clickButtonOnNavbar("filter")}
      >
        <FiFilter size="30px" />
      </button>
      <button
        id="navbar-home"
        className={phonePage}
        onClick={() => clickButtonOnNavbar("home")}
      >
        <MdHome size="30px" />
      </button>
      <button
        id="navbar-book"
        className={phonePage}
        onClick={() => clickButtonOnNavbar("book")}
      >
        <BsBook size="30px" />
      </button>
      {loginStatus ? (
        <button
          id="navbar-sign-out"
          className={phonePage.phonePage}
          onClick={() => dispatch(changeLoginStatus(false))}
        >
          <BsBoxArrowRight size="30px" />
        </button>
      ) : (
        <button id="navbar-sign-in" className={phonePage.phonePage}>
          <BsBoxArrowInRight size="30px" onClick={() => displaySignIn} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
