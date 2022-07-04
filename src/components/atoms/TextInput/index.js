import React, { useState } from "react";
import "./textinput.scss";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const TextInput = ({
  type = "text",
  icon,
  placeholder,
  setValue = () => {},
  password = false,
}) => {
  const [hide, setHide] = useState(true);

  let eye;
  switch (hide) {
    case true:
      eye = (
        <VisibilityOffTwoToneIcon
          className="icon-eye"
          onClick={() => {
            setHide(!hide);
          }}
        />
      );
      break;
    default:
      eye = (
        <RemoveRedEyeOutlinedIcon
          className="icon-eye"
          onClick={() => {
            setHide(!hide);
          }}
        />
      );
      break;
  }

  return (
    <div className="text-input">
      <div className="icon">{icon}</div>
      <input
        type={type === "password" && hide ? "password" : "text"}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="label-input"
        placeholder={placeholder}
      />
      {password && eye}
    </div>
  );
};

export default TextInput;
