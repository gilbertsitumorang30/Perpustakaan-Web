import React from "react";

const SmallAnggotaCard = ({
  nama,
  nis,
  onClick = () => {},
  foto = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
}) => {
  return (
    <div className="small-buku-card" id="anggota" onClick={(e) => onClick(e)}>
      <img src={foto} alt="buku-placeholder" />
      <div className="keterangan">
        <p className="judul-buku">{nama}</p>
        <p className="kategori-buku">{nis}</p>
      </div>
      <div className="overlay"></div>
      <div className="dipilih"></div>
    </div>
  );
};

export default SmallAnggotaCard;
