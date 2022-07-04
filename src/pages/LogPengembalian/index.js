import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./logpengembalian.scss";
import { scrollView } from "../../Utils";
import { ModalContainer, DetailPengembalian } from "../../components";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import axios from "axios";
moment.locale("id");

const LogPengembalian = () => {
  const { setSearchDisplay } = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  const [logPengembalian, setLogPengembalian] = useState([]);
  const [detailPengembalian, setDetailPengembalian] = useState({});
  scrollView(openModal);

  const getDaftarPengembalian = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pengembalian/riwayat`
      );
      setLogPengembalian(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  useEffect(() => {
    setSearchDisplay("none");
    getDaftarPengembalian();
  }, [getDaftarPengembalian]);

  const columns = [
    {
      field: "nomor",
      headerName: "#",
      minWidth: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "peminjam", headerName: "Peminjam", width: 280 },
    { field: "buku", headerName: "Buku", width: 280 },
    {
      field: "tanggalKembali",
      headerName: "Tanggal Kembali",
      width: 280,
    },
  ];

  const actionColumn = [
    {
      field: "aksi",
      headerName: "Aksi",
      width: 200,
      renderCell: () => {
        return (
          <div className="cell-aksi">
            <div
              className="tombol-detail"
              onClick={() => setOpenModal(!openModal)}
            >
              Lihat
            </div>
          </div>
        );
      },
    },
  ];

  const getDetailPengembalian = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/pengembalian/${id}`
      );
      console.log("id", id);
      setDetailPengembalian(res.data.data);
      console.log("data:", res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const rows = logPengembalian.map((currentValue, index) => {
    return {
      id: currentValue.id,
      nomor: index + 1,
      peminjam: currentValue.nama_anggota,
      buku: currentValue.judul_buku,
      tanggalKembali: moment(currentValue.tanggal_kembali).format(
        "dddd, DD MMMM YYYY"
      ),
    };
  });

  return (
    <div className="log-pengembalian">
      <div className="header-log-pengembalian">
        <p className="title-log-pengembalian">Log Pengembalian</p>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          disableSelectionOnClick
          onCellClick={(cell, e) => {
            if (
              cell.field === "aksi" &&
              e.target.className === "tombol-detail"
            ) {
              getDetailPengembalian(cell.row.id);
              setOpenModal(!openModal);
            }
          }}
        />
      </div>
      {openModal && (
        <ModalContainer
          type="pengembalian"
          detailPengembalian={detailPengembalian}
          title="Detail Peminjaman"
          closeModal={() => setOpenModal(!openModal)}
          displayFooter="none"
        />
      )}
    </div>
  );
};

export default LogPengembalian;
