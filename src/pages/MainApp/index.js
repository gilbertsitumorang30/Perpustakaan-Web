import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FullScreenLoader,
  ModalContainer,
  Navbar,
  Sidebar,
} from "../../components";
import "./mainapp.scss";

const MainApp = () => {
  const setCari = useRef(null);
  const setBukuKeyword = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [searchDisplay, setSearchDisplay] = useState("none");
  const [loading, setLoading] = useState(false);
  const handleCari = (cari) => {
    setCari.current(cari);
  };

  const logout = () => {
    setOpenModal(false);
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  const handleSetKeyword = (keyword) => {
    setBukuKeyword.current(keyword);
  };

  return (
    <div className="main-app">
      <Sidebar setOpenModal={setOpenModal} />
      <Navbar
        searchDisplay={searchDisplay}
        setCari={handleCari}
        setKeyword={handleSetKeyword}
      />
      <div className="main-app-content">
        <Outlet context={{ setSearchDisplay, setCari, setBukuKeyword }} />
      </div>

      {loading && <FullScreenLoader />}

      {openModal && (
        <ModalContainer
          type="konfirmasi"
          detailKonfirmasi="Anda yakin ingin keluar ?"
          greenButton={logout}
          redButton={() => {
            setOpenModal(false);
          }}
          title=" Keluar"
          closeModal={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MainApp;
