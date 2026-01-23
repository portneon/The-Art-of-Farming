import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./Footer";
import Prop from "./Plants";
import About from "./About";
import Home from "./Home";
import Register from "./Register";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import PlantDetail from "./components/PlantDetail";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Plants" element={<Prop />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/plants/:id" element={<PlantDetail />} />

      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
