import React from "react";
import routes from "../../routes";
import Slider from "../../components/Slider/Slider";
import { Row, Col } from "react-bootstrap";

export default function CoachProfile({ isMyProfile }) {
  return (
    <Row className="mt-5 ">
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-4">My courses</h3>
        <Slider
          classN="courses"
          createRoute={routes.createCourse}
          isMyProfile={isMyProfile}
        ></Slider>
      </Col>
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-3">My groups</h3>
      </Col>
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-3">Feedback</h3>
      </Col>
    </Row>
  );
}
