import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CoursePage from "./pages/CoursePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPanel from "./pages/AdminPanel";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; 

const App = () => {
  const { user } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/register", "/forgot-password"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CoursePage />} />

        <Route
          path="/login"
          element={
            user ? (
              isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <RegisterPage />
            )
          }
        />

        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
