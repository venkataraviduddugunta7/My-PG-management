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
import { DashboardIcon, MaintenanceIcon, NoticesIcon, PaymentsIcon, ReportsIcon, RoomsIcon, SettingsIcon, TenantsIcon } from "../../resusableComponents/DrayageIcons";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "tenants",
      icon: <TenantsIcon />,
      label: "Tenants",
      onClick: () => navigate("/tenants"),
    },
    {
      key: "payments",
      icon: <PaymentsIcon />,
      label: "Payments",
      onClick: () => navigate("/payments"),
    },
    {
      key: "rooms",
      icon: <RoomsIcon />,
      label: "Rooms",
      onClick: () => navigate("/rooms"),
    },
    {
      key: "reports",
      icon: <ReportsIcon />,
      label: "Reports",
      onClick: () => navigate("/reports"),
    },
    {
      key: "notices",
      icon: <NoticesIcon />,
      label: "Notices",
      onClick: () => navigate("/notices"),
    },
    {
      key: "maintenance",
      icon: <MaintenanceIcon />,
      label: "Maintenance",
      onClick: () => navigate("/maintenance"),
    },
    {
      key: "settings",
      icon: <SettingsIcon />,
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
