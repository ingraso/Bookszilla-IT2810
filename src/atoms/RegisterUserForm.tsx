import React from "react";
import { MdClose } from "react-icons/md";

interface RegisterUserFormProps {
  toggleRegisterForm: () => void;
}

const RegisterUserForm = (props: RegisterUserFormProps) => {
  return (
    <div className="popup">
      <button
        id="popup-close-button"
        className="close-button"
        onClick={props.toggleRegisterForm}
      >
        <MdClose size="20px" />
      </button>
      <form>
        <label>Username</label>
        <br />
        <input
          name="username"
          type="text"
          placeholder="Type username"
          required
        />
        <label>Password</label> <br />
        <input
          name="password"
          type="password"
          placeholder="Type password"
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterUserForm;
