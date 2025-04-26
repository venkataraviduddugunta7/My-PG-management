import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  AlertOutlined,
  ToolOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import StatsCard from "../../components/resusableComponents/StatCard";
import OccupancyChart from "../../components/OccupancyChart";
import RevenueExpenseChart from "../../components/RevenueExpenseChart";
import QuickActions from "../../components/QuickActions";
import RecentActivity from "../../components/RecentActivity";

const Dashboard = () => {
  // Sample data - replace with real data
  const stats = [
    { name: "Total Beds", value: 50, icon: <HomeOutlined /> },
    { name: "Occupied", value: 42, icon: <UserOutlined /> },
    { name: "Vacant", value: 8, icon: <HomeOutlined /> },
    { name: "Monthly Revenue", value: "₹2,10,000", icon: <DollarOutlined /> },
    { name: "Pending Payments", value: "₹32,500", icon: <AlertOutlined /> },
    { name: "Active Complaints", value: 3, icon: <ToolOutlined /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Stat Cards */}
      <div className="stats-section">
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
      </div>

      {/* Charts Section */}


      {/* Quick Actions & Activity */}
    
    </div>
  );
};

export default Dashboard;
