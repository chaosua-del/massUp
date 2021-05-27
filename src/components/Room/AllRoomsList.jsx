import React from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";

export default function AllRoomsList({ rooms }) {
  return (
    <ListGroup>
      {rooms.map((room) => (
        <ListGroup.Item
          key={room._id}
          className="d-flex align-items-center justify-content-between"
        >
          <div>
            <span className="mr-2">
              {room.roomName}#{room._id}
            </span>
            <span>
              ({room.users.length}/{room.maxUsers})
            </span>
          </div>
          <Button>
            <Link to={routes.room + "/" + room._id}>Показати кімнату</Link>
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
