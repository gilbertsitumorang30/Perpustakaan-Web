import React, { useCallback, useEffect, useState } from "react";
import "./logpeminjaman.scss";
import { DataGrid } from "@mui/x-data-grid";
import { DetailPeminjaman, ModalContainer } from "../../components";
import { scrollView } from "../../Utils";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
moment.locale("id");

const LogPeminjaman = () => {
  const { setSearchDisplay } = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  const [logPeminjaman, setLogPeminjaman] = useState([]);
  const [detailPeminjaman, setDetailPeminjaman] = useState({});

  scrollView(openModal);
  const columns = [
    {
      field: "nomor",
      headerName: "#",
      minWidth: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "peminjam", headerName: "Peminjam", width: 260 },
    { field: "buku", headerName: "Buku", width: 260 },
    {
      field: "tanggalPinjam",
      headerName: "Tanggal Pinjam",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        switch (params.row.status) {
          case "kembali":
            return <div className="cell-status">{params.row.status}</div>;
          case "ditolak":
            return <div className="cell-status">{params.row.status}</div>;
          default:
            return <div className="cell-status">{params.row.status}</div>;
        }
      },
    },
  ];

  const actionColumn = [
    {
      field: "aksi",
      headerName: "Aksi",
      width: 160,
      renderCell: () => {
        return (
          <div className="cell-aksi">
            <div className="tombol-detail">Lihat</div>
          </div>
        );
      },
    },
  ];

  const rows = logPeminjaman.map((currentValue, index) => {
    return {
      id: currentValue.id,
      nomor: index + 1,
      peminjam: currentValue.nama_anggota,
      buku: currentValue.judul_buku,
      tanggalPinjam: moment(currentValue.tanggal_pinjam).format(
        "dddd, DD MMMM YYYY"
      ),
      status: currentValue.status,
    };
  });

  const getLogPeminjaman = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/peminjaman/riwayat`
      );
      setLogPeminjaman(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const getDetailPeminjaman = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/peminjaman/${id}`
      );
      setDetailPeminjaman(res.data.data);
      console.log("detail", res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    setSearchDisplay("none");
    getLogPeminjaman();
  }, [getLogPeminjaman]);

  return (
    <div className="log-peminjaman">
      <div className="header-log-peminjaman">
        <p className="title-log-peminjaman">Log Peminjaman</p>
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
              getDetailPeminjaman(cell.row.id);
              setOpenModal(!openModal);
            }
          }}
        />
      </div>
      {openModal && (
        <ModalContainer
          type="peminjaman"
          detailPeminjaman={detailPeminjaman}
          title="Detail Peminjaman"
          closeModal={() => setOpenModal(!openModal)}
          displayFooter="none"
        />
      )}
    </div>
  );
};

export default LogPeminjaman;
