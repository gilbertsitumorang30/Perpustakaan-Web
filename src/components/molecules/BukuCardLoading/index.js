import React from "react";

const BukuCardLoading = ({
  onClick = () => {},
  gambrBuku = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png",
}) => {
  return (
    <div className="buku-card" onClick={() => onClick()}>
      <div className="image skeleton"></div>
      <div className="keterangan">
        <p className="judul-buku skeleton skeleton-text"></p>
        <p className="kategori-buku skeleton skeleton-text"></p>
      </div>
    </div>
  );
};

export default BukuCardLoading;
