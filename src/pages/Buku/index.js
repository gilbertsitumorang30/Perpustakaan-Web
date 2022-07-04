import React, { useEffect, useState } from "react";
import {
  FullScreenLoader,
  Gap,
  SmallLoader,
  Tombol,
} from "../../components/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BukuCard, ModalContainer } from "../../components";
import { Link } from "react-router-dom";
import "./buku.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useOutletContext } from "react-router-dom";

const Buku = () => {
  const { setSearchDisplay, setCari, setBukuKeyword } = useOutletContext();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [bukuLoading, setBukuLoading] = useState(false);

  const [idBuku, setIdBuku] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [info, setInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailBuku, setDetailBuku] = useState([]);
  const [sukses, setSukses] = useState(true);

  //state scroll
  const [items, setItems] = useState([]);
  const [noMore, setNoMore] = useState(true);

  //scroll fungsi

  const handleHapusBuku = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/buku/${id}`);
      setItems(items.filter((item) => item.id !== id));
      setSukses(true);
    } catch (error) {
      console.log(error.response);
      setSukses(false);
    } finally {
      setIsLoading(false);
      setInfo(true);
    }
  };

  const getDetailBuku = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/buku/${id}`
      );
      setDetailBuku(res.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const getBuku = async (keyword = "") => {
    setBukuLoading(true);
    try {
      const res = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/v1/buku?search_query=${keyword}&page=${0}&limit=10`
      );
      const data = res.data.data;
      setItems(data);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setBukuLoading(false);
    }
  };

  useEffect(() => {
    setSearchDisplay("flex");
    setCari.current = getBuku;
    setBukuKeyword.current = setKeyword;
    getBuku();
    console.log("useffe");
  }, []);

  const fetchBuku = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/buku?search_query=${keyword}&page=${page}&limit=10`
    );
    const data = res.data.data;
    console.log("scroll", data);
    return data;
  };

  const fetchData = async () => {
    const bukuFromServer = await fetchBuku();

    setItems([...items, ...bukuFromServer]);

    if (bukuFromServer.length === 0 || bukuFromServer.length < 10) {
      setNoMore(false);
    }
    setPage(page + 1);
  };

  if (openModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="buku">
      <div className="header-buku">
        <p className="title-buku">Daftar Buku</p>
        <Link to="tambah" state={"halo"} className="link">
          <Tombol title="Tambah" />
        </Link>
      </div>

      {bukuLoading ? (
        <div>
          <Gap height={150} />
          <SmallLoader />
        </div>
      ) : items.length ? (
        <InfiniteScroll
          className="content-buku"
          dataLength={items.length}
          next={fetchData}
          hasMore={noMore}
          loader={<h4>Loading...</h4>}
        >
          {items.map((currentValue, index) => (
            <BukuCard
              key={index}
              foto={currentValue.foto}
              judul={currentValue.judul}
              kategori={currentValue.kategori}
              idBuku={currentValue.id}
              modal={setOpenModal}
              setId={setIdBuku}
              getDetailBuku={getDetailBuku}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <div className="kosong">
          <SearchOffRoundedIcon className="icon" />
          <p>Tidak ada hasil</p>
        </div>
      )}

      {openModal && (
        <ModalContainer
          type="buku"
          textGreenButton="Edit"
          textRedButton="Hapus"
          title="Detail Buku"
          detailBuku={detailBuku}
          greenButton={() => {
            navigate("edit", {
              state: {
                idBuku: idBuku,
              },
            });
          }}
          redButton={() => {
            setOpenModal(!openModal);
            setDeleteModal(!deleteModal);
          }}
          closeModal={() => setOpenModal(!openModal)}
        />
      )}

      {deleteModal && (
        <ModalContainer
          textGreenButton="Ya"
          textRedButton="Tidak"
          title="Hapus Buku"
          type="konfirmasi"
          detailKonfirmasi="Apakah anda yakin ingin menghapus buku ?"
          greenButton={() => {
            handleHapusBuku(idBuku);
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

      {isLoading && <FullScreenLoader />}

      {info && (
        <ModalContainer
          type="info"
          detailInfo={
            sukses
              ? "Berhasil Menghapus buku"
              : "Buku sedang dipinjam atau sudah pernah di pinjam, set stok ke 0 untuk menghapus buku"
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

export default Buku;
