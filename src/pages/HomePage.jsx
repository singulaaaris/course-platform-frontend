import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/женщина.png";
import BestCategories from "../components/BestCategories";
import FeaturesSection from "../components/FeaturesSection";
import BestCourses from "../components/BestCourses";
import "../style/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="home-wrapper">
        <div className="home-inner">
          <div className="home-left">
            <h1>
              Your journey to <span className="highlight">knowledge</span> begins on <span className="brand">Skillway.</span>
            </h1>
            <p>
              Educational platform and marketplace<br />
              of online courses
            </p>
            <button onClick={() => navigate("/catalog")}>Go to catalog</button>
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
