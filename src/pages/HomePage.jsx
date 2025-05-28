import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import image from "../assets/женщина.png";
import BestCategories from "../components/BestCategories";
import FeaturesSection from "../components/FeaturesSection";
import BestCourses from "../components/BestCourses";
import "../style/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <section className="home-wrapper">
        <div className="home-inner">
          <div className="home-left">
            <h1>
              {t("home_title_part1")} <span className="highlight">{t("home_title_highlight")}</span> {t("home_title_part2")} <span className="brand">Skillway.</span>
            </h1>
            <p>
              {t("home_description_line1")}<br />
              {t("home_description_line2")}
            </p>
            <button onClick={() => navigate("/catalog")}>{t("home_button")}</button>
          </div>

          <div className="home-right">
            <img src={image} alt="Hero" />
          </div>
        </div>
      </section>

      <BestCategories />
      <FeaturesSection />
      <BestCourses />
    </>
  );
};

export default HomePage;
