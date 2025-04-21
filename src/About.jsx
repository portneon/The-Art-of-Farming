import React from "react";
import Navbar from "./Navbar";
import "./About.css";

function About() {
  return (
    <>
   
      <div className="about-container">
        <div className="main-titlebox">
          <div className="greeting-main">
            <h1>NAMASTE ! WELCOME TO THE <strong>FARMSLAND</strong></h1>
            <p><strong>The Art of Farming</strong> is a digital platform designed to explore the science and beauty behind plants and agriculture. It offers users detailed information about thousands of plant species, farming methods, and sustainable growing practices. With a focus on <strong>education and environmental awareness</strong>, the platform serves as a guide for students, hobbyists, and nature enthusiasts.</p>
          </div>
          <div className="greeting-sub">
            <div className="cards">
              <p>A searchable catalog of <strong>30,000+ plant species</strong></p>
            </div>
            <div className="cards"><p>Plant data such as scientific/common names, growth habits, native regions, and ideal growing conditions</p></div>
            <div className="cards"><p>Filters by <strong>region, botanical family</strong>, and <strong>usage</strong> (e.g., ornamental, medicinal, edible).</p></div>
            <div className="cards"><p>Insights on soil types, climate suitability, and seasonal planting</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
