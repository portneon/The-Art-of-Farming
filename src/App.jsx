import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./Footer";
import Prop from "./Plants";
import About from "./About";
import Home from "./Home";
import Register from "./Register";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import GardenDetailPage from "./GardenDetailPage";
import MyPlantDetail from "./MyPlantDetail";
import PlantDetail from "./components/PlantDetail";
import ScrollToTop from "./components/ScrollToTop";

// Protected route wrapper that redirects to dashboard if logged in
const HomeOrDashboard = () => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeOrDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Plants" element={<Prop />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/garden/:gardenId" element={<GardenDetailPage />} />
        <Route path="/my-plant/:plantId" element={<MyPlantDetail />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/plants/:id" element={<PlantDetail />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
