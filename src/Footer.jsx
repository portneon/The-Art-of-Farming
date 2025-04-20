import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: "#1f1f1f",
      color: "#f5f5f5",
      padding: "40px 20px 20px",
      marginTop: "50px",
      fontFamily: "'Segoe UI', sans-serif",
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
      color: "#88e66f",
    },
    h4: {
      marginBottom: "10px",
      color: "#88e66f",
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
          <h3 style={styles.h3}>The Art of Farming</h3>
          <p>Empowering sustainable farming through data & technology.</p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Quick Links</h4>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <a style={styles.link} href="#plants">Plants</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#soil">Soil Types</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#climate">Climate</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#methods">Farming Methods</a>
            </li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.h4}>Connect</h4>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <a style={styles.link} href="mailto:info@artoffarming.com">Email Us</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#">Instagram</a>
            </li>
            <li style={styles.li}>
              <a style={styles.link} href="#">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>© {currentYear} The Art of Farming. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
