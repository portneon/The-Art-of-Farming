import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: "#1f1f1f",
      color: "#f5f5f5",
      padding: "40px 20px 20px",
      marginTop: "50px",
      fontFamily: "'Segoe UI', sans-serif",
      backdropFilter: "blur(4px)",
    },
    footerContent: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "30px",
    },
    section: {
      flex: 1,
      minWidth: "200px",
    },
    h3: {
      marginBottom: "10px",
      color: "#a4c96f",
    },
    h4: {
      marginBottom: "10px",
      color: "#a4c96f",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    li: {
      marginBottom: "8px",
    },
    link: {
      color: "#ccc",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#fff",
    },
    bottom: {
      borderTop: "1px solid #333",
      marginTop: "20px",
      paddingTop: "15px",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#999",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.section}>
          <h3 style={styles.h3}>The Art of Plant</h3>
          <p>
            Explore nature's wonders and the art of plant propagation to foster
            growth and life.
          </p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Quick Links</h4>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <Link style={styles.link} to="/plants">
                Plants
              </Link>
            </li>
            <li style={styles.li}>
              <Link style={styles.link} to="/About">
                About
              </Link>
            </li>
            <li style={styles.li}>
              <Link style={styles.link} to="/Login">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Connect</h4>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <a style={styles.link} href="mailto:info@artoffarming.com">
                Email Us
              </a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#https://www.instagram.com/home">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>© {currentYear} The Art of Plant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
