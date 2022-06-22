import React from "react";
import "./dashboardcard.scss";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({
  dataApa,
  totalData,
  icon,
  borderColor,
  iconBackground,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div className="dashboardcard" style={{ borderLeftColor: borderColor }}>
      <div className="keterangan">
        <p className="data-apa">{dataApa}</p>
        <p className="total-data">{totalData}</p>
        <p
          className="link"
          onClick={() => {
            navigate(link);
          }}
        >
          Lihat Detail
        </p>
      </div>
      <div
        style={{
          backgroundColor: iconBackground,
        }}
        className="icon"
      >
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
