import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tenants from "./pages/Tenants/Tenants";
import Payments from "./pages/Payments/Payments";
import Rooms from "./pages/Rooms/Rooms";
import Reports from "./pages/Reports/Reports";
import Notices from "./pages/Notices/Notices";
import Maintenance from "./pages/Maintenance/Maintenance";
import Settings from "./pages/Settings/Settings";
import TableDemo from "./pages/TableDemo/TableDemo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tenants",
        element: <Tenants />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "notices",
        element: <Notices />,
      },
      {
        path: "maintenance",
        element: <Maintenance />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "table-demo",
        element: <TableDemo />,
      },
    ],
  },
]);
