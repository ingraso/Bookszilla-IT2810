import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../redux/actions";

interface CheckboxProps {
  text: string;
  id: string;
}

/**
 * Checkbox is a component to create a checkbox with text beside it,
 * This code is inspired by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox
 * @param text is the text right of the checkbox.
 * @param id is the id of the checkbox.
 * @var checked is a hook to decide if a checkbox is checked.
 * @var filters is a list containing the current filers being used.
 */

const Checkbox = (props: CheckboxProps) => {
  const [checked, changeChecked] = useState(false);
  const dispatch = useDispatch();
  const filters: any = useSelector((state: any) => state.filter.filters);

  const toggleCheck = () => {
    changeChecked(!checked);
    if (filters.includes(props.text)) {
      dispatch(removeFilter(props.text));
    } else {
      dispatch(addFilter(props.text));
    }
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
