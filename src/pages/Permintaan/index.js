import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useOutletContext } from "react-router-dom";
import "moment/locale/id"; // without this line it didn't work
import { useCallback, useEffect, useState } from "react";
import { FullScreenLoader, ModalContainer } from "../../components";
import { scrollView } from "../../Utils";
import "./permintaan.scss";
moment.locale("id");

const Permintaan = () => {
  const { setSearchDisplay } = useOutletContext();
  const [openModal, setOpenModal] = useState(false);
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [idPeminjaman, setIdPeminjaman] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [konfrimasi, setKonfirmasi] = useState("");
  const [info, setInfo] = useState(false);

  scrollView(openModal);

  const konfirmasiPermintaan = async (id, status) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/petugas/konfirmasi-peminjaman`,
        {
          id_peminjaman: id,
          status: status,
        }
      );
      setDaftarPermintaan(
        daftarPermintaan.map((currentValue) => {
          return currentValue !== id;
        })
      );
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
      setInfo(true);
    }
  };

  const getDaftarPermintaan = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/peminjaman/pemesanan`
      );
      setDaftarPermintaan(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  useEffect(() => {
    setSearchDisplay("none");
    getDaftarPermintaan();
  }, [getDaftarPermintaan]);

  const columns = [
    {
      field: "nomor",
      headerName: "No",
      width: 70,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "peminjam", headerName: "Peminjam", width: 280 },
    { field: "buku", headerName: "Buku", width: 280 },
    {
      field: "tanggalPesan",
      headerName: "Tanggal Pesan",
      width: 300,
    },
  ];

  const actionColumn = [
    {
      field: "aksi",
      headerName: "Aksi",
      width: 220,
      renderCell: () => {
        return (
          <div className="cell-aksi">
            <div className="tombol-terima">Konfrimasi</div>
          </div>
        );
      },
    },
  ];

  const rows = daftarPermintaan.map((currentValue, index) => {
    return {
      nomor: index + 1,
      id: currentValue.id,
      peminjam: currentValue.nama_anggota,
      buku: currentValue.judul_buku,
      tanggalPesan: moment(currentValue.tanggal_pesan).format(
        "dddd, DD MMMM YYYY"
      ),
    };
  });

  return (
    <div className="permintaan">
      <div className="header-permintaan">
        <p className="title-permintaan">Daftar Permintaan</p>
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
              e.target.className === "tombol-terima"
            ) {
              setOpenModal(true);
              setIdPeminjaman(cell.row.id);
            }
          }}
        />
      </div>
      {openModal && (
        <ModalContainer
          title="Konfirmasi Permintaan"
          type="konfirmasi"
          detailKonfirmasi="Terima permintaan peminjaman buku ?"
          closeModal={() => setOpenModal(!openModal)}
          redButton={() => {
            setOpenModal(false);
            konfirmasiPermintaan(idPeminjaman, "ditolak");
            setKonfirmasi("Menolak permintaan peminjaman buku");
          }}
          greenButton={() => {
            setOpenModal(false);
            konfirmasiPermintaan(idPeminjaman, "diterima");
            setKonfirmasi("Menerima permintaan peminjaman buku");
          }}
          textRedButton="tolak"
          textGreenButton="terima"
        />
      )}
      {isLoading && <FullScreenLoader />}
      {info && (
        <ModalContainer
          type="info"
          detailInfo={konfrimasi}
          displayFooter="none"
          title="Konfrimasi Peminjaman"
          width={320}
          closeModal={() => {
            setInfo(false);
          }}
        />
      )}
    </div>
  );
};

export default Permintaan;
