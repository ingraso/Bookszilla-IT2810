import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "../redux/actions";
import "../styles/UserForm.css";

interface UserFormProps {
  isLoginForm: boolean;
  toggleForm: () => void;
}

const API_URL = "http://localhost:3002/auth/";

const UserForm = (props: UserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [correctFormInput, setCorrectFormInput] = useState<string>("");

  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);
  const dispatch = useDispatch();

  const validateInput = (e: any) => {
    e.preventDefault();

    if (username && password) {
      if (props.isLoginForm) {
        registerUser();
      } else {
        if (passwordConfirmation && password === passwordConfirmation) {
          registerUser();
        } else
          setCorrectFormInput("Password and Confirmed password do not match!");
      }
    } else setCorrectFormInput("Please fill out all fields.");
  };

  const registerUser = () => {
    fetch(props.isLoginForm ? API_URL + "login" : API_URL + "register", {
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
          dispatch(changeLoginStatus(true));
          props.toggleForm();

          return res.json();
        }
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
    setCorrectFormInput("");
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
        <b>{correctFormInput}</b>
        <br />
        <input type="submit" className="red-button" onClick={validateInput} />
      </form>
    </div>
  );
};

export default UserForm;
