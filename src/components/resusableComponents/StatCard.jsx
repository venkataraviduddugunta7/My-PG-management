import React from "react";
import "./StatCard.scss";

const StatsCard = ({ statName, count, icon }) => {
  return (
    <div className="stats-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-name">{statName}</div>
      <div className="stat-count">{count}</div>
    </div>
  );
};

export default StatsCard;
