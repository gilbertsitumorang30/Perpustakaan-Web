import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React from "react";
import { Konfirmasi, Tombol } from "../../atoms";
import DetailAnggota from "../DetailAnggota";
import DetailBuku from "../DetailBuku";
import DetailPeminjaman from "../DetailPeminjaman";
import DetailPengembalian from "../DetailPengembalian";
import Info from "../Info";
import "./modalcontainer.scss";

const ModalContainer = ({
  sukses = true,
  type,
  detailAnggota,
  detailPeminjaman,
  detailPengembalian,
  width = 680,
  redButton,
  greenButton,
  detailBuku,
  detailKonfirmasi,
  title,
  detailInfo,
  closeModal,
  textRedButton = "Tidak",
  textGreenButton = "Ya",
  backGroundHeader = "#077c48",
  displayFooter = "flex",
}) => {
  let content;

  switch (type) {
    case "buku":
      content = <DetailBuku detailBuku={detailBuku} />;
      break;
    case "anggota":
      content = <DetailAnggota detailAnggota={detailAnggota} />;
      break;
    case "info":
      content = <Info pesan={detailInfo} sukses={sukses} />;
      break;
    case "peminjaman":
      content = <DetailPeminjaman detailPeminjaman={detailPeminjaman} />;
      break;
    case "pengembalian":
      content = <DetailPengembalian detailPengembalian={detailPengembalian} />;
      break;
    default:
      content = <Konfirmasi title={detailKonfirmasi} />;
      break;
  }

  return (
    <div className="modal-container">
      <div onClick={() => closeModal()} className="overlay"></div>
      <div className="modal-content" style={{ width: width }}>
        <div
          className="modal-header"
          style={{
            backgroundColor:
              type === "info" && !sukses ? "#dc3545" : backGroundHeader,
          }}
        >
          <p>{title}</p>
          <div onClick={() => closeModal()}>
            <CloseOutlinedIcon className="icon" />
          </div>
        </div>
        {content}
        <div className="modal-footer" style={{ display: displayFooter }}>
          <Tombol
            title={textRedButton}
            backgroundColor="#DC3545"
            onClick={() => {
              redButton();
            }}
          />
          <Tombol
            title={textGreenButton}
            onClick={() => {
              greenButton();
              document.body.classList.remove("active-modal");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
