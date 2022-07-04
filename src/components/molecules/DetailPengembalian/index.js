import React from "react";
import { TextView } from "../../atoms";

import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
moment.locale("id");
const DetailPengembalian = ({ detailPengembalian }) => {
  return (
    <div className="detail-peminjaman">
      <TextView title="Peminjam" value={detailPengembalian.nama_anggota} />
      <TextView title="Buku" value={detailPengembalian.judul_buku} />
      <TextView title="Menyetujui" value={detailPengembalian.nama_petugas} />
      <TextView
        title="Tanggal Kembali"
        value={moment(detailPengembalian.tanggal_kembali).format(
          "dddd, DD MMMM YYYY"
        )}
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
