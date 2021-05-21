import React from "react";
import routes from "../../routes";
import Slider from "../../components/Slider/Slider";
import RoomList from "../../components/Room/RoomList";
import { Row, Col } from "react-bootstrap";

export default function CoachProfile({ isMyProfile, id }) {
  return (
    <Row className="mt-5 ">
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-5">Курси</h3>
        <Slider
          classN="courses"
          createRoute={routes.createCourse}
          isMyProfile={isMyProfile}
          id={id}
        ></Slider>
      </Col>
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-5">Групи</h3>
        <RoomList userId={id} />
      </Col>
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-3">Відгуки</h3>
      </Col>
    </Row>
  );
}
