import React from "react";
import { Card } from "react-bootstrap";
import Rating from "react-rating";
import emptyStar from "../../images/star-empty.svg";
import fullStar from "../../images/star-full.svg";
import routes from "../../routes";
import { Link } from "react-router-dom";

export default function FeedbackList({ data }) {
  const styles = {
    star: {
      width: "25px",
      height: "25px",
    },
  };
  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data.map((feedback) => {
            return (
              <Card key={feedback._id} className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                  <Link to={`${routes.profile}/${feedback.userId}`}>
                    {feedback.userName}
                  </Link>
                  <span>
                    Коли: {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </Card.Header>
                <div className="pl-3 mt-2">
                  <Rating
                    readonly
                    initialRating={feedback.rating}
                    emptySymbol={
                      <img
                        src={emptyStar}
                        className="icon"
                        alt="star"
                        style={styles.star}
                      />
                    }
                    fullSymbol={
                      <img
                        src={fullStar}
                        className="icon"
                        alt="star"
                        style={styles.star}
                      />
                    }
                  />
                </div>
                <Card.Body>
                  <Card.Text>{feedback.text}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5">Відгуків немає</div>
      )}
    </div>
  );
}
