import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user: auth?.user, token: auth?.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
