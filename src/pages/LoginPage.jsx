import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import "../style/LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { toggleTheme } = useContext(ThemeContext);
  const { toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      const { token, user } = res.data;
      login({ user, token });
      navigate("/dashboard");
    } catch (err) {
      setError(t("login_error"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-header-controls">
            <button className="lang-toggle" onClick={toggleLanguage}>{t("language")}</button>
            <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
          </div>

          <h1>{t("login_welcome")}</h1>
          <p className="login-subtitle">{t("login_subtitle")}</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <input
                name="email"
                type="email"
                placeholder={t("email")}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                name="password"
                type="password"
                placeholder={t("password")}
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">{t("forgot_password")}</Link>
            </div>

            <button type="submit" className="login-button">{t("login")}</button>
          </form>

          <div className="signup-link">
            <span>{t("no_account")}</span>
            <Link to="/register">{t("signup")}</Link>
          </div>
        </div>

        <div className="login-visual-section">
          <div className="gradient-overlay"></div>
          <div className="login-message">
            <h2>{t("login_motivation_title")}</h2>
            <p>{t("login_motivation_text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
