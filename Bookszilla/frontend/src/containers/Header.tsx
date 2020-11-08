import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Header.css";
import UserForm from "../atoms/UserForm";
import { changeLoginStatus } from "../redux/actions";

type HeaderProps = {
  changePage: Dispatch<SetStateAction<string>>;
};

/**
 * Header is a component containing every item in the header. What buttons
 * you see will depend on whether or not you are logged in.
 * @var isLoggedIn keeps track of if the user is logged in or not.
 * @var displayRegisterForm displays the form if the user presses the Register
 *    button, and removes on valid submit or closing the form.
 * @var displayLoginForm displays the form if the user presses the Sign in
 *    button, and removes on valid submit or closing the form.
 */

const Header = ({ changePage }: HeaderProps) => {
  const loginStatus: boolean = useSelector(
    (state: any) => state.loginStatus.loginStatus
  );

  const [displayRegisterForm, updateDisplayRegisterForm] = useState<boolean>(
    false
  );
  const [displayLoginForm, updateDisplayLoginForm] = useState<boolean>(false);

  const toggleRegisterForm = () => {
    updateDisplayRegisterForm(!displayRegisterForm);
    updateDisplayLoginForm(false);
  };

  const toggleLoginForm = () => {
    updateDisplayLoginForm(!displayLoginForm);
    updateDisplayRegisterForm(false);
  };

  const dispatch = useDispatch();

  const signOut = () => {
    changePage("main-page");
    dispatch(changeLoginStatus(false, ""));
  };

  return (
    <header>
      <h1 id="title" onClick={() => changePage("main-page")}>
        Bookszilla
      </h1>
      <div className="header-right">
        {loginStatus ? (
          <button id="profile" onClick={() => changePage("profile-page")}>
            PROFILE
          </button>
        ) : (
          <button id="register-button" onClick={toggleRegisterForm}>
            REGISTER
          </button>
        )}
        {loginStatus ? (
          <button
            id="sign-out-button"
            className="login-buttons"
            onClick={signOut}
          >
            SIGN OUT
          </button>
        ) : (
          <button
            id="sign-in-button"
            className="login-buttons"
            onClick={toggleLoginForm}
          >
            SIGN IN
          </button>
        )}
      </div>
      {displayRegisterForm ? (
        <div id="popup">
          <div id="popup-content">
            <UserForm isLoginForm={false} toggleForm={toggleRegisterForm} />
          </div>
        </div>
      ) : null}
      {displayLoginForm ? (
        <div id="popup">
          <div id="popup-content">
            <UserForm isLoginForm={true} toggleForm={toggleLoginForm} />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
