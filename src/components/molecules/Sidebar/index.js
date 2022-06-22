import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import UpdateIcon from "@mui/icons-material/Update";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gap } from "../../atoms";
import "./sidebar.scss";

const Sidebar = ({ setOpenModal }) => {
  console.log(window.location);

  const handleMouseEnter = (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.add("active-navigation");
    }
  };

  const handleClick = (e) => {
    let navigasi = document.querySelectorAll(".sidebar ul li");
    navigasi.forEach(function (element) {
      element.classList.remove("klik");
    });
    if (e.target.tagName === "LI") {
      e.target.classList.add("klik");
    }
  };

  const handleMouseLeave = () => {
    let navigasi = document.querySelectorAll(".sidebar ul li");
    navigasi.forEach(function (element) {
      element.classList.remove("active-navigation");
    });
  };

  return (
    <div className="sidebar">
      <ul>
        <Gap height={20} />
        <p>MAIN</p>
        <Link to="/" className="navigasi">
          <li
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={(e) => handleClick(e)}
            className="klik"
          >
            <DashboardOutlinedIcon className="icon" /> Dashboard
          </li>
        </Link>
        <Gap height={20} />
        <p>DATA</p>
        <Link to="/buku" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <MenuBookOutlinedIcon className="icon" /> Buku
          </li>
        </Link>

        <Link to="/anggota" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <PersonOutlineOutlinedIcon className="icon" /> Anggota
          </li>
        </Link>
        <Gap height={20} />
        <p>SIRKULASI</p>
        <Link to="/peminjaman" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <ArrowBackOutlinedIcon className="icon" /> Peminjaman
          </li>
        </Link>
        <Link to="/permintaan" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <EventOutlinedIcon className="icon" /> Permintaan
          </li>
        </Link>
        <Gap height={20} />
        <p>RIWAYAT</p>
        <Link to="/log-peminjaman" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <HistoryIcon className="icon" /> Log Peminjaman
          </li>
        </Link>
        <Link to="/log-pengembalian" className="navigasi">
          <li
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <UpdateIcon className="icon" /> Log Pengembalian
          </li>
        </Link>
        <Gap height={20} />
        <p>SISTEM</p>

        <li
          onClick={(e) => {
            setOpenModal(true);
          }}
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <LogoutIcon className="icon" /> Keluar
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
