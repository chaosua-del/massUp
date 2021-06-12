import React from "react";
import logo from "../images/logo-white.png";
import { Container } from "react-bootstrap";

const styles = {
  footer: {
    backgroundColor: "#000000",
    textAlign: "center",
    color: "#FFFFFF",
    height: "75px",
  },
  logo: {
    width: "150px",
    height: "50px",
    display: "flex",
    alignItems: "center",
  },
};

export default function Footer() {
  return (
    <div style={styles.footer}>
      <Container className="d-flex justify-content-between align-items-center h-100">
        <div style={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <span>Made by Dmytro Yukhymenko</span>
      </Container>
    </div>
  );
}
