import React, { Component } from "react";
import withAuth from "../../hoc/withAuth";
import fetchAllCoursesById from "../../utils/fetchAllCoursesById";
import { Form, Button, Modal } from "react-bootstrap";
import config from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";
import routes from "../../routes";

class CreateRoom extends Component {
  state = {
    roomId: "",
    roomName: "",
    maxUsers: "",
    courseId: "",
    courses: [],
    showModal: false,
  };

  handleShow = () => this.setState({ showModal: true });

  handleClose = () => {};

  async componentDidMount() {
    fetchAllCoursesById(this.props.match.params.id)
      .then((response) => {
        this.setState({
          courses: response.data,
          courseId: response.data[0]._id,
        });
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    console.log(this.state);
  };

  handleFormSubmit = (e) => {
    const { roomName, maxUsers, courseId } = this.state;
    const credentials = {
      roomName,
      maxUsers,
      courseId,
    };
    e.preventDefault();

    axios
      .post(`${config.api_url}/room`, credentials)
      .then((response) => {
        console.log(response.data);
        this.setState({
          showModal: true,
          roomId: response.data._id,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { courses, showModal } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="room-name">
          <Form.Label>Назва кімнати</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Введіть назву кімнати"
            name="roomName"
            value={this.state.roomName}
            onChange={this.handleInputChange}
          />
          <Form.Text className="text-muted">
            Назва кімнати повинна містити напрямок занять.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Максимальна кількість учасників</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Введіть число"
            name="maxUsers"
            value={this.state.maxUsers}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="course-select">
          <Form.Label>Виберіть курс</Form.Label>
          <Form.Control
            required
            as="select"
            name="courseId"
            value={this.state.courseId}
            onChange={this.handleInputChange}
          >
            {courses.map((course) => {
              return (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Створити
        </Button>
        <Modal
          show={showModal}
          centered
          keyboard={false}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Кімнату створено!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="primary">
              <Link to={routes.room + "/" + this.state.roomId}>
                Перейти до кімнати
              </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}

export default withAuth(CreateRoom);
