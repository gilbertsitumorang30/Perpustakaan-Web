import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { ModalContainer } from "../../components";
import {
  DropDown,
  FormInput,
  FullScreenLoader,
  Tombol,
} from "../../components/atoms";

const EditAnggota = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsloading] = useState(false);
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [detailAnggota, setDetailAnggota] = useState({});
  const [info, setInfo] = useState(false);

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

  console.log("nama:", nama);

  const getDetailAnggota = useCallback(async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/${id}`
      );
      const anggota = res.data.data;
      console.log("detailAnggota:", anggota);
      setDetailAnggota(anggota);
      setNis(anggota.nomor_induk_siswa);
      setNama(anggota.nama);
      setImage(anggota.foto);
      setIdKelas({
        value: anggota.id_kelas,
      });
      setPassword(anggota.password);
      setJenisKelamin({
        value: anggota.jenis_kelamin,
      });
      setNomorTelepon(anggota.nomor_telepon);
      setAlamat(anggota.alamat);
    } catch (error) {
      console.log("error get:", error.response);
    }
  }, []);

  const handleEditAnggota = async (id) => {
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
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("berhasil:", res);
    } catch (error) {
      console.log("error:", error.response);
    } finally {
      setIsloading(false);
      setInfo(true);
    }
  };

  let option = daftarKelas.map((currentValue, index) => {
    return { id: currentValue.id, value: currentValue.kelas };
  });

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
  };

  useEffect(() => {
    setSearchDisplay("none");
    getDetailAnggota(location.state.idAnggota);
    getDaftarKelas();
  }, [getDetailAnggota, location, getDaftarKelas]);

  return (
    <div className="tambah-buku">
      <div className="header-tambah-buku">
        <p className="title-tambah-buku">Edit Anggota</p>
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
                defaultValue={detailAnggota.nomor_induk_siswa}
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
                defaultValue={detailAnggota.nama}
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
                selected={detailAnggota.kelas}
              />
            }
          />
          <FormInput
            title="Password"
            component={
              <input
                defaultValue={detailAnggota.password}
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
                selected={detailAnggota.jenis_kelamin}
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
                defaultValue={detailAnggota.nomor_telepon}
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
                defaultValue={detailAnggota.alamat}
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
            <Tombol
              title="Simpan"
              onClick={() => {
                handleEditAnggota(detailAnggota.id);
              }}
            />
          </div>
        </div>
      </div>
      {isLoading && <FullScreenLoader />}

      {info && (
        <ModalContainer
          type="info"
          detailInfo="Mengedit anggota"
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
export default EditAnggota;
