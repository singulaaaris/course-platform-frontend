import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import "../style/DashboardPage.css";

const DashboardPage = () => {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();

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
      setStatus(" Профиль обновлён!");
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
      setStatus(" Ошибка при обновлении профиля");
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
      })
      setStatus(" Курс создан!");
      fetchCreatedCourses();
    } catch (error) {
      console.error("Ошибка при создании курса:", error);
      setStatus("Не удалось создать курс");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/courses/${courseId}`);
      setMyCreatedCourses(prev => prev.filter(c => c.id !== courseId));
      setStatus(" Курс удалён");
    } catch (error) {
      console.error("Ошибка удаления курса:", error);
      setStatus(" Не удалось удалить курс");
    }
  };

  if (!user) return <p>Вы не вошли в систему</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name || "User"} !</h2>

      <div className="dashboard-info">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar placeholder">No Avatar</div>
        )}

        <div className="form-section">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleUpdate}>Save Changes</button>
          {status && <p className="status-msg">{status}</p>}
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/catalog")}>Go to Catalog</button>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="create-course-form">
        <h3>Create New Course</h3>
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCourse.imageUrl}
          onChange={(e) => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
        />
        <input
          type="number"
          placeholder="Category ID"
          value={newCourse.categoryId}
          onChange={(e) => setNewCourse({ ...newCourse, categoryId: e.target.value })}
        />
        <button onClick={handleCreateCourse}>Create Course</button>
      </div>

      <div className="dashboard-courses">
        <h3>Courses You Created</h3>
        {myCreatedCourses.length === 0 ? (
          <p>You haven’t created any courses yet.</p>
        ) : (
          <div className="dashboard-course-grid">
            {myCreatedCourses.map((course) => (
              <div key={course.id} className="dashboard-course-card">
                <h4>{course.title}</h4>
                <p>{course.categoryName}</p>
                <p>❤️ {course.likesCount} | ⭐ {course.averageRating.toFixed(1)}</p>
                <button onClick={() => handleDeleteCourse(course.id)} className="delete-course-button">
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-courses">
        <h3>🎓 Courses You Are Enrolled In</h3>
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any courses.</p>
        ) : (
          <div className="dashboard-course-grid">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="dashboard-course-card">
                <h4>{course.title}</h4>
                <p>{course.categoryName}</p>
                <p>❤️ {course.likesCount} | ⭐ {course.averageRating.toFixed(1)}</p>
                <a href={`/catalog/${course.id}`} className="view-course-button">View Course</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
