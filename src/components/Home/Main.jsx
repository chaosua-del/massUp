import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import routes from "../../routes";

export default function Main() {
  return (
    <div className={styles.main}>
      <Container className="pt-5 pb-5">
        <h4 className="text-center mb-5">
          Розпочніть тренування з цього моменту!
        </h4>
        <Row>
          <Col>
            <div className={styles.mainCard}>
              <img
                src="https://fitseven.ru/wp-content/uploads/personal-trainer-nl.jpg"
                alt="coach"
              />
            </div>
            <Link to={routes.showCoaches}>
              <Button variant="dark" className="w-100">
                Знайти свого тренера
              </Button>
            </Link>
          </Col>
          <Col>
            <div className={styles.mainCard}>
              <img
                src="https://lastday.club/wp-content/uploads/2019/05/Personalnyj-trener-po-fitnesu-zachem-on-nuzhen-i-kak-najti-pravilnogo-nastavnika-Last-Day-Club.jpg"
                alt="participants"
              />
            </div>
            <Link to={routes.showRooms}>
              <Button variant="dark" className="w-100">
                Почати тренування
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
