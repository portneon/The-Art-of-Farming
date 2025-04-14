import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Prop from "./prop";

function App() {
  return (
    <>
      <Navbar />
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
            <div class="grid-container">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
              <div class="grid-item">7</div>
              <div class="grid-item">8</div>
              <div class="grid-item">9</div>
              <div class="grid-item">10</div>
              <div class="grid-item">11</div>
              <div class="grid-item">12</div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}

export default App;
