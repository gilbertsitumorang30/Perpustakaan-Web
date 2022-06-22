import React from "react";
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = ({ width = "50%", placeHolder, cari, setKeyword }) => {
  return (
    <div className="search" style={{ width: width }}>
      <input
        type="text"
        className="search-input"
        onChange={(e) => {
          cari(e.target.value);
          setKeyword(e.target.value);
        }}
        placeholder={placeHolder}
      />
      <SearchOutlinedIcon className="search-icon" />
    </div>
  );
};

export default Search;
