import { createContext, useCallback, useContext, useMemo, useState } from "react";

const USER_STORAGE_KEY = "prime-holiday-user-auth";
const USERS_STORAGE_KEY = "prime-holiday-users";

const UserAuthContext = createContext(null);

const readStoredJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

const encodePassword = (password) => window.btoa(password.trim());
const sanitizeUser = ({ password, ...user }) => user;
const createUserId = () => globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}`;

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => readStoredJson(USER_STORAGE_KEY, null));
  const [users, setUsers] = useState(() => readStoredJson(USERS_STORAGE_KEY, []));

  const completeLogin = useCallback((account) => {
    const sessionUser = sanitizeUser(account);
    setCurrentUser(sessionUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
    return { success: true };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return { success: false, message: "Name, email, and password are required." };
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return { success: false, message: "User already exists. Please login." };
    }

    const newUser = {
      id: createUserId(),
      name: name.trim(),
      email: normalizedEmail,
      password: encodePassword(password),
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));

    return completeLogin(newUser);
  }, [completeLogin, users]);

  const login = useCallback(({ email, password }) => {
    const normalizedEmail = email?.trim().toLowerCase();
    const user = users.find((account) => account.email === normalizedEmail);

    if (!user) {
      return { success: false, message: "No account found. Please register first." };
    }

    if (user.password !== encodePassword(password)) {
      return { success: false, message: "Invalid email or password." };
    }

    return completeLogin(user);
  }, [completeLogin, users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user: currentUser,
      currentUser,
      isAuthenticated: Boolean(currentUser),
      register,
      login,
      logout,
    }),
    [currentUser, login, logout, register]
  );

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within UserAuthProvider");
  }
  return context;
};
