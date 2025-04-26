import { Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  CreditCardOutlined,
  HomeOutlined,
  FileTextOutlined,
  NotificationOutlined,
  ToolOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "tenants",
      icon: <TeamOutlined />,
      label: "Tenants",
      onClick: () => navigate("/tenants"),
    },
    {
      key: "payments",
      icon: <CreditCardOutlined />,
      label: "Payments",
      onClick: () => navigate("/payments"),
    },
    {
      key: "rooms",
      icon: <HomeOutlined />,
      label: "Rooms",
      onClick: () => navigate("/rooms"),
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: "Reports",
      onClick: () => navigate("/reports"),
    },
    {
      key: "notices",
      icon: <NotificationOutlined />,
      label: "Notices",
      onClick: () => navigate("/notices"),
    },
    {
      key: "maintenance",
      icon: <ToolOutlined />,
      label: "Maintenance",
      onClick: () => navigate("/maintenance"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={menuItems}
      inlineCollapsed={collapsed}
    />
  );
};

export default Sidebar;
