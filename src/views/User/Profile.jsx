import React, { Component } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import styles from "./Profile.module.css";
import defaultAvatar from "../../images/default-avatar.png";
import { Link } from "react-router-dom";
import CoachProfile from "./CoachProfile";
import UserProfile from "./UserProfile";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import routes from "../../routes";

class Profile extends Component {
  state = {
    showModal: false,
    user: null,
    isMyProfile: false,
  };

  componentDidMount() {
    axios
      .get(`${config.api_url}/users/find/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          user: response.data.user,
        });
        if (this.props.id === response.data.user._id) {
          this.setState({
            isMyProfile: true,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState({ isMyProfile: true });
    }
  }

  render() {
    const { user, isMyProfile } = this.state;

    return (
      <Container className="pt-4">
        {user ? (
          <div>
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
                    <Card.Subtitle className="mb-4 mt-2 text-muted">
                      {user.role === "coach" ? "Тренер" : "Учасник"}
                    </Card.Subtitle>
                    <Card.Text>
                      {user.info ? user.info : "Немає інформації"}
                    </Card.Text>
                    {isMyProfile && (
                      <Link to={routes.editProfile + "/" + user.id}>
                        <Button variant="secondary">Редагувати профіль</Button>
                      </Link>
                    )}
                  </Card.Body>
                </Card>
                {user.role === "coach" && isMyProfile && (
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
              <CoachProfile id={user._id} isMyProfile={isMyProfile} />
            ) : (
              <UserProfile id={user._id} isMyProfile={isMyProfile} />
            )}
          </div>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: authSelectors.getId(state),
  };
};

export default connect(mapStateToProps)(withRouter(Profile));
