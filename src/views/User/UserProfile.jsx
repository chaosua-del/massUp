import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RoomList from "../../components/Room/RoomList";

export default function UserProfile({ id }) {
  return (
    <Container>
      <Row className="mt-5 ">
        <Col xs={12} className="mb-4">
          <h3 className="text-center mt-2 mb-5">Кімнати</h3>
          <RoomList userId={id}></RoomList>
        </Col>
        <Col xs={12} className="mb-4">
          <h3 className="text-center mt-2 mb-3">Відгуки</h3>
        </Col>
      </Row>
    </Container>
  );
}
