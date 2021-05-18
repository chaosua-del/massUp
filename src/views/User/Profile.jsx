import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import styles from "./Profile.module.css";
import defaultAvatar from "../../images/default-avatar.png";
import { Link } from "react-router-dom";
import CoachProfile from "./CoachProfile";
import UserProfile from "./UserProfile";
import { withRouter } from "react-router";

class Profile extends Component {
  state = {
    showModal: false,
  };

  async componentDidMount() {
    await axios
      .get(`${config.api_url}/users/${this.props.match.params.id}`)
      .then((response) => {})
      .catch((error) => console.log(error));
  }

  render() {
    const { user } = this.props;
    console.log(config.api_url + "/uploads/" + user.avatar);
    return (
      <Container className="pt-4">
        <Row className="d-flex justify-content-center mt-5">
          <Col lg="4" className="d-flex justify-content-center mb-3">
            <div className={styles.userPhoto}>
              <img
                src={
                  user.avatar
                    ? config.url + "/uploads/" + user.avatar
                    : defaultAvatar
                }
                alt="user"
              />
            </div>
          </Col>
          <Col lg="4">
            <Card style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title>
                  {user.firstname + ", " + user.age}. (
                  {user.country + ", " + user.city})
                </Card.Title>
                <Card.Subtitle className="mb-4 mt-2 text-muted text-uppercase">
                  {user.role}
                </Card.Subtitle>
                <Card.Text>
                  {user.info ? user.info : "No information given"}
                </Card.Text>
                <Link>Edit Profile</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {user.role === "coach" ? <CoachProfile /> : <UserProfile />}
      </Container>
    );
  }
}

export default withRouter(Profile);
