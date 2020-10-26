import React from "react";
import { MdArrowUpward } from "react-icons/md";
import { useSelector } from "react-redux";
import "../styles/ToTop.css";

/**
 * ToTop is a component with a button to scroll to the top of the page again.
 * This code is inspired by https://www.w3schools.com/howto/howto_js_scroll_to_top.asp.
 * @var phonePage uses redux store to decide if the component should be shown.
 */

const ToTop = () => {
  const phonePage: any = useSelector((state: any) => state.phonePage.phonePage);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <button
      className={phonePage + " red-button"}
      id="to-top"
      onClick={topFunction}
    >
      <MdArrowUpward size="30px" />
    </button>
  );
};

export default ToTop;
