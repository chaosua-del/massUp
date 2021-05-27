import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from "../../routes";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg="4">
            <Link to={routes.showRooms}>
              <Button>Show Rooms</Button>
            </Link>
          </Col>
          <Col lg="4">
            <Link to={routes.showCoaches}>
              <Button>Show Coaches</Button>
            </Link>
          </Col>
          <Col lg="4"></Col>
        </Row>
      </Container>
    );
  }
}
