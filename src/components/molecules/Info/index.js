import React from "react";
import "./info.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const Info = ({ pesan, sukses }) => {
  return (
    <div className="info">
      {sukses ? (
        <div className="top" style={{ backgroundColor: "#077c48" }}>
          <CheckCircleOutlineIcon className="info-icon" />
        </div>
      ) : (
        <div className="top" style={{ backgroundColor: "#DC3545" }}>
          <ErrorOutlineOutlinedIcon className="info-icon" />
        </div>
      )}
      <div className="bottom">
        {sukses ? (
          <p className="sukses">Sukses</p>
        ) : (
          <p className="gagal">Gagal</p>
        )}
        <p className="sukses-detail">{pesan}</p>
      </div>
    </div>
  );
};

export default Info;
