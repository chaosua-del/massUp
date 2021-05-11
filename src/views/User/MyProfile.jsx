import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import defaultAvatar from "../../images/default-avatar.png";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/Slider";
import routes from "../../routes";

class MyProfile extends Component {
  state = {
    showModal: false,
  };

  handleClose = () => this.setState({ showModal: false });
  handleShow = () => this.setState({ showModal: true });

  async componentDidMount() {
    const { token } = this.props;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    await axios
      .get(`${config.api_url}/users/me`)
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
        {user.role === "coach" ? (
          <Row className="mt-5 ">
            <Col xs={12}>
              <h3 className="text-center mt-2 mb-3">My courses</h3>
              <Slider
                classN="courses"
                createRoute={routes.createCourse}
              ></Slider>
            </Col>
            <Col xs={12}>
              <h3 className="text-center mt-2 mb-3">My groups</h3>
              <Slider classN="groups" />
            </Col>
            <Col xs={12}>
              <h3 className="text-center mt-2 mb-3">Feedback</h3>
              <Slider classN="feedback" />
            </Col>
          </Row>
        ) : (
          <Row></Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(MyProfile);
