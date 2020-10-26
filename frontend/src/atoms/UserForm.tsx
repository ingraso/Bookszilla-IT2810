import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { registerUser, signInUser } from "../assets/userHandling";

interface UserFormProps {
  isLoginForm: boolean;
  toggleRegisterForm?: () => void;
  toggleLoginForm?: () => void;
}

const UserForm = (props: UserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const validateInput = () => {
    if (props.isLoginForm) {
      if (username && password) {
        signInUser(username, password);
      }
    } else {
      if (
        username &&
        password &&
        passwordConfirmation &&
        password === passwordConfirmation
      ) {
        registerUser(username, password);
      }
    }
  };

  const handleInputChange = (e: any) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirm-password") {
      setPasswordConfirmation(e.target.value);
    }
  };

  return (
    <div id="popup">
      <div id="popup-content">
        <button
          id="popup-close-button"
          className="red-button"
          onClick={
            props.isLoginForm ? props.toggleLoginForm : props.toggleRegisterForm
          }
        >
          <MdClose size="20px" />
        </button>
        <h3>{props.isLoginForm ? "Sign in" : "Register user"}</h3>
        <form>
          <label>Username</label>
          <input
            id="username-input"
            name="username"
            value={username}
            type="text"
            placeholder="Type username"
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Password</label>
          <input
            id="password-input"
            name="password"
            value={password}
            type="password"
            placeholder="Type password"
            onChange={handleInputChange}
            required
          />
          <br />
          {props.isLoginForm ? null : (
            <>
              <label>Confirm password</label>
              <input
                id="confirm-password-input"
                name="confirm-password"
                value={passwordConfirmation}
                type="password"
                placeholder="Type password again"
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <br />
          <input type="submit" className="red-button" onClick={validateInput} />
        </form>
      </div>
    </div>
  );
};

export default UserForm;
