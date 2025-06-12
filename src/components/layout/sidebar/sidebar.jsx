import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { DashboardIcon, MaintenanceIcon, NoticesIcon, PaymentsIcon, ReportsIcon, RoomsIcon, SettingsIcon, TenantsIcon } from "../../resusableComponents/DrayageIcons";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Get the current path to determine selected key
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return ['dashboard'];
    return [path.split('/')[1]];
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="logo-container">
          <h1 className="logo-text">PG Manager</h1>
        </div>
      </div>
      <div className="sidebar-menu-wrapper">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          inlineCollapsed={collapsed}
          className="sidebar-menu"
        />
      </div>
    </div>
  );
};

export default Sidebar;
