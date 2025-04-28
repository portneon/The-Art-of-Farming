import React, { useEffect, useState, useRef } from "react";
import "./Props.css";

function Prop() {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [careGuide, setCareGuide] = useState(null);
  const suggestionRef = useRef();

  
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/portneon/plantsapi/refs/heads/main/plants.json"
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setPlants(res.data);
        } else {
          console.error("Data not found in response");
        }
      })
      .catch((err) => console.error("Failed to fetch plants:", err));
  }, []);

  
  const fetchCareGuide = (url) => {
    if (!url) {
      setCareGuide(null);
      return;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCareGuide(data))
      .catch((err) => {
        console.error("Failed to fetch care guide:", err);
        setCareGuide(null);
      });
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = plants.filter(
        (plant) =>
          plant.common_name &&
          plant.common_name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handlePlantSelect = (plant) => {
    if (!plant) return;
    setSelectedPlant(plant);
    setQuery(plant.common_name || "");
    setSuggestions([]);
    fetchCareGuide(plant.care_guides);
  };

  return (
    <>
      <div className="search-nav">
        <div className="search-container" ref={suggestionRef}>
          <h1 className="plants-title">
            {selectedPlant ? selectedPlant.common_name : "Search for a Plant"}
          </h1>
          <div className="dummy">
          <input
            className="input-field"
            placeholder="Type the name of the plant..."
            value={query}
            onChange={handleInputChange}
          />

          {suggestions.length > 0 && (
            <ul className="suggestion-list">
              {suggestions.map((plant, idx) => (
                <li
                  key={plant.id ? `${plant.id}-${idx}` : idx}
                  onClick={() => handlePlantSelect(plant)}
                  className="suggestion-list-items"
                  style={{ cursor: "pointer" }}
                >
                  {plant.common_name}
                </li>
              ))}
            </ul>
            )}
            </div>
        </div>
      </div>

      {!selectedPlant && (
        <div className="no-selection-message">
          <div className="no-sec">
            <h2>Please search and select a plant to see details!</h2>
          </div>
        </div>
      )}

      {selectedPlant && (
        <div className="content">
          <div className="title-head">
            <div className="inner-container">
              {/* Description Section */}
              <div className="discription-section">
                <div className="head-title">
                  <h2 style={{ color: "#D3F1DF" }}>
                    Scientific Name: {selectedPlant.scientific_name || "N/A"}
                  </h2>
                  <h3>Genus: {selectedPlant.genus || "Unknown"}</h3>
                  <h3>Cultivar: {selectedPlant.cultivar || "Unknown"}</h3>
                </div>

                <div className="description-sectionin">
                  <h3>Description:</h3>
                  <p>{selectedPlant.description || "No description available."}</p>
                </div>
              </div>

              {/* Image Section */}
              <div className="photo-head">
                {selectedPlant.default_image?.original_url ? (
                  <img
                    src={selectedPlant.default_image.original_url}
                    alt={selectedPlant.common_name}
                    height="500px"
                    width="400px"
                  />
                ) : (
                  <p>No image available.</p>
                )}
              </div>
            </div>

            {/* Care Guide Section */}
            <div className="species-care">
              {careGuide?.data?.[0]?.section?.length > 0 ? (
                <>
                  <h4>Care Guide:</h4>
                  <ul>
                    {careGuide.data[0].section.map((section, idx) => (
                      <li key={idx}>
                        <strong>
                          {section.type.charAt(0).toUpperCase() +
                            section.type.slice(1)}
                          :
                        </strong>{" "}
                        {section.description}
                      </li>
                    ))}
                  </ul>
                  <div className="propagation-section">
              <h4>Propagation Methods:</h4>
              {selectedPlant.propagation && selectedPlant.propagation.length > 0 ? (
                <ul>
                  {selectedPlant.propagation.map((method, idx) => (
                    <li key={idx} className="propagation-method">
                      {method}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No propagation methods available.</p>
              )}
            </div>
                </>
              ) : (
                <p>No care guide available for this plant.</p>
              )}

            </div>
            
            {/* Hardiness Map Section */}
<div className="hardiness-map-section" style={{ marginTop: '40px' }}>
  <h3 style={{color:'#a4c96f'}}>Propogation Distribution Map:</h3>
  {selectedPlant && selectedPlant.id ? (
                <div className='iframe-container'  style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <iframe 
        frameBorder="0"
        scrolling="yes"
        seamless="seamless"
        width="1000"
        height="550"
        style={{ margin: 'auto' }}
        src={`https://perenual.com/api/hardiness-map?species_id=${selectedPlant.id}&size=og&key=sk-dRMV67fff37f267189837`}
        title="Hardiness Map"
      ></iframe>
    </div>
  ) : (
    <p>Hardiness map not available.</p>
  )}
</div>

            
          </div>
          
        </div>
        
      )}
    </>
  );
}

export default Prop;
