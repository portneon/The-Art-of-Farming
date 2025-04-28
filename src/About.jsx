import React from "react";
// import Navbar from "./Navbar";
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
              <p>A searchable catalog of <strong>30,000+ plant species*</strong></p>
            </div>
            <div className="cards"><p>Plant data such as scientific/common names, growth habits, native regions, and ideal growing conditions</p></div>
            <div className="cards"><p>Filters by <strong>region, botanical family</strong>, and <strong>usage</strong> (e.g., ornamental, medicinal, edible)*.</p></div>
            <div className="cards"><p>Insights on soil types, climate suitability, and seasonal planting*</p></div>
          </div>
        </div>
        
        
        
      </div>
      <div className="whyContainer">
      <div className="why">
        <h1 style={{ textAlign: 'center' ,color:'#780C28'}}>Why The Art of Plant</h1>
        <div>
            <p style={{color:'#690B22'}}><strong>"The Art of Plant" </strong>is a celebration of the beauty, diversity, and significance of plants in our world. This platform offers an immersive experience where users can explore thousands of plant species, uncover their unique features, and appreciate their role in nature. Whether you're a<strong> gardening enthusiast, a student, or simply someone who admires the natural world</strong>, "The Art of Plant" brings the wonders of plant life to your fingertips, blending education with aesthetic appreciation.</p>
        </div>
        
        </div>
        </div>
      <div className="motocontainer">
      <div className="moto">
        <h2 style={{textAlign:"center",color:'#ada862'}}>OUR MOTO</h2>
        <h1 style={{textAlign:"center"}}>|| वनस्पतयः जीवनस्य प्रतीकाः सन्ति। ||</h1>
        <h3 style={{textAlign:"center",color:'E9762B'}}>Plants are symbols of life</h3>
        </div>
        </div>
      <div>
          <p style={{fontSize:'small',color:'#706D54'}}><small>* The feature is subject to you Plan.</small></p>
      </div>
    </>
  );
}

export default About;
