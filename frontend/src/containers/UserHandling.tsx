import React, { useState } from "react";
import UserForm from "../atoms/UserForm";

const UserHandling = () => {
  const [displayRegisterForm, changeDisplayRegisterForm] = useState<boolean>(
    false
  );

  return (
    <div id="userHandling">
      {displayRegisterForm ? (
        <>
          <UserForm isLoginForm={false} />
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
          <UserForm isLoginForm={true} />
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
