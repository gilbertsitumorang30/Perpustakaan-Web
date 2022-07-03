import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  FormInput,
  DropDown,
  StokButton,
  Tombol,
  FullScreenLoader,
} from "../../components/atoms";
import "./tambahbuku.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ModalContainer } from "../../components";
import { scrollView, tahun } from "../../Utils";

const TambahBuku = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [daftarKategori, setDaftarKategori] = useState([]);

  //kategori
  let option = daftarKategori.map((currentValue, index) => {
    return { id: currentValue.id, value: currentValue.kategori };
  });

  const [foto, setFoto] = useState(null);
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png"
  );
  const [id_kategori, setKategori] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [jumlah_halaman, setJumlahHalaman] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [stok, setStok] = useState(0);
  const [tahun_terbit, setTahunTerbit] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [peringatan, setPeringatan] = useState("");
  const [info, setInfo] = useState(false);

  const getKategori = useCallback(async () => {
    try {
      // setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/kategori`
      );
      setDaftarKategori(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setSearchDisplay("none");
    getKategori();
  }, [getKategori]);

  scrollView(openModal);

  const formValidation = () => {
    if (!foto) {
      return "harap mengupload gambar buku!";
    } else if (judul.length <= 0) {
      return "harap mengisi judul buku!";
    } else if (id_kategori.length <= 0) {
      return "harap memilih kategori buku!";
    } else if (penulis.length <= 0) {
      return "harap mengisi penulis buku!";
    } else if (penerbit.length <= 0) {
      return "harap mengisi penerbit buku!";
    } else if (jumlah_halaman.length <= 0) {
      return "harap mengisi jumlah halaman !";
    } else if (!parseInt(jumlah_halaman)) {
      return "harap mengisi jumlah halaman dengan angka !";
    } else if (bahasa.length <= 0) {
      return "harap mengisi bahasa buku!";
    } else if (tahun_terbit.length <= 0) {
      return "harap mengisi tahun terbit buku!";
    } else if (sinopsis.length <= 0) {
      return "harap mengisi sinopsis buku!";
    } else {
      return null;
    }
  };

  const handleTambahBuku = async () => {
    let formData = new FormData();
    formData.append("judul", judul);
    formData.append("id_kategori", id_kategori.value);
    formData.append("foto", foto);
    formData.append("penulis", penulis);
    formData.append("jumlah_halaman", jumlah_halaman);
    formData.append("bahasa", bahasa);
    formData.append("sinopsis", sinopsis);
    formData.append("tahun_terbit", tahun_terbit.value);
    formData.append("stok", stok);
    formData.append("penerbit", penerbit);

    try {
      setIsloading(true);
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/buku/tambah`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsloading(false);
      setInfo(true);
    }
  };

  const tambahBuku = () => {
    let valid = formValidation();
    if (valid) {
      setPeringatan(valid);
      setOpenModal(!openModal);
    } else {
      handleTambahBuku();
    }
  };

  const handleUploadImage = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
    console.log("hasil:", uploaded);
  };

  return (
    <div className="tambah-buku">
      <div className="header-tambah-buku">
        <p className="title-tambah-buku">Tambah Buku</p>

        <Tombol
          title="Kembali"
          backgroundColor="#EBBD32"
          onClick={() => navigate("/buku")}
        />
      </div>
      <div className="tambah-buku-content">
        <div className="left">
          <img src={image} alt="gambar-buku" />
          <input
            type="file"
            onChange={(e) => {
              handleUploadImage(e);
            }}
          />
        </div>
        <div className="right">
          <FormInput
            title="Judul Buku"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setJudul(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Kategori"
            component={
              <DropDown
                titleOption="--Kategori--"
                data={option}
                setValue={setKategori}
              />
            }
          />
          <FormInput
            title="Penulis"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setPenulis(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Penerbit"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setPenerbit(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Jumlah Halaman"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setJumlahHalaman(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Bahasa"
            component={
              <input
                type="text"
                className="text-input"
                onChange={(e) => {
                  setBahasa(e.target.value);
                }}
              />
            }
          />
          <FormInput
            title="Stok"
            component={<StokButton stok={stok} setStok={setStok} />}
          />
          <FormInput
            title="Tahun Terbit"
            component={
              <DropDown
                titleOption="--Tahun Terbit--"
                data={tahun}
                setValue={setTahunTerbit}
              />
            }
          />
          <FormInput
            title="Sinopsis"
            component={
              <textarea
                onChange={(e) => {
                  setSinopsis(e.target.value);
                }}
              />
            }
          />
          <div className="button-container">
            <Tombol
              title="Batal"
              backgroundColor="#DC3545"
              onClick={() => navigate("/buku")}
            />
            <Tombol title="Tambah" onClick={tambahBuku} />
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
          detailInfo="Menambahkan buku"
          displayFooter="none"
          title=" "
          width={320}
          closeModal={() => {
            setInfo(false);
            navigate("/buku");
          }}
        />
      )}
    </div>
  );
};

export default TambahBuku;
