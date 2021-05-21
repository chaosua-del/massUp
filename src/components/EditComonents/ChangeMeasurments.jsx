import React from "react";
import { Col, Form, Button } from "react-bootstrap";

export default function ChangeMeasurments({
  height,
  weight,
  handleInputChange,
  handleFormSubmit,
}) {
  return (
    <Form
      className="pt-5"
      onSubmit={(event) =>
        handleFormSubmit(event, "measurments", { height, weight })
      }
    >
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Вага (кг)</Form.Label>
          <Form.Control
            required
            type="number"
            min="40"
            max="140"
            placeholder="Введіть вашу вагу"
            name="weight"
            value={weight}
            onChange={handleInputChange}
            autoComplete="weight"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Зріст (см)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Введіть ваш зріст"
            min="140"
            max="210"
            name="height"
            autoComplete="height"
            value={height}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form.Row>

      <Button type="submit">Зберегти зміни</Button>
    </Form>
  );
}
