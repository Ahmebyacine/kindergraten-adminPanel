import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import api from "@/api";
import Loading from "@/pages/common/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/v1/auth/me");
      setUser(res.data.user);
      console.log(res.data.user)
    } catch (err) {
      setUser(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading ? <Loading /> : <Outlet />}
      {children}
    </AuthContext.Provider>
  );
};
