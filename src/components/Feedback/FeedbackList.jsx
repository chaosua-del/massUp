import React from "react";
import { Card } from "react-bootstrap";
import Rating from "react-rating";
import emptyStar from "../../images/star-empty.svg";
import fullStar from "../../images/star-full.svg";

export default function FeedbackList({ feedbacks }) {
  const styles = {
    star: {
      width: "25px",
      height: "25px",
    },
  };
  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <span>Діма каже:</span>
          <span>Коли: 29.10.2021</span>
        </Card.Header>
        <Rating
          emptySymbol={
            <img src={emptyStar} className="icon" style={styles.star} />
          }
          fullSymbol={
            <img src={fullStar} className="icon" style={styles.star} />
          }
        />
        <Card.Body>
          <Card.Text>Тренер харош!</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
