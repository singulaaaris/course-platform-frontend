import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import {
  fetchCourseById,
  selectCourse,
  selectCourseLoading,
  selectCourseError
} from "../redux/slices/courseSlice";
import { useAuth } from "../context/AuthContext";
import CommentsSection from "../components/CommentsSection";
import "../style/CoursePage.css";

const CoursePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const course = useSelector(selectCourse);
  const loading = useSelector(selectCourseLoading);
  const error = useSelector(selectCourseError);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [id, dispatch]);

  const handleCommentSubmit = async (content) => {
  try {
    await axios.post(`/comments/${course.id}`, content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    dispatch(fetchCourseById(course.id));
  } catch (err) {
    console.error("Failed to post comment:", err);
  }
};

  const handleLike = async () => {
    try {
      await axios.post(`/courses/${id}/like`);
      dispatch(fetchCourseById(id));
    } catch (err) {
      console.error("Failed to like:", err);
      setMessage(" You must be logged in to like.");
    }
  };

  const handleRate = async (value) => {
    try {
      await axios.post(`/courses/${id}/rate?value=${value}`);
      dispatch(fetchCourseById(id));
      setMessage(` You rated ${value} ★`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to rate:", err);
      setMessage("You must be logged in to rate.");
    }
  };

  const handleEnroll = async () => {
    try {
      await axios.post(`/courses/${id}/enroll`);
      dispatch(fetchCourseById(id));
      setMessage("You've enrolled in this course!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to enroll:", err);
      setMessage(" You must be logged in to enroll.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!course) return null;

  return (
    <div className="course-page">
      <h1 className="course-title">{course.title}</h1>
      <img src={course.imageUrl} alt={course.title} className="course-image" />
      <p className="course-description">{course.description}</p>

      <div className="course-meta">
        <span className="course-badge">Category: {course.categoryName}</span>
        <span className="course-badge">Likes: {course.likesCount}</span>
        <span className="course-badge">Rating: {course.averageRating.toFixed(1)} ★</span>
        <span className="course-badge">Comments: {course.commentsCount}</span>
      </div>

     <div className="course-actions">
  <button className="action-button like" onClick={handleLike}>❤️ Like</button>
  <button className="action-button enroll" onClick={handleEnroll}>Enroll</button>
  
  <div className="rate-buttons">
    Rate:
    {[1, 2, 3, 4, 5].map((val) => (
      <button key={val} onClick={() => handleRate(val)}>{val}★</button>
    ))}
  </div>
</div>


      {message && <p className="message">{message}</p>}

      <h2 className="comments-heading">Comments</h2>
      <CommentsSection
        comments={course.comments || []}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default CoursePage;
