import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  AlertOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Dashboard.scss";

const Dashboard = () => {
  const stats = [
    { name: "Total Beds", value: 50, icon: <HomeOutlined /> },
    { name: "Occupied", value: 42, icon: <UserOutlined /> },
    { name: "Vacant", value: 8, icon: <HomeOutlined /> },
    { name: "Monthly Revenue", value: "₹2,10,000", icon: <DollarOutlined /> },
    { name: "Pending Payments", value: "₹32,500", icon: <AlertOutlined /> },
    { name: "Active Complaints", value: 3, icon: <ToolOutlined /> },
  ];

  return (
    <div className="dashboard-cantainer ">
      {/* Stat Cards */}
      <div className="header-section tabheader">Dashboard</div>
      <div className="stats-section">
        <Row gutter={[16]}>
          <Col span={18}>
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <StatsCard
                    statName={stat.name}
                    count={stat.value}
                    icon={stat.icon}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={6}>
            <div className="activity">
              <div className="activity-title ">Notifications & Logs</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
