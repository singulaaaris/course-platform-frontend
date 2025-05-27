import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  selectCourses,
  selectTotalPages,
  setSearch,
  setCategory,
  setSort,
  setPage
} from "../redux/slices/coursesSlice";
import "../style/CatalogPage.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const totalPages = useSelector(selectTotalPages);
  const { search, category, sort, page } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [search, category, sort, page, dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(setPage(0));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
    dispatch(setPage(0));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
    dispatch(setPage(0));
  };

  const changePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(setPage(newPage));
    }
  };

  // ✅ useMemo для оптимизации сортировки по лайкам
  const visibleCourses = useMemo(() => {
    if (sort === "likes") {
      return [...courses].sort((a, b) => b.likesCount - a.likesCount);
    }
    return courses;
  }, [courses, sort]);

  return (
    <div className="catalog-page">
      <h2>All Courses</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={handleSearch}
        />

        <select value={category} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          <option value="Development">Development</option>
          <option value="Programming">Programming</option>
          <option value="Python">Python</option>
          <option value="Web-development">Web-development</option>
          <option value="English">English</option>
          <option value="SQL and databases">SQL and databases</option>
          <option value="Data Science и ML">Data Science и ML</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="DevOps">DevOps</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>

        <select value={sort} onChange={handleSortChange}>
          <option value="title">Sort by Title</option>
          <option value="id">Newest First</option>
          <option value="likes">Sort by Likes</option>
        </select>
      </div>

      <div className="course-list">
        {Array.isArray(visibleCourses) && visibleCourses.length > 0 ? (
          visibleCourses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.imageUrl} alt={course.title} />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-stats">
                  <span>★ {course.averageRating.toFixed(1)}</span>
                  <span>❤️ {course.likesCount}</span>
                  <span>💬 {course.commentsCount}</span>
                </div>
                <Link to={`/catalog/${course.id}`} className="view-course-button">
                  View Course
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => changePage(page - 1)} disabled={page === 0}>
          Previous
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => changePage(num)}
            className={num === page ? "active-page" : ""}
          >
            {num + 1}
          </button>
        ))}

        <button onClick={() => changePage(page + 1)} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CatalogPage;
