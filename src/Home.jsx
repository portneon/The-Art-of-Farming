import React, { useState } from "react";
import "./App.css";
import Intersting from "./intersting";

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
  const [showDetail, setShowDetail] = useState(false);
  const [detailURL, setDataURL] = useState(null);

  // Array of images and their associated URLs
  const images = [
    {
      url: "https://perenual.com/storage/species_image/2012_colchicum_waterlily/regular/2560px-Colchicum_27Waterlily27_03.jpg",
      detailsURL: "https://perenual.com/api/v2/species/details/2012?key=sk-dRMV67fff37f267189837",
      text: 'Blooming Tranquility',
    },
    {
      url: "https://images.pexels.com/photos/29596320/pexels-photo-29596320/free-photo-of-close-up-of-venus-flytrap-plants-in-dark-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      detailsURL: "https://perenual.com/api/v2/species/details/2498?key=sk-dRMV67fff37f267189837",
      text: "Nature's Living Trap",
    },
    {
      url: "https://perenual.com/storage/species_image/174_albizia_julibrissin_summer_chocolate/og/4846456933_a3fd8efe99_b.jpg",
      detailsURL: "https://perenual.com/api/v2/species/details/172?key=sk-dRMV67fff37f267189837",
      text: "Graceful Green Canopy",
    },
    {
      url: "https://perenual.com/storage/species_image/2529_dracaena_fragrans_deremensis_group_lemon_lime/og/stripe-leaves.jpg",
      detailsURL: "https://perenual.com/api/v2/species/details/2529?key=sk-dRMV67fff37f267189837",
      text: "Natural Patterned Beauty",
    },
    {
      url: "https://live-production.wcms.abc-cdn.net.au/7704eedf4e9fa8fa8d172068be249d90?impolicy=wcms_crop_resize&cropH=2000&cropW=3000&xPos=0&yPos=16&width=862&height=575",
      detailsURL: "https://perenual.com/api/v2/species/details/771?key=sk-dRMV67fff37f267189837",
      text: "Nature’s Dark Perfume",
    },
    {
      url: "https://perenual.com/storage/species_image/2035_conradina_verticillata/og/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2ZsNTE2Njc3OTUyMDYtaW1hZ2UuanBn.jpg",
      detailsURL: "https://perenual.com/api/v2/species/details/2035?key=sk-dRMV67fff37f267189837",
      text: "Fragrant Mountain Herb",
    }
  ];

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
            {showDetail ? (
              <Intersting url={detailURL} showDetailHandler={setShowDetail} />
            ) : (
              <div className="grid-container">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="grid-item"
                    style={{
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      setShowDetail(true);
                      setDataURL(image.detailsURL); 
                    }}
                  >
                    {image.text && <h1 style={{color:'#143D60'}}><strong>{image.text}</strong></h1>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
