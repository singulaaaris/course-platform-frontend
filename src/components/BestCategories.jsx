import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../style/BestCategories.css";

const BestCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("❌ Пришёл не массив:", data);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки категорий", err);
      });
  }, []);

  const getColorClass = (name) => {
    const key = name.toLowerCase();
    if (key.includes("programming")) return "tag-pink";
    if (key.includes("python")) return "tag-purple";
    if (key.includes("english")) return "tag-blue";
    if (key.includes("sql")) return "tag-red";
    if (key.includes("data")) return "tag-indigo";
    if (key.includes("dev")) return "tag-purple-dark";
    return "tag-gray";
  };

  return (
    <div className="best-categories-wrapper">
      <section className="best-categories-section">
        <h1>{t("best_title")}</h1>
        <p className="subtitle">{t("best_subtitle")}</p>

        {categories.length > 0 ? (
          <div className="category-grid">
            {categories.slice(0, 6).map((cat) => (
              <div key={cat.id} className="category-card">
                <div className="category-tags">
                  <span className={`tag ${getColorClass(cat.name)}`}>{cat.name}</span>
                  <span className="tag-count">{cat.courseCount} {t("courses").toLowerCase()}</span>
                </div>
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>{t("no_categories")}</p>
        )}

        <button className="view-more-btn" onClick={() => navigate("/categories")}>
          {t("view_more")}
        </button>
      </section>
    </div>
  );
};

export default BestCategories;
