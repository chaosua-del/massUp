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
    passwordMatch: true,
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { firstname, age, email, password, role, gender } = this.state;

    if (this.state.password === this.state.repeatPassword) {
      this.props.onRegister({ firstname, age, email, password, role, gender });
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
            <Form.Label>First name</Form.Label>
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
            <Form.Label>Age</Form.Label>
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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            autoComplete="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formRepeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="repeatPassword"
            placeholder=" Repeat Password"
            value={this.state.repeatPassword}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group onChange={this.handleInputChange} id="form-role">
          <Form.Label>Role:</Form.Label>

          <Form.Check
            type="radio"
            label="Coach"
            name="role"
            id="coach-radio"
            value="coach"
          />
          <Form.Check
            type="radio"
            label="Participant"
            name="role"
            id="participant-radio"
            value="participant"
          />
        </Form.Group>

        <Form.Group onChange={this.handleInputChange} id="form-gender">
          <Form.Label>Gender:</Form.Label>

          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            id="male-radio"
            value="male"
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            id="female-radio"
            value="female"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default connect(null, { onRegister: authOperations.register })(
  withAuth(Register)
);
