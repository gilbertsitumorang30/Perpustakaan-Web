import React from "react";
import "./tombol.scss";

const Tombol = ({
  backgroundColor = "#077C48",
  title,
  width = "auto",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{
        backgroundColor: backgroundColor,
        width: width,
      }}
      className="tombol"
    >
      {title}
    </div>
  );
};

export default Tombol;
