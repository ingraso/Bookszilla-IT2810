import React from "react";
import * as reactModule from "react";
import * as reduxModule from "react-redux";
import { cleanup } from "@testing-library/react";
import ShallowRenderer from "react-shallow-renderer";
import { Book } from "../atoms/Book";
import UserHandling from "../containers/UserHandling";
import UserForm from "../atoms/UserForm";
import { changeLoginStatus } from "../redux/actions";
import loginStatusReducer, {
  initialState,
} from "../redux/reducers/loginReducer";

afterEach(cleanup);

/**
 * Snapshot tests for Login. Are testing the reducer changeLoginStatus and the components UserHandling and UserForm.
 * The tests are inspired by:
 * Handle hooks: https://medium.com/@codegagan/react-functional-component-testing-by-mocking-hooks-55003c7ba0d7
 * Reducers: https://medium.com/@bryanfillmer/reducer-snapshots-for-rapid-development-2ede745b8c40
 */

describe("Snapshot test of reducer", () => {
  it("should give loginStatus true", () => {
    const actual = loginStatusReducer(initialState, changeLoginStatus(true));
    expect(actual).toMatchSnapshot();
  });
});

describe("Snapshot test of UserHandling when displayRegisterForm=true", () => {
  it("should render a userForm containing the text 'Already got a user? Sign in below!', and a button with the text 'Sign in to existing user'", () => {
    const registerFormValue = true;
    reactModule.useState = jest.fn((initialRegisterFormValue) => [
      registerFormValue,
      () => {},
    ]);
    const renderer = new ShallowRenderer();
    const container = renderer.render(<UserHandling />);
    expect(container).toMatchSnapshot();
  });
});

describe("Snapshot test of UserHandling when displayRegisterForm=false", () => {
  it("should render a userForm containing the text 'Don't have a user? Create one!', and a button with the text 'Create new user'", () => {
    const registerFormValue = false;
    reactModule.useState = jest.fn((initialRegisterFormValue) => [
      registerFormValue,
      () => {},
    ]);
    const renderer = new ShallowRenderer();
    const container = renderer.render(<UserHandling />);
    expect(container).toMatchSnapshot();
  });
});

describe("Snapshot test of UserForm when props.isLoginForm=true", () => {
  let container;
  let setUsername;
  let setPassword;
  let setPasswordConfirmation;
  let setCorrectFormInput;

  beforeEach(() => {
    setUsername = jest.fn((x) => {});
    setPassword = jest.fn((x) => {});
    setPasswordConfirmation = jest.fn((x) => {});
    setCorrectFormInput = jest.fn((x) => {});

    reactModule.useState = jest
      .fn()
      .mockImplementationOnce((x) => [x, setUsername])
      .mockImplementationOnce((x) => [x, setPassword])
      .mockImplementationOnce((x) => [x, setPasswordConfirmation])
      .mockImplementationOnce((x) => [x, setCorrectFormInput]);
  });

  it("should render with an <h3> with text 'Sign in', and no field for confirming password", () => {
    reduxModule.useSelector = jest.fn(() => {});
    reduxModule.useDispatch = jest.fn(() => {});
    const props = {
      isLoginForm: true,
      toggleForm: () => {},
    };
    const renderer = new ShallowRenderer();
    container = renderer.render(<UserForm {...props} />);
    expect(container).toMatchSnapshot();
  });
});

describe("Snapshot test of UserForm when props.isLoginForm=false", () => {
  let container;
  let setUsername;
  let setPassword;
  let setPasswordConfirmation;
  let setCorrectFormInput;

  beforeEach(() => {
    setUsername = jest.fn((x) => {});
    setPassword = jest.fn((x) => {});
    setPasswordConfirmation = jest.fn((x) => {});
    setCorrectFormInput = jest.fn((x) => {});

    reactModule.useState = jest
      .fn()
      .mockImplementationOnce((x) => [x, setUsername])
      .mockImplementationOnce((x) => [x, setPassword])
      .mockImplementationOnce((x) => [x, setPasswordConfirmation])
      .mockImplementationOnce((x) => [x, setCorrectFormInput]);
  });

  it("should render with an <h3> with text 'Register user', and a field for confirming password", () => {
    reduxModule.useSelector = jest.fn(() => {});
    reduxModule.useDispatch = jest.fn(() => {});
    const props = {
      isLoginForm: false,
      toggleForm: () => {},
    };
    const renderer = new ShallowRenderer();
    container = renderer.render(<UserForm {...props} />);
    expect(container).toMatchSnapshot();
  });
});

// Snapshot test for Book:

describe("Snapshot test for book", () => {
  it("should render a book with title 'Harry Potter and the Sorcerers stone'", () => {
    const props = {
      id: "f32i30htrngf",
      title: "Harry Potter and the Sorcerers stone",
      author: "J. K. Rowling",
      cover: "urlforimage.com",
    };
    const dispatchValue = () => {};
    reduxModule.useDispatch = jest.fn(dispatchValue);
    const renderer = new ShallowRenderer();
    const container = renderer.render(<Book {...props} />);
    expect(container).toMatchSnapshot();
  });
});
