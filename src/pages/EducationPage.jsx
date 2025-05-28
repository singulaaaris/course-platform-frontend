import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../style/EducationPage.css";

const EducationPage = () => {
  const { t } = useTranslation();

  const fields = [
    {
      title: "Artificial Intelligence",
      icon: "🤖",
      summary: "Dive into AI models, neural networks, and deep learning algorithms."
    },
    {
      title: "Cybersecurity",
      icon: "🛡️",
      summary: "Protect systems from digital attacks and understand ethical hacking."
    },
    {
      title: "Cloud Computing",
      icon: "☁️",
      summary: "Master cloud platforms like AWS, Azure, and Google Cloud."
    },
    {
      title: "Digital Marketing",
      icon: "📣",
      summary: "Learn SEO, analytics, and online branding strategies."
    }
  ];

  return (
    <div className="edu-wrapper">
      <header className="edu-header">
        <h1>{t("education_title")}</h1>
        <p>{t("education_intro")}</p>
      </header>

      <section className="edu-grid">
        {fields.map((field, index) => (
          <div className="edu-card" key={index}>
            <div className="edu-icon">{field.icon}</div>
            <h2>{field.title}</h2>
            <p>{field.summary}</p>
            <Link to="/catalog" className="edu-link">
              {t("explore_courses")}
            </Link>
          </div>
        ))}
      </section>

      <footer className="edu-footer-cta">
        <h2>{t("join_learning_journey")}</h2>
        <Link to="/register" className="edu-cta-button">
          {t("start_now")}
        </Link>
      </footer>
    </div>
  );
};

export default EducationPage;
