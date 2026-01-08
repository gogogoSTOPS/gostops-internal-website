"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

/**
 * Create Context
 */
const AuthContext = createContext(null);

/**
 * Custom Hook
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

/**
 * Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load user on app start (example: from localStorage)
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user in storage");
        localStorage.removeItem("auth_user");
      }
    }

    setIsLoading(false);
  }, []);

  /**
   * Login
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  /**
   * Logout
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  /**
   * Memoized context value
   */
  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }),
    [user, isLoading]
  );

  /**
   * Provide context
   */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
