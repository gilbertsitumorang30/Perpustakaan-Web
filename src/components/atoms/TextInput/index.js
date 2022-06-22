import React from "react";
import "./textinput.scss";

const TextInput = ({
  type = "text",
  icon,
  placeholder,
  setValue = () => {},
}) => {
  return (
    <div className="text-input">
      <div className="icon">{icon}</div>
      <input
        type={type}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="label-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
