import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
import routes from "../../routes";

export default function UserProfile({ id, joinedRoom }) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${config.api_url}/room/${joinedRoom}`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="pb-5">
      <h3 className="text-center mt-5 mb-2">Тренувальна кімната</h3>
      <Row className="mt-5 d-flex justify-content-center">
        {joinedRoom ? (
          <Col xs={12} className="mb-4">
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              <ListGroup>
                <ListGroup.Item className="d-flex align-items-center justify-content-center">
                  <b>{room.roomName}</b>
                  <span className="mx-4">
                    {room.users.length}/{room.maxUsers}
                  </span>
                  <Link to={routes.room + "/" + room._id}>
                    <Button>Перейти до кімнати</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center mr-3">
              Ви ще не долучились то кімнат
            </div>
            <Link to={routes.showRooms}>
              <Button>Пошук</Button>
            </Link>
          </div>
        )}

        {/* <Col xs={12} className="mb-4">
          <h3 className="text-center mt-2 mb-3">Статистика</h3>
        </Col> */}
      </Row>
    </Container>
  );
}
