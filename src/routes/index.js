import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Anggota,
  Buku,
  Dashboard,
  Login,
  LogPeminjaman,
  MainApp,
  Peminjaman,
  LogPengembalian,
  Permintaan,
  TambahBuku,
  TambahAnggota,
  EditAnggota,
  EditBuku,
  TambahPeminjaman,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainApp />}>
            <Route path="" element={<Dashboard />} />
            <Route path="buku">
              <Route index element={<Buku />} />
              <Route path="tambah" element={<TambahBuku />} />
              <Route path="edit" element={<EditBuku />} />
            </Route>
            <Route path="anggota">
              <Route index element={<Anggota />} />
              <Route path="tambah" element={<TambahAnggota />} />
              <Route path="edit" element={<EditAnggota />} />
            </Route>
            <Route path="peminjaman">
              <Route index element={<Peminjaman />} />
              <Route path="tambah" element={<TambahPeminjaman />} />
            </Route>
            <Route path="permintaan" element={<Permintaan />} />
            <Route path="log-peminjaman" element={<LogPeminjaman />} />
            <Route path="log-pengembalian" element={<LogPengembalian />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
