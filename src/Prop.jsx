import React, { useEffect, useState } from "react";
// mujhe pahle ek array banan hai jisme mai [1...30] tak ke number store karunga aur phir 30 baar fetch karunga and i will store answer in a array.
// then i will implement the search function based on common name
import './Props.css'

function Prop() {
  const [Plant, setdata] = useState([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/portneon/plantsapi/refs/heads/main/plants.json').then(res=>res.json()).then((res)=>setdata(res.data))
  }, []);

  return (
    <>
      {Plant.map((ele) => {
        return <>
          <div className="main-container">
        <div className="header"></div>
        <div className="discription">
          <div className="main-title">{ele.common_name}</div>
              <div className="main-photo"><img src='{ele.default_image.medium_url}' alt = 'imageurl'></img></div>
        </div>
        <div>
    
        </div>
      </div>
          </>
      })}
      
    </>
  );
}

export default Prop;
