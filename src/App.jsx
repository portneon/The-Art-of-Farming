import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Prop from "./prop.jsx";
import Footer from "./Footer.jsx";
import FetchAllPlants from "./datafetcher.jsx";

function App() {
  return (
    <>
      <div> <Navbar /></div>
      
      <div className="main-box">
        <div className="content">
          <div className="section">
            <div className="main-text">
              <h2 className="h1">Welcome</h2>
              <h2 className="b1">Discover the World of Plants</h2>
              <h4 className="b2">
                Uncover the secrets of 30,000+ plant species browse by region,
                botanical family, or growth habit to explore the rich tapestry
                of plant life across the globe.
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* //body section ke liye hai */}

      <div className="main-box">
        {" "}
        <div className="content">
          <div className="section2">
              <div className="grid-item">1</div>
              <div className="grid-item">2</div>
              <div className="grid-item">3</div>
              <div className="grid-item">4</div>
            <div className="grid-container">
            
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Prop url={'https://perenual.com/api/species-care-guide-list?key=sk-dRMV67fff37f267189837'} />
      <FetchAllPlants />
   
    
    </>

  );
}

export default App;
