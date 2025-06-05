import React, { useEffect, useState, useRef } from "react";
import "./Props.css";

function Prop() {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [careGuide, setCareGuide] = useState(null);
  const suggestionRef = useRef();

  // Fetch all plants
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/portneon/plantsapi/refs/heads/main/plants.json")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setPlants(res.data);
        } else {
          console.error("No data found in response");
        }
      })
      .catch((err) => console.error("Failed to fetch plants:", err));
  }, []);

  // Fetch care guide
  const fetchCareGuide = (url) => {
    if (!url) {
      setCareGuide(null);
      return;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Care guide data:", data); // Debug
        setCareGuide(data);
      })
      .catch((err) => {
        console.error("Failed to fetch care guide:", err);
        setCareGuide(null);
      });
  };

  // Close suggestion list on click outside or escape
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

  // Handle input changes
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

  // On plant select
  const handlePlantSelect = (plant) => {
    if (!plant) return;
    setSelectedPlant(plant);
    setQuery(plant.common_name || "");
    setSuggestions([]);
    if (plant.care_guides) {
      fetchCareGuide(plant.care_guides);
    } else {
      setCareGuide(null);
    }
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
                  >
                    {plant.common_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* No plant selected */}
      {!selectedPlant && (
        <div className="no-selection-message">
          <h2>Please search and select a plant to see details!</h2>
        </div>
      )}

      {/* Plant selected */}
      {selectedPlant && (
        <div className="content">
          <div className="title-head">
            <div className="inner-container">
              {/* Left - Info */}
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

              {/* Right - Image */}
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
              <h4>Care Guide:</h4>
              {careGuide?.data?.[0]?.section?.length > 0 ? (
                <ul>
                  {careGuide.data[0].section.map((section, idx) => (
                    <li key={idx}>
                      <strong>
                        {section.type.charAt(0).toUpperCase() + section.type.slice(1)}:
                      </strong>{" "}
                      {section.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No care guide available for this plant.</p>
              )}
            </div>

            {/* Propagation Section */}
            <div className="propagation-section">
              <h4>Propagation Methods:</h4>
              {selectedPlant.propagation?.length > 0 ? (
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

            {/* Hardiness Map */}
            <div className="hardiness-map-section" style={{ marginTop: "40px" }}>
              <h3 style={{ color: "#a4c96f" }}>Propagation Distribution Map:</h3>
              {selectedPlant?.id ? (
                <div
                  className="iframe-container"
                  style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
                >
                  <iframe
                    frameBorder="0"
                    scrolling="yes"
                    seamless="seamless"
                    width="1000"
                    height="550"
                    src={`https://perenual.com/api/hardiness-map?species_id=${selectedPlant.id}&size=og&key=sk-dRMV67fff37f267189837`}
                    title="Hardiness Map"
                  ></iframe>
                </div>
              ) : (
                <p>Hardiness map not available.</p>
              )}
            </div>

            {/* Debug Care Guide JSON */}
            {/* <pre style={{ color: "#fff", background: "#333", padding: "10px" }}>
              {JSON.stringify(careGuide, null, 2)}
            </pre> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Prop;
