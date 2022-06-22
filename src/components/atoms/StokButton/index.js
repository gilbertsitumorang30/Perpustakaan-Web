import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./stokbutton.scss";

const StokButton = ({ stok, setStok }) => {
  const plus = () => {
    setStok(stok + 1);
  };

  const min = () => {
    if (stok > 0) {
      setStok(stok - 1);
    }
  };

  return (
    <div className="stok-button">
      <div
        className="tombol-plus"
        onClick={(e) => {
          min();
        }}
      >
        -
      </div>
      <p className="stok-text">{stok}</p>
      <div
        className="tombol-min"
        onClick={() => {
          plus();
        }}
      >
        +
      </div>
    </div>
  );
};

export default StokButton;
