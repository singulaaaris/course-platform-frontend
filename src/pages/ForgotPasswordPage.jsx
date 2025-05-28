import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "../style/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();

  const { toggleTheme } = useContext(ThemeContext);
  const { toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/reset-password", form);
      setMessage(res.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data || t("error_generic"));
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

          <h1>{t("reset_password_title")}</h1>
          <p className="login-subtitle">{t("reset_password_desc")}</p>

          {message && <div className="login-success">{message}</div>}
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <input
                ref={emailRef}
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
                name="name"
                type="text"
                placeholder={t("name")}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                name="newPassword"
                type="password"
                placeholder={t("new_password")}
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">{t("reset_password")}</button>
          </form>
        </div>

        <div className="login-visual-section">
          <div className="gradient-overlay"></div>
          <div className="login-message">
            <h2>{t("reset_motivation_title")}</h2>
            <p>{t("reset_motivation_text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
