import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ModalContainer } from "../../components";
import {
  DropDown,
  FormInput,
  FullScreenLoader,
  Tombol,
} from "../../components/atoms";

const TambahAnggota = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [nomor_induk_siswa, setNis] = useState("");
  const [foto, setFoto] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [nama, setNama] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [id_kelas, setIdKelas] = useState(3);
  const [password, setPassword] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const [alamat, setAlamat] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [peringatan, setPeringatan] = useState("");
  const [info, setInfo] = useState(false);

  const getDaftarKelas = useCallback(async () => {
    try {
      // setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/kelas`
      );
      setDaftarKelas(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  const formValidation = () => {
    if (nomor_induk_siswa.length <= 0) {
      return "harap mengisi nomor induk anggota!";
    } else if (nama.length <= 0) {
      return "harap mengisi nama anggota!";
    } else if (id_kelas.length <= 0) {
      return "harap memilih kelas anggota";
    } else if (password.length <= 0) {
      return "harap mengisi password anggota";
    } else if (jenis_kelamin.length <= 0) {
      return "harap memilih jenis kelamin siswa";
    } else {
      return null;
    }
  };

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
  };

  const handleTambahAnggota = async () => {
    let formData = new FormData();
    formData.append("nomor_induk_siswa", nomor_induk_siswa);
    formData.append("foto", foto);
    formData.append("nama", nama);
    formData.append("password", password);
    formData.append("id_kelas", id_kelas.value);
    formData.append("jenis_kelamin", jenis_kelamin.value);
    formData.append("nomor_telepon", nomor_telepon);
    formData.append("alamat", alamat);
    try {
      setIsloading(true);
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/tambah`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log("error:", error.response);
    } finally {
      setIsloading(false);
      setInfo(true);
    }
  };

  const tambahAnggta = () => {
    let valid = formValidation();
    if (valid) {
      setPeringatan(valid);
      setOpenModal(!openModal);
    } else {
      handleTambahAnggota();
    }
    console.log(valid);
  };

  useEffect(() => {
    setSearchDisplay("none");
    getDaftarKelas();
  }, [getDaftarKelas]);

  const option = daftarKelas.map((currentValue, index) => {
    return { id: currentValue.id, value: currentValue.kelas };
  });

  return (
    <div className="tambah-buku">
      <div className="header-tambah-buku">
        <p className="title-tambah-buku">Tambah Anggota</p>
        <Tombol
          title="Kembali"
          backgroundColor="#EBBD32"
          onClick={() => navigate("/anggota")}
        />
      </div>
      <div className="tambah-buku-content">
        <div className="left">
          <img src={image} alt="gambar-buku" />
          <input
            type="file"
            onChange={(e) => {
              handleUploadChange(e);
            }}
          />
        </div>
        <div className="right">
          <FormInput
            title="Nomor Induk Siswa"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setNis(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Nama"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Kelas"
            component={
              <DropDown
                titleOption="--Kelas--"
                setValue={setIdKelas}
                data={option}
              />
            }
          />
          <FormInput
            title="Password"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Jenis Kelamin"
            component={
              <DropDown
                setValue={setJenisKelamin}
                titleOption="--Jenis Kelamin--"
                data={[
                  { id: "Laki - laki", value: "Laki - laki" },
                  { id: "Perempuan", value: "Perempuan" },
                ]}
              />
            }
          />
          <FormInput
            title="Nomor Telepon"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setNomorTelepon(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Alamat"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setAlamat(e.target.value);
                }}
              />
            }
          />
          <div className="button-container">
            <Tombol
              title="Batal"
              backgroundColor="#DC3545"
              onClick={() => navigate("/anggota")}
            />
            <Tombol title="Tambah" onClick={tambahAnggta} />
          </div>
        </div>
      </div>

      {openModal && (
        <ModalContainer
          type="konfirmasi"
          textGreenButton="Ya"
          textRedButton="Tidak"
          title="Peringatan !!"
          backGroundHeader="#DC3545"
          displayFooter="none"
          detailKonfirmasi={peringatan}
          closeModal={() => {
            setOpenModal(!openModal);
          }}
        />
      )}

      {isLoading && <FullScreenLoader />}

      {info && (
        <ModalContainer
          type="info"
          detailInfo="Menambahkan Anggota"
          displayFooter="none"
          title=" "
          width={320}
          closeModal={() => {
            setInfo(false);
            navigate("/anggota");
          }}
        />
      )}
    </div>
  );
};
export default TambahAnggota;
