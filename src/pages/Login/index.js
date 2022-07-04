import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoSekolah } from "../../assets";
import { FullScreenLoader, Gap, TextInput } from "../../components/atoms";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loginHandle = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/petugas/masuk`,
        {
          nomor_induk_pegawai: nip,
          password: password,
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="login">
      <p className="title-login">PERPUSTAKAAN DIGITAL</p>
      <p className="title-login">YAYASAN PERGURUAN SEHATI</p>
      <div className="form-container">
        <div className="form-top">
          <img src={logoSekolah} alt="logo-sekolah" />
        </div>
        <div className="form-bot">
          <TextInput
            icon={<PersonIcon />}
            setValue={setNip}
            placeholder="Nomor Induk Pegawai"
          />
          <Gap height={12} type="text" />
          <TextInput
            placeholder="Password"
            icon={<LockIcon />}
            type="password"
            setValue={setPassword}
            password={true}
          />
          <Gap height={32} />
          <div
            onClick={() => {
              if (nip.length <= 0) {
                setErrorMsg("Harap mengisi nomor induk pegawai");
              } else if (password.length <= 0) {
                setErrorMsg("Harap mengisi password");
              } else {
                loginHandle();
              }
            }}
            className="tombol-masuk"
          >
            MASUK
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
          {isLoading && <FullScreenLoader />}
        </div>
      </div>
    </div>
  );
};

export default Login;
