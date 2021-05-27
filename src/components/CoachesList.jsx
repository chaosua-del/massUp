import React from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
import defaultAvatar from "../images/default-avatar.png";
import { Card, Button, Col, Row } from "react-bootstrap";
import config from "../config";

export default function CoachesList({ coaches }) {
  const styles = {
    cardImage: {
      width: "18rem",
      height: "250px",
    },
  };

  return (
    <Row>
      {coaches.map((coach) => (
        <Col lg={4} sm={6} xs={12}>
          <Card key={coach._id} style={{ width: "18rem" }}>
            <div className="d-flex" style={styles.cardImage}>
              <Card.Img
                variant="top"
                src={
                  coach.avatar
                    ? config.url + "/uploads/" + coach.avatar
                    : defaultAvatar
                }
              />
            </div>
            <Card.Body>
              <Card.Title>{coach.firstname}</Card.Title>
              <Card.Text>Інформація</Card.Text>
              <Link to={routes.profile + "/" + coach._id}>
                <Button variant="primary">Показати тренера</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
