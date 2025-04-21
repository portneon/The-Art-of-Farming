import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav style={styles}>
        <div style={{ display: "flex", alignItems: "center", color: "green" }}>
          <h1 style={{ alignContent: "center" }}>art of farming</h1>
        </div>

        <ul style={listStyle}>
          <li>
            <Link style={linkStyle} to= "/Home">Home</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/About">About</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/contact">Contact</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/blog">Blog</Link>
          </li>
          <li>
            <Link style={linkStyle} to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  height: "70px",
  width: "98vw",
  color: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.2)",
  borderRadius: "15px",
  marginTop: '25px',
  margin: '10px',
};

const listStyle = {
  listStyle: "none",
  display: "flex",
  justifyContent: "flex-end",
  gap: "60px",
  margin: 0,
  padding: 0,
  width: "80%",
  color: "#fff",
};

const linkStyle = {
  color: "#006241",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Navbar;
