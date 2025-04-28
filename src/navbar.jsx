import React from "react";
import { NavLink } from "react-router-dom";

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Raleway:wght@500&display=swap');

  .logo-font {
    font-family: 'Lobster', cursive;
  }

  .nav-font {
    font-family: 'Raleway', sans-serif;
  }
`;

function Navbar() {
  return (
    <div style={containerStyle}>
      <style>{fontStyles}</style>

      <nav style={styles}>
        <div style={{ display: "flex", alignItems: "center", color: "green" }}>
          <h1 className="logo-font" style={{ fontSize: "32px", margin: 0 }}>
            Art of farming
          </h1>
        </div>

        <ul style={listStyle}>
          {["Home", "About", "contact", "Plants", "login"].map((route) => (
            <li key={route}>
              <NavLink
                to={`/${route}`}
                style={({ isActive }) => ({
                  ...linkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                })}
                className="nav-font"
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// NEW: Wrapper div style to center nav
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

// Navbar styling
const styles = {
  height: "70px",
  width: "94vw",
  color: "#f5f5f5",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.2)",
  borderRadius: "15px",
  marginTop: "20px",
  padding: "0px 30px",
};

const listStyle = {
  listStyle: "none",
  display: "flex",
  justifyContent: "flex-end",
  gap: "40px",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "#006241",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "19px",
  transition: "color 0.3s ease",
};

const activeLinkStyle = {
  color: "#004d2c",
  borderBottom: "2px solid #004d2c",
};

export default Navbar;
