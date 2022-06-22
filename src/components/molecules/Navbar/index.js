import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import Search from "../../atoms/Search";
const Navbar = ({ searchDisplay = "none", setCari, setKeyword }) => {
  return (
    <div className="navbar">
      <Link to="/" className="link">
        <p className="title-navbar">Perpustakaan</p>
      </Link>
      <div className="search-container" style={{ display: searchDisplay }}>
        <Search
          width="25%"
          placeHolder="Cari..."
          cari={setCari}
          setKeyword={setKeyword}
        />
      </div>
    </div>
  );
};

export default Navbar;
