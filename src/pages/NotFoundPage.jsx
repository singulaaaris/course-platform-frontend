import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/NotFoundPage.css";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`notfound-page ${darkMode ? "dark" : "light"}`}>
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">{t("notfound_title")}</h2>
        <p className="notfound-desc">{t("notfound_desc")}</p>
        <Link to="/" className="notfound-home-button">
          {t("go_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;