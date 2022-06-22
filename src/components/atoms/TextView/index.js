import React from "react";
import "./textview.scss";

const TextView = ({ title, value }) => {
  console.log("value:", value);
  return (
    <div className="text-view">
      <p className="label">{title}</p>
      <p className="label-value">{value}</p>
    </div>
  );
};

export default TextView;
