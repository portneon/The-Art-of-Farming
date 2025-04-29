import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import Prop from "./Plants";
import About from "./About";
import Home from "./Home";
import ContactForm from "./Contact";
import LoginPage from "./Login"; 

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.toLowerCase() === "/plants";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/Plants" element={<Prop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/Login" element={<LoginPage />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
