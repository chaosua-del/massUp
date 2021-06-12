import Rating from "react-rating";
import emptyStar from "../../images/star-empty.svg";
import fullStar from "../../images/star-full.svg";
import { Modal, Form, Button, Alert } from "react-bootstrap";

export default function CreateFeedback({
  show,
  onHide,
  onInputChange,
  onRatingChange,
  onFormSubmit,
  feedback,
  rating,
  submitError,
}) {
  const styles = {
    star: {
      width: "25px",
      height: "25px",
    },
  };

  console.log(show);

  return (
    <Modal
      show={show}
      onHide={onHide}
      // size="lg"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Залишити відгук
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-1 mb-3">
          <Rating
            onChange={onRatingChange}
            initialRating={rating}
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
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              as="textarea"
              rows={3}
              name="feedback"
              onChange={onInputChange}
              value={feedback}
            />
          </Form.Group>

          <Button type="submit">Зберегти</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {submitError && <Alert variant="danger">{submitError}</Alert>}
      </Modal.Footer>
    </Modal>
  );
}
