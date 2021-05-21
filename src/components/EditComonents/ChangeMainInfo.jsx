import React from "react";
import { Form, Col, Button } from "react-bootstrap";

export default function ChangeInfo({
  handleInputChange,
  handleFormSubmit,
  firstname,
  age,
  email,
  country,
  city,
}) {
  return (
    <Form
      className="py-5"
      onSubmit={(event) =>
        handleFormSubmit(event, "main", {
          firstname,
          age,
          email,
          country,
          city,
        })
      }
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Ім'я</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={handleInputChange}
            autoComplete="firstname"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formAge">
          <Form.Label>Вік</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age"
            min="12"
            max="99"
            name="age"
            autoComplete="age"
            value={age}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          readOnly
          type="email"
          placeholder="Enter email"
          value={email}
          name="email"
          onChange={handleInputChange}
          autoComplete="email"
        />
      </Form.Group>

      <Form.Group controlId="countrySelect">
        <Form.Label>Виберіть Країну</Form.Label>
        <Form.Control as="select">
          <option defaultValue value="Україна">
            Україна
          </option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="citySelect">
        <Form.Label>Виберіть Місто</Form.Label>
        <Form.Control
          as="select"
          name="city"
          value={city}
          onChange={handleInputChange}
        >
          <option value="Київ">Київ</option>
          <option value="Харків">Харків</option>
          <option value="Одеса">Одеса</option>
          <option value="Дніпро">Дніпро</option>
          <option value="Запоріжжя">Запоріжжя</option>
          <option value="Львів">Львів</option>
          <option value="Кривий Ріг">Кривий Ріг</option>
          <option value="Миколаїв">Миколаїв</option>
          <option value="Маріуполь">Маріуполь</option>
          <option value="Вінниця">Вінниця</option>
          <option value="Херсон">Херсон</option>
          <option value="Полтава">Полтава</option>
          <option value="Чернігів">Чернігів</option>
          <option value="Черкаси">Черкаси</option>
          <option value="Хмельницький">Хмельницький</option>
          <option value="Чернівці">Чернівці</option>
          <option value="Житомир">Житомир</option>
          <option value="Суми">Суми</option>
          <option value="Рівне">Рівне</option>
          <option value="Івано-Франківськ">Івано-Франківськ</option>
          <option value="Кропивницький">Кропивницький</option>
          <option value="Тернопіль">Тернопіль</option>
          <option value="Луцьк">Луцьк</option>
          <option value="Ужгород">Ужгород</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Зберегти Зміни
      </Button>
    </Form>
  );
}
