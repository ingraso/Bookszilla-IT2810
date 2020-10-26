import React from "react";

const UserHandling = () => {
  const displayLoginForm = () => {};

  const displayRegisterForm = () => {};
  return (
    <>
      <button onClick={displayLoginForm}>Sign in to existing user</button>
      <button onClick={displayRegisterForm}>Create new user</button>
    </>
  );
};

export default UserHandling;
