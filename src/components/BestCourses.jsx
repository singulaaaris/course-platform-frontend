import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/BestCourses.css";

const BestCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:8080/api/courses")
      .then(res => setCourses(res.data.slice(0, 8)))
      .catch(err => console.error("Ошибка загрузки курсов", err));
  }, []);

  const handleViewMore = () => {
    navigate(user ? "/catalog" : "/login");
  };

  return (
    <section className="best-courses-section">
      <h2>Skillway Best</h2>
      <p className="subtitle">A selection of our best courses</p>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="course-image"
              />
            </div>
            <div className="course-body">
              <h3>{course.title}</h3>
              <p className="author">by {course.author.name}</p>
              <div className="meta">
                <span>★ {course.averageRating.toFixed(1)}</span>
                <span>❤️ {course.likesCount}</span>
                <span>💬 {course.commentsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-more-btn" onClick={handleViewMore}>
        View more
      </button>
    </section>
  );
};

export default BestCourses;
