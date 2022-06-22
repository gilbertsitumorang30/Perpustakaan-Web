import React from "react";
import { TextView } from "../../atoms";
import "./detailpeminjaman.scss";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
moment.locale("id");
const DetailPeminjaman = ({ detailPeminjaman }) => {
  return (
    <div className="detail-peminjaman">
      <TextView title="Peminjam" value={detailPeminjaman.nama_anggota} />
      <TextView title="Buku" value={detailPeminjaman.judul_buku} />
      <TextView title="Menyetujui" value={detailPeminjaman.nama_petugas} />
      <TextView
        title="Tanggal Pinjam"
        value={moment(detailPeminjaman.tanggal_pinjam).format(
          "dddd, DD MMMM YYYY"
        )}
      />
      <TextView title="Status" value={detailPeminjaman.status} />
    </div>
  );
};

export default DetailPeminjaman;
