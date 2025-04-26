import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Prop from "./prop";
import About from "./About";
import Home from "./Home";
import ContactForm from "./Contact";

// Wrap everything inside a component that can use `useLocation`
function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname.toLowerCase() === "/prop";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/prop" element={<Prop />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<ContactForm/>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
