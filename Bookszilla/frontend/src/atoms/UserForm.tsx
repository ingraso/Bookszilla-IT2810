import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "../redux/actions";
import "../styles/UserForm.css";
import { AUTH_URL } from "../index";

interface UserFormProps {
  isLoginForm: boolean;
  toggleForm: () => void;
}

/**
 * Form to handle user authentication (register or login).
 *
 * @param isLoginForm states whether the form to be displayed
 *    is a login form or a register form.
 * @param toggleForm toggles the form on submit or escaping.
 * @var username the data typed into the username-input
 * @var password the data typed into the password-input
 * @var passwordConfirmation the data typed into the password-
 *    confirmation-input
 * @var formFeedback is the feedback given to the user on submit.
 */
const UserForm = (props: UserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [formFeedback, setFormFeedback] = useState<string>("");

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const dispatch = useDispatch();

  const validateInput = (e: any) => {
    e.preventDefault();

    if (username && password) {
      if (props.isLoginForm) {
        authenticateUser();
      } else {
        if (passwordConfirmation && password === passwordConfirmation) {
          authenticateUser();
        } else setFormFeedback("Password and Confirmed password do not match!");
      }
    } else setFormFeedback("Please fill out all fields.");
  };

  const authenticateUser = () => {
    fetch(props.isLoginForm ? AUTH_URL + "login" : AUTH_URL + "register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (props.isLoginForm) {
          setFormFeedback("Invalid username or password");
        }
      })
      .then((data) => {
        dispatch(changeLoginStatus(true, data.data.token));
        props.toggleForm();
        return data;
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e: any) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirm-password") {
      setPasswordConfirmation(e.target.value);
    }
    setFormFeedback("");
  };

  return (
    <div className={phonePage}>
      <button
        id="popup-close-button"
        className="red-button"
        onClick={props.toggleForm}
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
        {/* Is only visible on register form */}
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
        <b>{formFeedback}</b>
        <br />
        <button id="user-submit" className="red-button" onClick={validateInput}>
          {props.isLoginForm ? "Sign in" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
