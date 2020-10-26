import React, { useState } from "react";

interface CheckboxProps {
  text: string;
  id?: string;
}

/**
 * Checkbox is a component to create a checkbox with text beside it,
 * This code is inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox
 * @param text is the text right of the checkbox
 * @var checked is a hook to decide if a checkbox is checked
 */

const Checkbox = (props: CheckboxProps) => {
  const [checked, changeChecked] = useState(false);

  const toggleCheck = () => {
    changeChecked(!checked);
  };

  return (
    <span id={props.id} className="container" onClick={toggleCheck}>
      {props.text}
      <input type="checkbox" checked={checked} />
      <span className="checkmark"></span>
    </span>
  );
};

export default Checkbox;
