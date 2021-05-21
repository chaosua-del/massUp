import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ChangePassword({
  currentPassword,
  repeatPassword,
  newPassword,
  handleInputChange,
  handleFormSubmit,
}) {
  return (
    <Form
      className="pt-5"
      onSubmit={(event) => {
        if (repeatPassword === newPassword) {
          handleFormSubmit(event, "password", {
            currentPassword,
            repeatPassword,
            newPassword,
          });
        } else {
          event.preventDefault();
          console.log("Password doesn't match");
        }
      }}
    >
      <Form.Group controlId="formPassword">
        <Form.Label>Поточний пароль</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Поточний пароль"
          name="currentPassword"
          value={currentPassword}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formRepeatPassword">
        <Form.Label>Новий пароль</Form.Label>
        <Form.Control
          required
          type="password"
          name="newPassword"
          placeholder="Новий пароль"
          value={newPassword}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formRepeatPassword">
        <Form.Label>Повторити новий пароль</Form.Label>
        <Form.Control
          required
          type="password"
          name="repeatPassword"
          placeholder="Повторити пароль"
          value={repeatPassword}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button type="submit">Зберегти зміни</Button>
    </Form>
  );
}
