import React, { useCallback, useEffect, useState } from "react";
import { Gap } from "../../components/atoms";
import { DashboardCard, Search } from "../../components/molecules";
import "./dashboard.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import { useOutletContext } from "react-router-dom";
moment.locale("id");

const Dashboard = () => {
  const { setSearchDisplay } = useOutletContext();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [terakhirMasuk, setTerakhirMasuk] = useState([]);

  const getTotalDashboard = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/petugas/total`
      );
      setTotal(res.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    } finally {
      setIsloading(false);
    }
  }, []);

  const getAnggotaTerakhirLogin = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/anggota/terakhir-masuk`
    );
    setTerakhirMasuk(res.data.data);
  }, []);

  useEffect(() => {
    setSearchDisplay("none");
    getTotalDashboard();
    getAnggotaTerakhirLogin();
  }, [getTotalDashboard, getAnggotaTerakhirLogin]);

  return (
    <div className="dashboard">
      <div className="card-container">
        <DashboardCard
          link="anggota"
          dataApa="Anggota"
          totalData={total.totalAnggota}
          borderColor="#BB2B30"
          iconBackground="#DA8C8F"
          icon={<PersonOutlineOutlinedIcon style={{ color: "#BB2B30" }} />}
        />
        <Gap width={24} />
        <DashboardCard
          link="buku"
          dataApa="Buku"
          totalData={total.totalBuku}
          borderColor="#2975D1"
          iconBackground="#96BBE9"
          icon={<MenuBookOutlinedIcon style={{ color: "#2975D1" }} />}
        />
        <Gap width={24} />
        <DashboardCard
          link="log-peminjaman"
          dataApa="Peminjaman"
          totalData={total.totalPeminjaman}
          borderColor="#EBBD32"
          iconBackground="#F7E3A9"
          icon={<ArrowBackOutlinedIcon style={{ color: "#EBBD32" }} />}
        />
        <Gap width={24} />
        <DashboardCard
          link="log-pengembalian"
          dataApa="Pengembalian"
          totalData={total.totalPengembalian}
          borderColor="#42E04F"
          iconBackground="#ABF1B1"
          icon={<ArrowForwardOutlinedIcon style={{ color: "#42E04F" }} />}
        />
      </div>
      <p className="title-dashboard">10 Pengunjung terakhir</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="field-table">Nama</TableCell>
              <TableCell className="field-table" align="right">
                NIS
              </TableCell>
              <TableCell className="field-table" align="right">
                Kelas
              </TableCell>
              <TableCell className="field-table" align="right">
                Hari/Tanggal
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {terakhirMasuk.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right">{row.nomor_induk_siswa}</TableCell>
                <TableCell align="right">{row.kelas}</TableCell>
                <TableCell align="right">
                  {moment(row.terakhir_masuk).format("dddd, DD MMMM YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
