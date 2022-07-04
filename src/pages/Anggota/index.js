import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { Tombol, ModalContainer, FullScreenLoader } from "../../components";
import "./anggota.scss";
import axios from "axios";

const Anggota = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const [daftarAnggota, setDaftarAnggota] = useState([]);
  const [info, setInfo] = useState(false);
  const [detailAnggota, setDetailAnggota] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sukses, setSukses] = useState(true);

  const getDaftarAnggota = useCallback(async () => {
    try {
      // setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/total`
      );
      setDaftarAnggota(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  const handleHapusAnggota = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/${id}`
      );
      setSukses(true);
      setDaftarAnggota(daftarAnggota.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error.response);
      setSukses(false);
    } finally {
      setIsLoading(false);
      setInfo(true);
    }
  };

  const getDetailAnggota = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/${id}`
      );
      setDetailAnggota(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchDisplay("none");
    getDaftarAnggota();
  }, [getDaftarAnggota]);

  if (openModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const columns = [
    {
      field: "nomor",
      headerName: "#",
      minWidth: 60,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nama",
      headerName: "Nama",
      width: 320,
    },
    { field: "alamat", headerName: "Alamat", width: 320 },
    {
      field: "kelas",
      headerName: "Kelas",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nomor_telepon",
      headerName: "Nomor Telepon",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = daftarAnggota.map((currentValue, index) => {
    return {
      nomor: index + 1,
      id: currentValue.id,
      nis: currentValue.nomor_induk_siswa,
      nama: currentValue.nama,
      alamat: currentValue.alamat,
      kelas: currentValue.kelas,
      nomor_telepon: currentValue.nomor_telepon,
    };
  });

  const actionColumn = [
    {
      field: "aksi",
      headerName: "Aksi",
      headerAlign: "center",
      align: "center",
      with: 120,
      renderCell: () => {
        return (
          <div className="cell-aksi">
            <div className="tombol-detail">Lihat</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="anggota">
      <div className="header-anggota">
        <p className="title-anggota">Daftar Anggota</p>
        <Link to="tambah" className="link">
          <Tombol title="Tambah" />
        </Link>
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
          rowsPerPageOptions={[10]}
          pageSize={10}
          autoHeight
          onCellClick={(cell, e) => {
            if (
              cell.field === "aksi" &&
              e.target.className === "tombol-detail"
            ) {
              getDetailAnggota(cell.row.id);
              setOpenModal(!openModal);
            }
          }}
        />
      </div>
      {openModal && (
        <ModalContainer
          type="anggota"
          detailAnggota={detailAnggota}
          textGreenButton="Edit"
          textRedButton="Hapus"
          title="Detail Anggota"
          redButton={() => {
            setOpenModal(!openModal);
            setDeleteModal(!deleteModal);
          }}
          greenButton={() => {
            navigate("edit", {
              state: {
                idAnggota: detailAnggota.id,
              },
            });
          }}
          closeModal={() => {
            setOpenModal(!openModal);
          }}
        />
      )}

      {isLoading && <FullScreenLoader />}

      {deleteModal && (
        <ModalContainer
          textGreenButton="Ya"
          textRedButton="Tidak"
          title="Hapus Anggota"
          type="konfirmasi"
          detailKonfirmasi="Apakah anda yakin ingin menghapus Anggota ?"
          greenButton={() => {
            handleHapusAnggota(detailAnggota.id);
            setDeleteModal(!deleteModal);
          }}
          redButton={() => {
            setDeleteModal(!deleteModal);
            setOpenModal(!openModal);
          }}
          closeModal={() => {
            setDeleteModal(!deleteModal);
          }}
        />
      )}

      {info && (
        <ModalContainer
          type="info"
          detailInfo={
            sukses
              ? "Berhasil Menghapus Anggota"
              : "Tidak dapat menghapus anggota yang sedang meminjam buku"
          }
          sukses={sukses}
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

export default Anggota;
