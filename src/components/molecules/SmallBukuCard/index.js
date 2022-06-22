import React from "react";
import "./smallbukucard.scss";

const SmallBukuCard = ({
  judul,
  kategori,
  onClick = () => {},
  foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png",
}) => {
  return (
    <div className="small-buku-card" id="buku" onClick={(e) => onClick(e)}>
      <img src={foto} alt="buku-placeholder" />
      <div className="keterangan">
        <p className="judul-buku">{judul}</p>
        <p className="kategori-buku">{kategori}</p>
      </div>
      <div className="overlay"></div>
      <div className="dipilih"></div>
    </div>
  );
};

export default SmallBukuCard;
