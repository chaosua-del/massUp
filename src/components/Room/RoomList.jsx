import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import fetchAllRoomsById from "../../utils/fetchAllRoomsById";
import { Link } from "react-router-dom";
import routes from "../../routes";

export default class RoomList extends Component {
  state = {
    rooms: [],
  };

  componentDidMount() {
    fetchAllRoomsById(this.props.userId)
      .then((response) => {
        this.setState({
          rooms: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { rooms } = this.state;
    return (
      <Row className="d-flex justify-content-center">
        <Col xs={12} lg={8}>
          <ListGroup className="w-100">
            {rooms.map((room) => (
              <ListGroup.Item
                key={room._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <span>{room.roomName}</span>
                  <span className="ml-2">
                    {room.users.length}/{room.maxUsers}
                  </span>
                </div>
                <Link to={`${routes.room}/${room._id}`}>
                  <Button>Перейти</Button>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

RoomList.propTypes = {
  userId: PropTypes.string,
};
