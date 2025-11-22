import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signin from "./pages/auth/Signin";
import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Plans from "./pages/admin/Plans";
import Layout from "./layouts/layout";
import Tenants from "./pages/admin/Tenants";
import ResendLoginInfoPage from "./pages/admin/ResendLoginInfoPage";
import UpdateTenantEmailPage from "./pages/admin/UpdateTenantEmailPage";

const router = createHashRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "plans",
                element: <Plans />,
              },
              {
                path: "tenants",
                element: <Tenants />,
              },
              { path: "resend-login-info", element: <ResendLoginInfoPage /> },
              { path: "update-tenant-email", element: <UpdateTenantEmailPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
