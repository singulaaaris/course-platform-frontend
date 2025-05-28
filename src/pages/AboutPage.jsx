import React from "react";
import { useTranslation } from "react-i18next";
import "../style/AboutPage.css";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-container">
        <h2>{t("about_title")}</h2>
        <p>{t("about_paragraph_1")}</p>
        <p>{t("about_paragraph_2")}</p>
        <p>{t("about_paragraph_3")}</p>
      </div>
    </div>
  );
};

export default AboutPage;
