import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

import withAuth from "../../hoc/withAuth";
import authOperations from "../../redux/auth/authOperations";

class Register extends Component {
  state = {
    firstname: "",
    age: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "",
    gender: "",
    city: "Київ",
    country: "Україна",
    passwordMatch: true,
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { firstname, age, email, password, role, gender, country, city } =
      this.state;

    if (this.state.password === this.state.repeatPassword) {
      this.props.onRegister({
        firstname,
        age,
        email,
        password,
        role,
        gender,
        country,
        city,
      });
    } else {
      this.setState({
        passwordMatch: false,
      });
    }

    this.setState({
      email: "",
      password: "",
      firstname: "",
      age: "",
      repeatPassword: "",
      passwordMatch: true,
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Ім'я</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInputChange}
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
              value={this.state.age}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            autoComplete="email"
          />
          <Form.Text className="text-muted">
            Ми ніколи не повідомимо ваш e-mail нікому іншому.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formRepeatPassword">
          <Form.Label>Повторити пароль</Form.Label>
          <Form.Control
            type="password"
            name="repeatPassword"
            placeholder=" Repeat Password"
            value={this.state.repeatPassword}
            onChange={this.handleInputChange}
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
            value={this.state.value}
            onChange={this.handleInputChange}
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
        <div className="d-flex">
          <Form.Group
            onChange={this.handleInputChange}
            id="form-role"
            className="mr-5"
          >
            <Form.Label>Роль</Form.Label>

            <Form.Check
              type="radio"
              label="Тренер"
              name="role"
              id="coach-radio"
              value="coach"
            />
            <Form.Check
              type="radio"
              label="Користувач"
              name="role"
              id="participant-radio"
              value="participant"
            />
          </Form.Group>

          <Form.Group onChange={this.handleInputChange} id="form-gender">
            <Form.Label>Стать:</Form.Label>

            <Form.Check
              type="radio"
              label="Чоловіча"
              name="gender"
              id="male-radio"
              value="male"
            />
            <Form.Check
              type="radio"
              label="Жіноча"
              name="gender"
              id="female-radio"
              value="female"
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Зареєструватися
        </Button>
      </Form>
    );
  }
}

export default connect(null, { onRegister: authOperations.register })(
  withAuth(Register)
);
