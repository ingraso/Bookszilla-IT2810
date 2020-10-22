import React, { Dispatch, SetStateAction } from "react";
import "../styles/Header.css";

type HeaderProps = {
  changePage: Dispatch<SetStateAction<string>>;
};

/**
 * Header is a component containing every item in the header. What buttons
 * you see will depend on whethter or not you are logged in.
 */

const Header = ({ changePage }: HeaderProps) => {
  const name: string = "signed-in"; //Dette må antakeligvis bli en state, men endrer det når vi kommer så langt--------

  return (
    <header>
      <button id="title-button" onClick={() => changePage("main-page")}>
        <h3 id="title">[SETT INN EN GOD TITTEL HER]</h3>
      </button>
      <div className="header-right">
        <button className={name} id="sign-in">
          SIGN IN
        </button>
        <button className={name} id="sign-out">
          SIGN OUT
        </button>
        <button
          className={name}
          id="profile"
          onClick={() => changePage("profile-page")}
        >
          PROFILE
        </button>
      </div>
    </header>
  );
};

export default Header;
