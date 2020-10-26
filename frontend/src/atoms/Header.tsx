import React from "react";
import "../styles/Header.css";

/**
 * Header is a component containing every item in the header. What buttons
 * you see will depend on whethter or not you are logged in.
 */

const Header = () => {
  const name: string = "signed-in"; //Dette må antakeligvis bli en state, men endrer det når vi kommer så langt--------

  return (
    <header>
      <h3 id="title">[SETT INN EN GOD TITTEL HER]</h3>
      <div className="header-right">
        <button className={name} id="sign-in">
          SIGN IN
        </button>
        <button className={name} id="sign-out">
          SIGN OUT
        </button>
        <button className={name} id="profile">
          PROFILE
        </button>
      </div>
    </header>
  );
};

export default Header;
