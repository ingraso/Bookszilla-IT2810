import React, { useState } from "react";
import UserForm from "../atoms/UserForm";

/**
 * Display either register or login form on phone view.
 * @var displayRegisterForm states if the form to be shown is register or login.
 */
const UserHandling = () => {
  const [displayRegisterForm, changeDisplayRegisterForm] = useState<boolean>(
    false
  );

  return (
    <div id="userHandling">
      {displayRegisterForm ? (
        <>
          <UserForm isLoginForm={false} toggleForm={() => {}} />
          Already got a user? Sign in below!
          <button
            id="userHandlingLogin"
            onClick={() => changeDisplayRegisterForm(false)}
            className="red-button"
          >
            Sign in to existing user
          </button>
        </>
      ) : (
        <>
          <UserForm isLoginForm={true} toggleForm={() => {}} />
          Don't have a user? Create one!
          <button
            id="userHandlingRegister"
            onClick={() => changeDisplayRegisterForm(true)}
            className="red-button"
          >
            Create new user
          </button>
        </>
      )}
    </div>
  );
};

export default UserHandling;
