import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import "../styles/Header.css";
import UserForm from "../atoms/UserForm";

/**
 * Header is a component containing every item in the header. What buttons
 * you see will depend on whethter or not you are logged in.
 * @var isLoggedIn keeps track of if the user is logged in or not.
 * @var displayRegisterForm displays the form if the user presses the Register
 *    button, and removes on valid submit or closing the form.
 * @var displayLoginForm displays the form if the user presses the Sign in
 *    button, and removes on valid submit or closing the form.
 */

const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState<boolean>();
  const [displayRegisterForm, updateDisplayRegisterForm] = useState<boolean>(
    false
  );
  const [displayLoginForm, updateDisplayLoginForm] = useState<boolean>(false);

  const toggleRegisterForm = () => {
    updateDisplayRegisterForm(!displayRegisterForm);
  };

  const toggleLoginForm = () => {
    updateDisplayLoginForm(!displayLoginForm);
  };

  const loginStatus: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  store.subscribe(() => setIsLoggedIn(loginStatus));

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
          <button className="login-buttons" onClick={toggleLoginForm}>
            SIGN IN
          </button>
        )}
        {displayRegisterForm ? (
          <UserForm
            isLoginForm={false}
            toggleRegisterForm={toggleRegisterForm}
          />
        ) : null}
        {displayLoginForm ? (
          <UserForm isLoginForm={true} toggleLoginForm={toggleLoginForm} />
        ) : null}
      </div>
    </header>
  );
};

export default Header;
