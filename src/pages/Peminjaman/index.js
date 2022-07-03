import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullScreenLoader, ModalContainer, Tombol } from "../../components";
import { scrollView } from "../../Utils";
import { useOutletContext } from "react-router-dom";
import "./peminjaman.scss";
moment.locale("id");

const Peminjaman = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const [daftarPeminjaman, setDaftarPeminjaman] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id_peminjaman, setIdPeminjaman] = useState("");
  const [denda, setDenda] = useState(0);
  const [terlambat, setTerlambat] = useState(0);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState(false);
  scrollView(openModal);

  const pengembalian = async (id_peminjaman, status, denda, terlambat) => {
    try {
      setIsLoading(true);
      axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/petugas/kembalikan-buku`,
        {
          id_peminjaman: id_peminjaman,
          denda: denda,
          status: status,
          terlambat: terlambat,
        }
      );
      setDaftarPeminjaman(
        daftarPeminjaman.filter((currentValue) => {
          return currentValue.id !== id_peminjaman;
        })
      );
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
      setInfo(true);
    }
  };

  const getPeminjaman = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/peminjaman`
      );
      setDaftarPeminjaman(res.data.data);
    } catch (error) {
      console.log("error:", error.response);
    }
  }, []);

  useEffect(() => {
    setSearchDisplay("none");
    getPeminjaman();
  }, [getPeminjaman]);

  const columns = [
    {
      field: "nomor",
      headerName: "#",
      minWidth: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "peminjam", headerName: "Peminjam", width: 160 },
    { field: "buku", headerName: "Buku", width: 160 },
    {
      field: "tanggalPinjam",
      headerName: "Tanggal Pinjam",
      width: 200,
    },
    {
      field: "tanggalKembali",
      headerName: "Tanggal Harus Kembali",
      sortable: false,
      width: 200,
    },
  ];

  const dendaColumn = [
    {
      field: "denda",
      headerName: "Denda",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "masa peminjaman" ? (
              <div className="pinjam">
                <p className="text-pinjam">{params.row.status}</p>
              </div>
            ) : (
              <div className="telat">
                <p className="text-telat">Rp. {params.row.status}</p>
                <p className="keterangan">
                  terlambat {params.row.keterangan} hari
                </p>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "aksi",
      headerName: "Aksi",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cell-aksi">
            <div className="tombol-detail">Kembalikan</div>
          </div>
        );
      },
    },
  ];

  const rows = daftarPeminjaman.map((currentValue, index) => {
    let d = new Date();
    d.setHours(23, 59, 59, 999);
    let dateNow = JSON.parse(JSON.stringify(d));
    let status;
    let keterangan;

    if (dateNow <= currentValue.tanggal_harus_kembali) {
      status = "masa peminjaman";
      keterangan = "";
    } else {
      const hari = Math.floor(
        moment
          .duration(
            moment(dateNow).diff(moment(currentValue.tanggal_harus_kembali))
          )
          .asDays()
      );
      status = 1000 * hari;
      keterangan = hari;
    }

    return {
      nomor: index + 1,
      id: currentValue.id,
      peminjam: currentValue.nama_anggota,
      buku: currentValue.judul_buku,
      tanggalPinjam: moment(dateNow).format("dddd, DD MMMM YYYY"),
      tanggalKembali: moment(currentValue.tanggal_harus_kembali).format(
        "dddd, DD MMMM YYYY"
      ),
      status: status,
      keterangan: keterangan,
    };
  });

  return (
    <div className="peminjaman">
      <div className="header-peminjaman">
        <p className="title-peminjaman">Daftar Peminjaman</p>
        <Tombol
          title="Tambah"
          onClick={() => {
            navigate("tambah");
          }}
        />
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
          columns={columns.concat(dendaColumn, actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          disableSelectionOnClick
          onCellClick={(cell, e) => {
            if (
              cell.field === "aksi" &&
              e.target.className === "tombol-detail"
            ) {
              setIdPeminjaman(cell.row.id);
              if (cell.row.status === "masa peminjaman") {
                setStatus("tepat");
                setDenda(0);
                setTerlambat(0);
              } else {
                setStatus("telat");
                setDenda(cell.row.status);
                setTerlambat(cell.row.status / 1000);
              }
              setOpenModal(!openModal);
            }
          }}
        />
      </div>

      {openModal && (
        <ModalContainer
          title="Konfirmasi Pengembalian"
          type="konfirmasi"
          detailKonfirmasi="Konfirmasi pengembalian buku ?"
          closeModal={() => {
            setOpenModal(!openModal);
          }}
          greenButton={() => {
            pengembalian(id_peminjaman, status, denda, terlambat);
            setOpenModal(false);
          }}
          redButton={() => {
            setOpenModal(false);
          }}
        />
      )}

      {isLoading && <FullScreenLoader />}

      {info && (
        <ModalContainer
          type="info"
          detailInfo="Mengembalikan buku"
          displayFooter="none"
          title=" "
          width={320}
          closeModal={() => {
            setInfo(false);
          }}
        />
      )}
    </div>
  );
};
export default Peminjaman;
