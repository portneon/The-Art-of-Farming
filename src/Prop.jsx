import React, { useEffect, useState, useRef } from "react";
import "./Props.css";

function Prop() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [Plant, setData] = useState([]);
  const [careGuide, setCareGuide] = useState(null);
  const [ans, setans] = useState(true)
  const suggestionRef = useRef();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/portneon/plantsapi/refs/heads/main/plants.json"
    )
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);

  const fetchCareGuide = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCareGuide(data))
      .catch((error) => {
        console.error("Error fetching care guide:", error);
        setCareGuide(null);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setans(!ans)

    if (value.length > 0) {
      const filtered = Plant.filter((item) =>
        item.common_name?.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handlePlantSelect = (item) => {
    setSelectedPlant(item);
    setQuery(item.common_name);
    setSuggestions([]);
    if (item.care_guides) fetchCareGuide(item.care_guides);
  };

  return (
    <>
      
      {/* Search Navigation */}
      <div className="search-nav">
        <div className="search-container" ref={suggestionRef}>
          <h1 className="plants-title">{selectedPlant?.common_name}</h1>

          <input
            className="input-field"
            placeholder="    Type The Name Of The Plant ..."
            value={query}
            onChange={handleInputChange}
          />

          
        </div>
        <div className="suggeston-container-main">
        {suggestions.length > 0 && (
            <ul className="suggestion-list">
              {suggestions.map((item) => (
                <li key={item.id} onClick={() => handlePlantSelect(item)} className="suggestion-list-items">
                  {item.common_name}
                </li>
              ))}
            </ul>
          )}</div>
      </div>
      {!selectedPlant && (
        <div className="no-selection-message">
          
          <div className="no-sec">
            
            <h2>Please search for a plant to see its details </h2></div>
    
  </div>
)}

      {selectedPlant && (
        <div className="content">
          <div className="title-head">
            {/* yaha se last tak detail section hai in three divs */}
            <div className="inner-container"> 
              {/* ye title ka container hai */}
              <div className="discription-section">


                <div className="head-title">
                  <h2 style={{color:'#D3F1DF'}}>Scientific Name : {selectedPlant.scientific_name}</h2>
                  <h3>Genus: {selectedPlant.genus}</h3>
                  <h3>Cultivar: {selectedPlant.cultivar}</h3>
                </div>


                <div className="description-sectionin">
                  <h3>Description:</h3>
                  <p>{selectedPlant.description}</p>
                </div>

              </div>

              {/* ye photo ka container hai */}
              <div className="photo-head">
                <img
                  src={selectedPlant.default_image?.original_url}
                  alt={selectedPlant.common_name}
                  height="500px"
                  width="400px"
                />
              </div>
            </div>
            {/* yaha par inner container khata ho raha hai */}

            <div className="species-care">
              {careGuide?.data?.[0]?.section?.length > 0 ? (
                <div>
                  <h4>Care Guide:</h4>
                  <ul>
                    {careGuide.data[0].section.map((item) => (
                      <li key={item.id}>
                        <strong>
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                          :
                        </strong>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                  <div>
                    <p>No care guide available. Sorry !</p>
                    </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Prop;
