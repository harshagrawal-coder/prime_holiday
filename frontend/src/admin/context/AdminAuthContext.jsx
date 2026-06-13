import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../../services/api";

const ADMIN_STORAGE_KEY = "prime-holiday-admin-auth";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    
    if (token && savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
      checkAuth();
    }
    setLoading(false);
  }, []);

  const checkAuth = async () => {
    try {
      const res = await authService.getMe();
      setAdmin(res.data.user);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(res.data.user));
    } catch (error) {
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      const { token, user } = res.data;
      
      if (user.role !== "admin") {
        return { success: false, message: "Access denied. Admin only." };
      }
      
      localStorage.setItem("adminToken", token);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
      setAdmin(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return context;
};

export default AdminAuthContext;
