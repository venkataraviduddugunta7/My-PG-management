import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  AlertOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Col, Row, Table } from "antd";
import StatsCard from "../../components/resusableComponents/StatCard";
import "./Dashboard.scss";

const Dashboard = () => {
  // Stats data
  const stats = [
    { name: "Total Beds", value: 50, icon: <HomeOutlined /> },
    { name: "Occupied", value: 42, icon: <UserOutlined /> },
    { name: "Vacant", value: 8, icon: <HomeOutlined /> },
    { name: "Monthly Revenue", value: "₹2,10,000", icon: <DollarOutlined /> },
    { name: "Pending Payments", value: "₹32,500", icon: <AlertOutlined /> },
    { name: "Active Complaints", value: 3, icon: <ToolOutlined /> },
  ];

  // Notifications data
  const notifications = [
    {
      type: "Rent Reminder",
      message: "Akash Kumar's rent is due in 3 days.",
      priority: "high",
    },
    {
      type: "Payment Received",
      message: "₹7,000 from Priya Reddy (May).",
      priority: "low",
    },
    {
      type: "Complaint Logged",
      message: "Room 102 AC not working – raised by Rajesh.",
      priority: "medium",
    },
    {
      type: "New Tenant",
      message: "Sushmita Das added to Room 204.",
      priority: "low",
    },
    {
      type: "Exit Notice",
      message: "Aditya Verma vacating on 30th May.",
      priority: "medium",
    },
    {
      type: "Maintenance Alert",
      message: "Water purifier service due.",
      priority: "high",
    },
  ];

  // Ant Design column definitions
  const columnDefs = [
    { title: "Tenant Name", dataIndex: "name", key: "name", sorter: true },
    { title: "Room No.", dataIndex: "room", key: "room", sorter: true },
    { title: "Monthly Rent", dataIndex: "rent", key: "rent", sorter: true },
    {
      title: "Payment Due",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    { title: "Status", dataIndex: "status", key: "status", sorter: true },
  ];

  // Sample row data for the table
  const rowData = [
    {
      key: 1,
      name: "Akash Kumar",
      room: "101A",
      rent: "₹7,000",
      dueDate: "05 May 2023",
      status: "Pending",
    },
    {
      key: 2,
      name: "Priya Reddy",
      room: "102B",
      rent: "₹7,500",
      dueDate: "10 May 2023",
      status: "Paid",
    },
    {
      key: 3,
      name: "Rajesh Patel",
      room: "201A",
      rent: "₹8,000",
      dueDate: "12 May 2023",
      status: "Pending",
    },
    {
      key: 4,
      name: "Sushmita Das",
      room: "204B",
      rent: "₹7,200",
      dueDate: "15 May 2023",
      status: "Paid",
    },
    {
      key: 5,
      name: "Aditya Verma",
      room: "103A",
      rent: "₹7,800",
      dueDate: "18 May 2023",
      status: "Partial",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header-section tabheader">Dashboard</div>
      {/* Main Content Section */}
      <div className="stats-section">
        <Row gutter={[16, 16]}>
          {/* Left Column - Stats and Table */}
          <Col xs={24} md={16} lg={18}>
            {/* Stats Cards */}
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6}>
                  <StatsCard
                    statName={stat.name}
                    count={stat.value}
                    icon={stat.icon}
                  />
                </Col>
              ))}
            </Row>

            {/* AG Grid Table */}
            <div style={{ marginTop: "16px", height: "" }}>
              <Table
                columns={columnDefs}
                dataSource={rowData}
                pagination={{ pageSize: 5 }}
              />
            </div>
          </Col>

          <Col xs={24} md={8} lg={6}>
            <div className="activity-section" style={{ width: "100%" }}>
              <div className="activity-title">Notifications & Logs</div>
              <ul className="activity-list">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className={`notification-item ${notification.priority}`}
                  >
                    <div className="notification-header">
                      <strong>{notification.type}</strong>
                      <span
                        className={`priority-badge ${notification.priority}`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                    <div className="notification-message">
                      {notification.message}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
