import React from "react";
import "./forminput.scss";

const FormInput = ({ component, title }) => {
  return (
    <div className="form-input">
      <p className="label-input">{title}</p>
      {component}
    </div>
  );
};

export default FormInput;
