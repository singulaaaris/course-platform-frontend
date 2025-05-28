import React from "react";
import { useTranslation } from "react-i18next";
import "../style/FeaturesSection.css";

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">
          {t("features_title_part1")} <span className="highlight">{t("features_title_highlight")}</span> {t("features_title_part2")}<br />
          {t("features_title_part3")}
        </h2>

        <div className="features-list">
          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-pink"></div>
              <p>
                {t("features_course_range_line1")}<br />
                {t("features_course_range_line2")}
              </p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-purple"></div>
              <p>
                {t("features_certificates_line1")}<br />
                {t("features_certificates_line2")}
              </p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-light-pink"></div>
              <p>
                {t("features_schedule_line1")}<br />
                {t("features_schedule_line2")}
              </p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap no-plus">
            <div className="feature-item">
              <div className="line line-purple"></div>
              <p>
                {t("features_support_line1")}<br />
                {t("features_support_line2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
