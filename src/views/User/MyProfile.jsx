import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import config from "../../config";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import defaultAvatar from "../../images/default-avatar.png";
import { Link } from "react-router-dom";
import CoachProfile from "./CoachProfile";
import UserProfile from "./UserProfile";
import routes from "../../routes";

class MyProfile extends Component {
  state = {
    showModal: false,
  };

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
                <Link to={routes.editProfile + "/" + user.id}>
                  <Button variant="secondary">Редагувати профіль</Button>
                </Link>
              </Card.Body>
            </Card>
            {user.role === "coach" && (
              <div className="mt-5 d-flex justify-content-center">
                <Link to={routes.createCourse}>
                  <Button variant="info" className="mr-2">
                    Створити курс
                  </Button>
                </Link>
                <Link to={routes.createRoom + "/" + user.id}>
                  <Button variant="info">Створити кімнату</Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>

        {user.role === "coach" ? (
          <CoachProfile isMyProfile={true} id={user.id} />
        ) : (
          <UserProfile />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(MyProfile);
