import "./bukucard.scss";

const BukuCard = ({
  setId,
  getDetailBuku,
  idBuku,
  modal,
  foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png",
  judul,
  kategori,
}) => {
  return (
    <div
      className="buku-card"
      onClick={() => {
        getDetailBuku(idBuku);
        setId(idBuku);
        modal(true);
      }}
    >
      <img className="image" src={foto} alt="buku-placeholder" />
      <div className="keterangan">
        <p className="judul-buku">{judul}</p>
        <p className="kategori-buku">{kategori}</p>
      </div>
    </div>
  );
};

export default BukuCard;
