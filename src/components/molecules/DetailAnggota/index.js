import { TextView } from "../../atoms";
import "./detailanggota.scss";

const DetailAnggota = ({ detailAnggota = [] }) => {
  return (
    <div className="detail-anggota">
      <img
        src={
          detailAnggota.foto ||
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        }
        alt="gambar-user"
      />
      <div className="keterangan">
        <TextView title="NIS" value={detailAnggota.nomor_induk_siswa} />
        <TextView title="Nama" value={detailAnggota.nama} />
        <TextView title="Kelas" value={detailAnggota.kelas} />
        <TextView title="Jenis Kelamin" value={detailAnggota.jenis_kelamin} />
        <TextView title="Nomor Telepon" value={detailAnggota.nomor_telepon} />
        <TextView title="Alamat" value={detailAnggota.alamat} />
      </div>
    </div>
  );
};

export default DetailAnggota;
