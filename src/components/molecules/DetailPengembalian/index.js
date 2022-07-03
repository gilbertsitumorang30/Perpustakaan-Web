import React from "react";
import { TextView } from "../../atoms";
const DetailPengembalian = ({ detailPengembalian }) => {
  console.log("Detail Pengembalian:", detailPengembalian);
  return (
    <div className="detail-peminjaman">
      <TextView title="Peminjam" value={detailPengembalian.nama_anggota} />
      <TextView title="Buku" value={detailPengembalian.judul_buku} />
      <TextView title="Menyetujui" value={detailPengembalian.nama_petugas} />
      <TextView
        title="Tanggal Kembali"
        value={detailPengembalian.tanggal_kembali}
      />
      <TextView
        title="Terlambat"
        value={detailPengembalian.terlambat + " hari"}
      />
      <TextView title="Denda" value={"Rp. " + detailPengembalian.denda} />
    </div>
  );
};

export default DetailPengembalian;
