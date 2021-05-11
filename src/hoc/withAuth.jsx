import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function withAuth(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <WrappedComponent {...this.props} />
            </Col>
          </Row>
        </Container>
      );
    }
  };
}

export default withAuth;
