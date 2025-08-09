import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "@/pages/common/Loading";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({  redirectPath = "/signin", children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;