import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ModalContainer, Navbar, Sidebar } from "../../components";
import "./mainapp.scss";

const MainApp = () => {
  const setCari = useRef(null);
  const setBukuKeyword = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [searchDisplay, setSearchDisplay] = useState("none");
  const handleCari = (cari) => {
    setCari.current(cari);
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
      {openModal && (
        <ModalContainer
          type="konfirmasi"
          detailKonfirmasi="Anda yakin ingin keluar ?"
          greenButton={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
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
