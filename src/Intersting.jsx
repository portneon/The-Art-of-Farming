import React from "react";
import { useState, useEffect } from "react";
import "./intresting.css";

function Intersting({ url, showDetailHandler }) {
  const [interstingPlant, setIntresting] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setIntresting(res))
      .catch((err) => console.error("Error fetching data:", err));
  }, [url]);

  if (!interstingPlant) {
    return <div>Loading...</div>;
  }

  return (
    <>
          <div className="intresting-container">
          <div>
          <button onClick={() => showDetailHandler(false)} style={{backgroundColor:'transparent',borderRadius:'50%',marginLeft:'20px'}}>X</button>
        </div>
              <div className="cover-container">
                  
          <div className="intresting-plant">
            <img
              src={interstingPlant.default_image?.original_url}
              alt="Plant"
            />
          </div>
          <div className="intersting-details">
            <div className="intresting-title">
              <h1>Common Name: {interstingPlant.common_name}</h1>
              <h2>Scientific Name: {interstingPlant.scientific_name?.[0]}</h2>
            </div>
            <div className="intresting-intro">
              <h2>Description</h2>
              <p>{interstingPlant.description}</p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Intersting;
