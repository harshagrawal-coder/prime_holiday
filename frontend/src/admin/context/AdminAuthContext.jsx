import { createContext, useContext, useState, useEffect } from "react";

const ADMIN_STORAGE_KEY = "prime-holiday-admin-auth";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === "admin@primeholiday.com" && password === "admin123") {
      const user = { email: "admin@primeholiday.com", name: "Admin", role: "admin" };
      localStorage.setItem("adminToken", "local-admin-token");
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
      setAdmin(user);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials. Use admin@primeholiday.com / admin123" };
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
