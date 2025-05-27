import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import "../style/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

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
          <NavLink to="/catalog">Courses</NavLink>
          <NavLink to="/education">Education</NavLink>
          <NavLink to="/companies">For companies</NavLink>
        </nav>

        <div className="header-actions">
          <span className="language" onClick={toggleLanguage}>
            Language: {language.toUpperCase()}
          </span>
          <div className="theme-toggle" onClick={toggleTheme}></div>

          <button className="login-btn" onClick={handleUserClick}>
            {user ? user.name : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
