import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../style/Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-logo">© SkillWay {new Date().getFullYear()}</span>
        <nav className="footer-links">
          <button onClick={() => navigate("/catalog")}>{t("courses")}</button>
          <button onClick={() => navigate("/about")}>{t("about")}</button>
          <button onClick={() => navigate("/contact")}>{t("contact")}</button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
