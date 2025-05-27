import React from "react";
import "../style/FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">
          Use all <span className="highlight">the</span> possibilities of online
          <br />
          education in one product
        </h2>

        <div className="features-list">
          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-pink"></div>
              <p>Wide range of<br />courses</p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-purple"></div>
              <p>Issuance of<br />certificates</p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap">
            <div className="feature-item">
              <div className="line line-light-pink"></div>
              <p>Flexible<br />learning schedule</p>
            </div>
            <div className="plus">+</div>
          </div>

          <div className="feature-wrap no-plus">
            <div className="feature-item">
              <div className="line line-purple"></div>
              <p>Feedback and<br />support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
