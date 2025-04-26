import React from "react";
import "./App.css"; 

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@600&display=swap');

  .heading-font {
    font-family: 'Playfair Display', serif;
  }

  .body-font {
    font-family: 'Open Sans', sans-serif;
  }
`;

const Home = () => {
  return (
    <>
      <style>{fontStyles}</style>

      <div className="main-box body-font">
        <div className="content">
          <div className="section">
            <div className="main-text">
              <h2 className="h1 heading-font">Welcome</h2>
              <h2 className="b1 heading-font">Discover the World of Plants</h2>
              <h4 className="b2">
                Uncover the secrets of 30,000+ plant species. Browse by region,
                botanical family, or growth habit to explore the rich tapestry
                of plant life across the globe.
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="main-box body-font">
        <div className="content">
          <div className="section2">
            <div className="grid-item"><strong>PLANTS? </strong></div>
            <div className="grid-item"><strong>NO</strong></div>
            <div className="grid-item"><strong>It's</strong></div>
            <div className="grid-item"><strong>Future</strong></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
