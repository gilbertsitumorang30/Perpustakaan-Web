import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  FormInput,
  FullScreenLoader,
  ModalContainer,
  Search,
  SmallAnggotaCard,
  SmallBukuCard,
  SmallLoader,
  Tombol,
} from "../../components";
import "./tambahpeminjaman.scss";

export const TambahPeminjaman = () => {
  const { setSearchDisplay } = useOutletContext();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageAnggota, setPageAnggota] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywordAnggota, setKeywordAnggota] = useState("");
  const [noMore, setNoMore] = useState(true);
  const [noAnggota, setNoMoreAnggota] = useState(true);
  const [peminjam, setPeminjam] = useState({});
  const [buku, setBuku] = useState({});
  const [daftarBuku, setDaftarBuku] = useState([]);
  const [daftarAnggota, setDaftarAnggota] = useState([]);
  const [peringatan, setPeringatan] = useState("");
  const [info, setInfo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [anggotaLoading, setAnggotaLoading] = useState(false);
  const [bukuLoading, setBukuLoading] = useState(false);

  const formValidation = () => {
    if (!peminjam.id) {
      return "harap memilih anggota";
    } else if (!buku.id) {
      return "harap memilih buku";
    } else {
      return null;
    }
  };

  const tambahPeminjaman = async () => {
    try {
      setIsloading(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/petugas/tambah-peminjaman`,
        {
          id_buku: buku.id,
          id_anggota: peminjam.id,
        }
      );
      setIsloading(false);
      setInfo(true);
    } catch (error) {
      console.log("error:", error.response);
      setPeringatan(error.response.data.msg);
      setIsloading(false);
      setOpenModal(!openModal);
    }
  };

  const getBuku = async (keyword = "") => {
    try {
      setBukuLoading(true);
      const res = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/v1/buku?search_query=${keyword}&page=${0}&limit=10`
      );
      const data = res.data.data;
      setDaftarBuku(data);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setBukuLoading(false);
    }
  };

  const blankForm = (komponen = ".small-buku-card") => {
    const dokumen = document.querySelectorAll(komponen);
    dokumen.forEach((item, index) => {
      item.classList.remove("active");
    });
  };

  const pilihan = (e, komponen) => {
    blankForm(komponen);
    e.target.parentNode.classList.add("active");
  };

  const getAnggota = async (keyword = "") => {
    setAnggotaLoading(true);
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/v1/anggota?search_query=${keyword}&page=${0}&limit=10`
      );
      const data = res.data.data;
      setDaftarAnggota(data);
      setPageAnggota(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setAnggotaLoading(false);
    }
  };

  const handleTambahPeminjaman = () => {
    let valid = formValidation();
    if (valid) {
      setPeringatan(valid);
      setOpenModal(!openModal);
    } else {
      tambahPeminjaman();
    }
  };

  useEffect(() => {
    setSearchDisplay("none");
    getAnggota();
    getBuku();
  }, []);

  const fetchBuku = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/buku?search_query=${keyword}&page=${page}&limit=10`
    );
    const data = res.data.data;
    return data;
  };

  const fetchAnggota = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/anggota?search_query=${keywordAnggota}&page=${pageAnggota}&limit=10`
    );
    const data = res.data.data;
    return data;
  };
  const fetchDataAnggota = async () => {
    const anggotaFromServer = await fetchBuku();

    setDaftarBuku([...daftarBuku, ...anggotaFromServer]);

    if (anggotaFromServer.length === 0 || anggotaFromServer.length < 10) {
      setNoMoreAnggota(false);
    }
    setPageAnggota(page + 1);
  };

  const fetchData = async () => {
    const bukuFromServer = await fetchBuku();

    setDaftarBuku([...daftarBuku, ...bukuFromServer]);

    if (bukuFromServer.length === 0 || bukuFromServer.length < 10) {
      setNoMore(false);
    }
    setPage(page + 1);
  };

  return (
    <div className="tambah-peminjaman">
      <div className="header-tambah-peminjaman">
        <p className="title-tambah-peminjaman">Tambah Peminjaman</p>
        <Tombol
          title="Kembali"
          backgroundColor="#EBBD32"
          onClick={() => navigate("/peminjaman")}
        />
      </div>
      <div className="tambah-peminjaman-content">
        <div className="top">
          <div className="left">
            <div className="header">
              <p className="header-title">Anggota</p>
              <Search
                placeHolder="Cari anggota..."
                cari={getAnggota}
                setKeyword={setKeywordAnggota}
              />
            </div>
            <div
              className="content"
              id="anggota"
              onScroll={(e) => {
                if (
                  e.target.offsetHeight + e.target.scrollTop >=
                  e.target.scrollHeight
                ) {
                  fetchDataAnggota();
                }
              }}
            >
              {!anggotaLoading ? (
                daftarAnggota.length ? (
                  daftarAnggota.map((currentValue, index) => {
                    return (
                      <SmallAnggotaCard
                        key={currentValue.id}
                        nama={currentValue.nama}
                        nis={currentValue.nomor_induk_siswa}
                        foto={currentValue.foto}
                        onClick={(e) => {
                          setPeminjam(daftarAnggota[index]);
                          pilihan(e, "#anggota.small-buku-card");
                        }}
                      />
                    );
                  })
                ) : (
                  <div className="kosong">
                    <SearchOffRoundedIcon className="icon" />
                    <p>Anggota tidak ditemukan</p>
                  </div>
                )
              ) : (
                <SmallLoader />
              )}
            </div>
          </div>
          <div className="right">
            <div className="header">
              <p className="header-title">Buku</p>
              <Search
                placeHolder="Cari buku..."
                cari={getBuku}
                setKeyword={setKeyword}
              />
            </div>
            <div
              className="content"
              id="buku"
              onScroll={(e) => {
                if (
                  e.target.offsetHeight + e.target.scrollTop >=
                  e.target.scrollHeight
                ) {
                  fetchData();
                }
              }}
            >
              {bukuLoading ? (
                <SmallLoader />
              ) : daftarBuku.length ? (
                daftarBuku.map((currentValue, index) => {
                  return (
                    <SmallBukuCard
                      key={currentValue.id}
                      judul={currentValue.judul}
                      kategori={currentValue.kategori}
                      foto={currentValue.foto}
                      onClick={(e) => {
                        setBuku(daftarBuku[index]);
                        pilihan(e, "#buku.small-buku-card");
                      }}
                    />
                  );
                })
              ) : (
                <div className="kosong">
                  <SearchOffRoundedIcon className="icon" />
                  <p>Buku tidak ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bot">
          <div className="left">
            <FormInput
              title="Peminjam"
              component={<p className="text-input">{peminjam.nama}</p>}
            />
            <FormInput
              title="Buku"
              component={<p className="text-input">{buku.judul}</p>}
            />
          </div>
          <div className="right">
            <Tombol
              onClick={() => {
                blankForm();
                setBuku({});
                setPeminjam({});
              }}
              title="Reset"
              backgroundColor="#DC3545"
            />
            <Tombol
              title="Tambah"
              onClick={() => {
                handleTambahPeminjaman();
              }}
            />
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
          detailInfo="Meminjamkan buku"
          displayFooter="none"
          title=" "
          width={320}
          closeModal={() => {
            setInfo(false);
            blankForm();
            setBuku({});
            setPeminjam({});
          }}
        />
      )}
    </div>
  );
};
