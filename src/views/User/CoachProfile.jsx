import React from "react";
import routes from "../../routes";
import Slider from "../../components/Slider/Slider";
import RoomList from "../../components/Room/RoomList";
import { Row, Col } from "react-bootstrap";
import FeedbackList from "../../components/Feedback/FeedbackList";

export default function CoachProfile({ isMyProfile, id }) {
  return (
    <Row className="mt-5">
      <Col xs={12} className="mb-4">
        <h3 className="text-center mt-2 mb-5">Курси</h3>
        <Slider
          classN="courses"
          createRoute={routes.createCourse}
          isMyProfile={isMyProfile}
          id={id}
        ></Slider>
      </Col>
      <Col xs={12} className="mb-5">
        <h3 className="text-center mt-2 mb-4">Кімнати</h3>
        <RoomList userId={id} isMyProfile={isMyProfile} />
      </Col>
      <Col xs={12} lg={8} className="mb-4 mx-auto">
        <h3 className="text-center mt-2 mb-4">Відгуки</h3>
        <FeedbackList />
      </Col>
    </Row>
  );
}
