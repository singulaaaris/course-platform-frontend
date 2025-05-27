import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../style/BestCategories.css";

const BestCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


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
    <section className="best-categories-section">
      <h1>Skillway Best</h1>
      <p className="subtitle">A selection of our best categories</p>

      {categories.length > 0 ? (
        <div className="category-grid">
          {categories.slice(0, 6).map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-tags">
                <span className={`tag ${getColorClass(cat.name)}`}>{cat.name}</span>
                <span className="tag-count">{cat.courseCount} courses</span>
              </div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Нет категорий для отображения
        </p>
      )}

      
      <button className="view-more-btn" onClick={() => navigate("/categories")}>
  View more
</button>

    </section>
  );
};

export default BestCategories;
