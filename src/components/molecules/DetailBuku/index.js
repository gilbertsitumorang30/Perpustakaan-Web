import React from "react";
import { Gap } from "../../atoms";
import "./detailbuku.scss";

const DetailBuku = ({ detailBuku }) => {
  return (
    <div className="detail-buku">
      <div className="detail-buku-top">
        <img
          src={
            detailBuku.foto ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png"
          }
          alt="gambar-buku"
        />
        <div className="keterangan">
          <div className="top">
            <p className="judul-buku">{detailBuku.judul}</p>
            <p className="penulis-buku">{detailBuku.penulis}</p>
          </div>
          <div className="bot">
            <div className="left">
              <div>
                <p className="top-text">{detailBuku.jumlah_halaman}</p>
                <p className="bot-text">Halaman</p>
              </div>
              <Gap height={8} />
              <div>
                <p className="top-text">{detailBuku.bahasa}</p>
                <p className="bot-text">Bahasa</p>
              </div>
            </div>
            <div className="mid">
              <div>
                <p className="top-text">{detailBuku.stok}</p>
                <p className="bot-text">Stok</p>
              </div>
              <Gap height={8} />
              <div>
                <p className="top-text">{detailBuku.penerbit}</p>
                <p className="bot-text">Penerbit</p>
              </div>
            </div>
            <div className="right">
              <div>
                <p className="top-text">{detailBuku.tahun_terbit}</p>
                <p className="bot-text">Terbit</p>
              </div>
              <Gap height={8} />
              <div>
                <p className="top-text">{detailBuku.kategori}</p>
                <p className="bot-text">Kategori</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-buku-bot">
        <p className="sinopsis">Sinopsis</p>
        <p className="text-sinopsis">{detailBuku.sinopsis}</p>
      </div>
    </div>
  );
};

export default DetailBuku;
