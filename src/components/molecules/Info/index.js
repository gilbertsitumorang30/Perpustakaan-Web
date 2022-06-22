import React from "react";
import "./info.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Info = ({ pesan }) => {
  return (
    <div className="info">
      <div className="top">
        <CheckCircleOutlineIcon className="info-icon" />
      </div>
      <div className="bottom">
        <p className="sukses">SUKSES</p>
        <p className="sukses-detail">{pesan}</p>
      </div>
    </div>
  );
};

export default Info;
