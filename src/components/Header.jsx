import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import "../style/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleUserClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>

        <nav className="nav-links">
          <NavLink to="/catalog">{t("courses")}</NavLink>
          <NavLink to="/education">{t("education")}</NavLink>
          <NavLink to="/contact">{t("contact")}</NavLink>
        </nav>

        <div className="header-actions">
          <span className="language" onClick={toggleLanguage}>
            {t("language")}: {language.toUpperCase()}
          </span>
          <div className="theme-toggle" onClick={toggleTheme}></div>
          <button className="login-btn" onClick={handleUserClick}>
            {user ? user.name : t("login")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
