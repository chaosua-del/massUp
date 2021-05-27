import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import fetchAllRoomsById from "../../utils/fetchAllRoomsById";
import deleteRoomById from "../../utils/deleteRoomById";
import { Link } from "react-router-dom";
import routes from "../../routes";

export default class RoomList extends Component {
  state = {
    rooms: [],
  };

  handleDeleteRoom = (id) => {
    deleteRoomById(id).catch((err) => console.log(err));
    this.setState((prevState) => {
      return {
        showModal: false,
        rooms: prevState.rooms.filter((element) => element._id !== id),
      };
    });
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
    const { isMyProfile } = this.props;
    const { rooms } = this.state;
    return (
      <Row className="d-flex justify-content-center">
        <Col xs={12} lg={8}>
          {rooms.length > 0 ? (
            <ListGroup className="w-100">
              {rooms.map((room) => (
                <ListGroup.Item
                  key={room._id}
                  className="d-flex justify-content-between align-items-center flex-column flex-md-row"
                >
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <span>{room.roomName}</span>
                    <span className="ml-2">
                      {room.users.length}/{room.maxUsers}
                    </span>
                  </div>
                  <div>
                    <Link to={`${routes.room}/${room._id}`}>
                      <Button>Перейти</Button>
                    </Link>
                    {isMyProfile && room.users.length < 1 && (
                      <Button
                        className="ml-2"
                        variant="danger"
                        onClick={() => this.handleDeleteRoom(room._id)}
                      >
                        Видалити
                      </Button>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div>
              <div className="my-4 text-center">Немає кімнат</div>
              {isMyProfile && (
                <div className="d-flex justify-content-center">
                  <Button>
                    <Link to={routes.createRoom + "/" + this.props.userId}>
                      Створити
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

RoomList.propTypes = {
  userId: PropTypes.string,
};
