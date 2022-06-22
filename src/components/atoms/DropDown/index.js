import React from "react";
import "./dropdown.scss";

const DropDown = ({
  selected,
  titleOption,
  data = [],
  setValue = () => {},
}) => {
  return (
    <select
      className="drop-down"
      onChange={(e) => {
        if (e.target.selectedIndex !== 0) {
          setValue(e.target);
        }
      }}
    >
      <option value="" selected disabled>
        {titleOption}
      </option>
      {data.map((item, index) => {
        if (selected === item.value) {
          return (
            <option selected key={index} value={item.id}>
              {item.value}
            </option>
          );
        } else {
          return (
            <option key={index} value={item.id}>
              {item.value}
            </option>
          );
        }
      })}
    </select>
  );
};

export default DropDown;
