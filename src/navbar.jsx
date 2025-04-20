import React from "react";

function Navbar() {
  return (
    <>
      <div>
        <nav style={styles}>
          <div
            style={{ display: "flex", alignItems: "center", color: "green" }}
          >
            <h1 style={{ alignContent: "center" }}>art of farming</h1>
          </div>

          <ul style={listStyle}>
            <li>
              <a style={linkStyle} href="#">
                About
              </a>
            </li>
            <li>
              <a style={linkStyle} href="#">
                Services
              </a>
            </li>
            <li>
              <a style={linkStyle} href="#">
                Contact
              </a>
            </li>
            <li>
              <a style={linkStyle} href="#">
                Blog
              </a>
            </li>
            <li>
              <a style={linkStyle} href="#">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

const styles = {
  height: "70px",
  width: "98vw",
  color: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "#1f1f1f",
  borderRadius: "15px",
  marginTop: '25px',
  margin:'10px',
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
  color: "#f5f5f5",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Navbar;
