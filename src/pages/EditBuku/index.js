import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  DropDown,
  FormInput,
  FullScreenLoader,
  StokButton,
  Tombol,
} from "../../components/atoms";
import { tahun } from "../../Utils";
import { ModalContainer } from "../../components";

const EditBuku = () => {
  const { setSearchDisplay } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [detailBuku, setDetailBuku] = useState([]);
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //buku
  const [foto, setFoto] = useState(null);
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png"
  );
  const [id_kategori, setKategori] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [stok, setStok] = useState(0);
  const [jumlah_halaman, setJumlahHalaman] = useState("");
  const [bahasa, setBahasa] = useState("");
  const [tahun_terbit, setTahunTerbit] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [info, setInfo] = useState(false);

  //endbuku

  const handleEditBuku = async (id) => {
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
      setIsLoading(true);
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/buku/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
      setInfo(true);
    }
  };

  const editBuku = () => {
    handleEditBuku(detailBuku.id);
  };

  const handleUploadImage = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setFoto(uploaded);
  };

  const getDetailBuku = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/buku/${id}`
      );
      const buku = res.data.data;
      setDetailBuku(buku);
      setStok(buku.stok);
      setImage(buku.foto);
      setJudul(buku.judul);
      setFoto(buku.foto);
      setKategori({
        value: buku.id_kategori,
      });
      setPenulis(buku.penulis);
      setPenerbit(buku.penerbit);
      setJumlahHalaman(buku.jumlah_halaman);
      setTahunTerbit({
        value: buku.tahun_terbit,
      });
      setBahasa(buku.bahasa);
      setSinopsis(buku.sinopsis);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getKategori = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/kategori`
      );
      setDaftarKategori(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  }, []);

  let option = daftarKategori.map((currentValue, index) => {
    return { id: currentValue.id, value: currentValue.kategori };
  });

  useEffect(() => {
    setSearchDisplay("none");
    getDetailBuku(location.state.idBuku);
    getKategori();
  }, [getDetailBuku, location, getKategori]);

  return (
    <div className="tambah-buku">
      <div className="header-tambah-buku">
        <p className="title-tambah-buku">Edit Buku</p>
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
                placeholder={detailBuku.judul}
                onChange={(e) => {
                  if (e.target.value <= 0) {
                    setJudul(detailBuku.judul);
                  } else {
                    setJudul(e.target.value);
                  }
                }}
              />
            }
          />
          <FormInput
            title="Kategori"
            component={
              <DropDown
                titleOption="--Kategori--"
                selected={detailBuku.kategori}
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
                placeholder={detailBuku.penulis}
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
                placeholder={detailBuku.penerbit}
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
                placeholder={detailBuku.jumlah_halaman}
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
                placeholder={detailBuku.bahasa}
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
                selected={parseInt(detailBuku.tahun_terbit)}
                setValue={setTahunTerbit}
              />
            }
          />
          <FormInput
            title="Sinopsis"
            component={
              <textarea
                placeholder={detailBuku.sinopsis}
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
            <Tombol
              title="Simpan"
              onClick={() => {
                editBuku(detailBuku.id);
              }}
            />
          </div>
        </div>
      </div>

      {isLoading && <FullScreenLoader />}

      {info && (
        <ModalContainer
          type="info"
          detailInfo="Mengedit buku"
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

export default EditBuku;
