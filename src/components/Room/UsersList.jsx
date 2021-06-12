import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import config from "../../config";
import defaultAvatar from "../../images/default-avatar.png";
import routes from "../../routes";
import styles from "./Room.module.css";
import { Link } from "react-router-dom";

export default function UsersList({ data, onDelete, isMyProfile }) {
  return (
    <ListGroup>
      {data.map((element) => {
        return (
          <ListGroup.Item
            key={element.id}
            className="d-flex align-items-center justify-content-between"
          >
            <Link
              to={routes.profile + "/" + element.id}
              className="d-flex align-items-center"
            >
              <div className={styles.avatar}>
                <img
                  src={
                    element.avatar
                      ? `${config.url}/uploads/${element.avatar}`
                      : defaultAvatar
                  }
                  alt="avatar"
                />
              </div>
              <h5>{element.firstname}</h5>
            </Link>
            {isMyProfile && (
              <Button onClick={() => onDelete(element.id)} variant="dark">
                Вигнати учасника
              </Button>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
