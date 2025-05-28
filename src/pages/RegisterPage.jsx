import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import "../style/RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(t("register_error"));
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-section">
          <h1>{t("register_title")}</h1>
          <p className="register-subtitle">{t("register_subtitle")}</p>

          {error && <div className="register-error">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-field">
              <input
                name="name"
                type="text"
                placeholder={t("register_name")}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                name="email"
                type="email"
                placeholder={t("register_email")}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <input
                name="password"
                type="password"
                placeholder={t("register_password")}
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-button">{t("register_button")}</button>
          </form>

          <div className="login-link">
            {t("register_login_text")} <Link to="/login">{t("login")}</Link>
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
            <button onClick={toggleTheme}>{t("toggle_theme")}</button>
            <button onClick={toggleLanguage}>{language === "en" ? "RU" : "EN"}</button>
          </div>
        </div>

        <div className="register-visual-section">
          <div className="register-message">
            <h2>{t("register_side_title")}</h2>
            <p>{t("register_side_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
