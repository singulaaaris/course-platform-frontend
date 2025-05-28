import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import "../style/DashboardPage.css";

const DashboardPage = () => {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [password, setPassword] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [myCreatedCourses, setMyCreatedCourses] = useState([]);
  const [status, setStatus] = useState("");

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageUrl: "",
    categoryId: ""
  });

  useEffect(() => {
    if (user && token) {
      setName(user.name || "");
      setAvatarUrl(user.avatarUrl || "");
      fetchEnrolledCourses();
      fetchCreatedCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await axios.get("/users/me/courses");
      setEnrolledCourses(res.data);
    } catch (error) {
      console.error("Ошибка загрузки записей:", error);
    }
  };

  const fetchCreatedCourses = async () => {
    try {
      const res = await axios.get("/courses/me/created-courses");
      setMyCreatedCourses(res.data);
    } catch (error) {
      console.error("Ошибка загрузки созданных курсов:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updateData = { name, avatarUrl };
      if (password) updateData.password = password;

      const res = await axios.put("/users/me", updateData);
      login({ user: res.data, token });
      setStatus(t("dashboard_update_success"));
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
      setStatus(t("dashboard_update_error"));
    }
  };

  const handleCreateCourse = async () => {
    try {
      const payload = {
        title: newCourse.title,
        description: newCourse.description,
        imageUrl: newCourse.imageUrl,
        category: {
          id: Number(newCourse.categoryId)
        }
      };

      await axios.post("/courses", payload);
      setNewCourse({
        title: "",
        description: "",
        imageUrl: "",
        categoryId: ""
      });
      setStatus(t("dashboard_course_created"));
      fetchCreatedCourses();
    } catch (error) {
      console.error("Ошибка при создании курса:", error);
      setStatus(t("dashboard_course_create_error"));
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/courses/${courseId}`);
      setMyCreatedCourses(prev => prev.filter(c => c.id !== courseId));
      setStatus(t("dashboard_course_deleted"));
    } catch (error) {
      console.error("Ошибка удаления курса:", error);
      setStatus(t("dashboard_course_delete_error"));
    }
  };

  if (!user) return <p>{t("dashboard_not_logged_in")}</p>;

  return (
    <div className="dashboard">
      <h2>{t("dashboard_welcome")}, {user.name || t("dashboard_user")}!</h2>

      <div className="dashboard-info">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar placeholder">{t("dashboard_no_avatar")}</div>
        )}

        <div className="form-section">
          <input
            type="text"
            placeholder={t("dashboard_placeholder_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("dashboard_placeholder_avatar")}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("dashboard_placeholder_password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleUpdate}>{t("dashboard_save")}</button>
          {status && <p className="status-msg">{status}</p>}
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/catalog")}>{t("dashboard_catalog")}</button>
        <button onClick={logout}>{t("logout")}</button>
      </div>

      <div className="create-course-form">
        <h3>{t("dashboard_create_title")}</h3>
        <input
          type="text"
          placeholder={t("dashboard_course_title")}
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <textarea
          placeholder={t("dashboard_course_description")}
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <input
          type="text"
          placeholder={t("dashboard_course_image")}
          value={newCourse.imageUrl}
          onChange={(e) => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
        />
        <input
          type="number"
          placeholder={t("dashboard_course_category")}
          value={newCourse.categoryId}
          onChange={(e) => setNewCourse({ ...newCourse, categoryId: e.target.value })}
        />
        <button onClick={handleCreateCourse}>{t("dashboard_create")}</button>
      </div>

      <div className="dashboard-courses">
        <h3>{t("dashboard_created_courses")}</h3>
        {myCreatedCourses.length === 0 ? (
          <p>{t("dashboard_no_created")}</p>
        ) : (
          <div className="dashboard-course-grid">
            {myCreatedCourses.map((course) => (
              <div key={course.id} className="dashboard-course-card">
                <h4>{course.title}</h4>
                <p>{course.categoryName}</p>
                <p>❤️ {course.likesCount} | ⭐ {course.averageRating.toFixed(1)}</p>
                <button onClick={() => handleDeleteCourse(course.id)} className="delete-course-button">
                  🗑 {t("delete")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-courses">
        <h3>{t("dashboard_enrolled")}</h3>
        {enrolledCourses.length === 0 ? (
          <p>{t("dashboard_no_enrolled")}</p>
        ) : (
          <div className="dashboard-course-grid">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="dashboard-course-card">
                <h4>{course.title}</h4>
                <p>{course.categoryName}</p>
                <p>❤️ {course.likesCount} | ⭐ {course.averageRating.toFixed(1)}</p>
                <a href={`/catalog/${course.id}`} className="view-course-button">{t("view_course")}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;