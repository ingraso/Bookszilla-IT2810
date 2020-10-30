import React, {PropsWithoutRef} from "react";
//const React = require("react");
//const { render, fireEvent, waitForElement } = require("@testing-library/react")
import { render, fireEvent, waitForElement } from "@testing-library/react";
//import { render, unmountComponentAtNode } from "react-dom";
//import { act } from "react-dom/test-utils";
import {Book, BookProps} from "../atoms/Book";
//const { Book } = require("../atoms/Book");

/*let container: any = null;
beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});*/

/*describe("<Book />", () => {
  test("renders with the correct information", async () => {
    act(() => {
      render(<Book key="123" id="123" title="Mock Title" author="Mock Author" cover="../../public/sunset.jpg"/>, container)
    });
    expect(container.textContent).contain("Mock Title");
    expect(container.textContent).contain("Mock Author");
    expect(container.image).contains("../../public/sunset.jpg");
  });
});*/

function renderSingleBook(props: Partial<BookProps> = {}) {
  const defaultProps: BookProps = {
    id: "",
    title: "",
    author: "",
    cover: "",
  };
  return render(<Book {...defaultProps} {...props} />);
}

describe("<Book />", () => {
  test("renders with the correct title", async () => {
    const {findByTestId} = renderSingleBook({title:"Mock Title"});
    //const book = await findByTestId("single-book");
    const title = await findByTestId("book-title");
    expect(title.textContent).contains("Mock Title");
  });
});
