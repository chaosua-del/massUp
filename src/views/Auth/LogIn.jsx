import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import withMount from "../../hoc/withMount";
import { connect } from "react-redux";
import authOperations from "../../redux/auth/authOperations";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.props.onLogin({ ...this.state });

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Е-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Увійти
        </Button>
      </Form>
    );
  }
}

export default connect(null, { onLogin: authOperations.logIn })(
  withMount(LogIn)
);
