import React, { useState, useEffect } from "react";
import "./props.css";
import Footer from "./Footer";

function Prop({ url }) {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Fetch the API and store only `data` array
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlants(data.data));
  }, [url]);

  // Text input change handler
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Manual search button
  const handleClick = () => {
    const match = plants.find((plant) =>
      plant.common_name?.toLowerCase().includes(text.toLowerCase())
    );
    if (match) {
      setSelectedPlant(match);
      setSearch(text.toLowerCase());
    }
    setText("");
  };

  // Handle dropdown selection
  const handleDropdownClick = (plant) => {
    setSelectedPlant(plant);
    setSearch(plant.common_name.toLowerCase());
    setText("");
  };

  // Filter based on input
  const filteredPlants = plants.filter((plant) =>
    plant.common_name?.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <div className="main-conatiner">
        <div className="header">
                  <h1>{plants.common_name}</h1>
          <input
            type="text"
            placeholder="Type your plant name..."
            value={text}
            onChange={handleChange}
          />
          {text && (
            <div className="dropdown">
              {filteredPlants.length > 0 ? (
                filteredPlants.slice(0, 5).map((plant) => (
                  <div
                    key={plant.id}
                    className="dropdown-item"
                    onClick={() => handleDropdownClick(plant)}
                  >
                    {plant.common_name}
                  </div>
                ))
              ) : (
                <div className="dropdown-item">No results found</div>
              )}
            </div>
          )}
          <button onClick={handleClick}>Search</button>
        </div>

        {/* Plant Details */}
        {selectedPlant && (
          <div className="plant-details">
            <h2>{selectedPlant.common_name}</h2>
            <p>
              <strong>Scientific Name:</strong>{" "}
              {selectedPlant.scientific_name?.join(", ")}
            </p>

            <div className="section-wrapper">
              {selectedPlant.section?.map((sec) => (
                <div key={sec.id} className="plant-section">
                  <h4>{sec.type.toUpperCase()}</h4>
                  <p>{sec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Prop;
