import React, { useState } from "react";
import store from "../redux/store";
import "../styles/Header.css";
import RegisterUserForm from "./RegisterUserForm";

/**
 * Header is a component containing every item in the header. What buttons
 * you see will depend on whethter or not you are logged in.
 * @var isLoggedIn keeps track of if the user is logged in or not.
 */

// store.dispatch(changeLoginStatus(true));

const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState<boolean>(
    store.getState().loginStatusReducer.loginStatus
  );

  const [displayRegisterForm, updateDisplayRegisterForm] = useState<boolean>(
    false
  );

  store.subscribe(() =>
    setIsLoggedIn(store.getState().loginStatusReducer.loginStatus)
  );

  const toggleRegisterForm = () => {
    updateDisplayRegisterForm(!displayRegisterForm);
  };

  return (
    <header>
      <h3 id="title">[SETT INN EN GOD TITTEL HER]</h3>
      <div className="header-right">
        {isloggedIn ? (
          <button id="profile-button">PROFILE</button>
        ) : (
          <button id="register-button" onClick={toggleRegisterForm}>
            REGISTER
          </button>
        )}
        {isloggedIn ? (
          <button className="login-buttons">SIGN OUT</button>
        ) : (
          <button className="login-buttons">SIGN IN</button>
        )}
        {displayRegisterForm ? (
          <RegisterUserForm toggleRegisterForm={toggleRegisterForm} />
        ) : null}
      </div>
    </header>
  );
};

export default Header;
