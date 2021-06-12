import React from "react";
import man1 from "../../images/man1.jpg";
import people1 from "../../images/people1.jpg";
import people2 from "../../images/people2.jpg";
import styles from "./Home.module.css";
import { Container } from "react-bootstrap";

export default function Hero() {
  return (
    <Container className="mb-5">
      <div className="d-flex mx-auto justify-content-center mt-5 pt-4 position-relative">
        <div className={styles.card}>
          <img src={people1} alt="people" />
        </div>
        <div className={styles.card}>
          <img src={man1} alt="coach" />
          <span className={styles.cardText}>MassUp</span>
        </div>
        <div className={styles.card}>
          <img src={people2} alt="people" />
        </div>
        <p className={styles.heroText}>
          Веб-додаток, який об'єднує людей по всій Україні.
        </p>
      </div>
      <div className={styles.heroBanner}>Stay stronger - together</div>
    </Container>
  );
}
