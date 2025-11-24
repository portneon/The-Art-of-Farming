import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./Footer";
import Prop from "./Plants";
import About from "./About";
import Home from "./Home";
import Register from "./Register";
// import ContactForm from "./Contact";
import LoginPage from "./Login"; 
import './App.css';

function App() {
  const location = useLocation();
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/Plants" element={<Prop />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/contact" element={<ContactForm />} /> */}
        <Route path="/Login" element={<LoginPage />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
