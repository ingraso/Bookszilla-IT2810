import React from "react";
import { MdArrowUpward } from "react-icons/md";
import "../Styles/ToTop.css";

/**
 * ToTop is a component with a button to scroll to the top of the page again.
 * This code is inspired by https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
 */

const ToTop = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // className="home" må gjøres om til en state i redux

  return (
    <button className="red-button book" id="to-top" onClick={topFunction}>
      <MdArrowUpward size="30px" />
    </button>
  );
};

export default ToTop;
