import React, { Component } from "react";
import routes from "../../routes";
import Slider from "../../components/Slider/Slider";
import RoomList from "../../components/Room/RoomList";
import { Row, Col, Button } from "react-bootstrap";
import FeedbackList from "../../components/Feedback/FeedbackList";
import CreateFeedback from "../../components/Feedback/CreateFeedback";
import PaginationComponent from "../../components/PaginationComponent";
import axios from "axios";
import config from "../../config";

const styles = {
  feedbackButton: {
    right: "0",
    top: "0",
  },
};

export default class CoachProfile extends Component {
  state = {
    showModal: false,
    feedback: "",
    rating: null,
    submitError: null,
    feedbacks: [],
    feedbacksPerPage: 3,
    currentPage: 1,
  };

  componentDidMount() {
    axios
      .get(`${config.api_url}/feedback/${this.props.id}`)
      .then((response) => {
        this.setState({ feedbacks: response.data });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      rating: null,
      feedback: "",
      submitError: null,
    });
  };

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleRatingChange = (value) => {
    this.setState({
      rating: value,
    });
    console.log(value);
  };

  handlePaginationChange = (e) => {
    if (e.target.tagName !== "SPAN") {
      this.setState({
        currentPage: parseInt(e.target.text),
      });
    } else {
      return;
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { feedback, rating } = this.state;
    if (!rating) {
      this.setState({
        submitError: "Оцініть тренера",
      });
    } else {
      axios
        .post(`${config.api_url}/feedback/${this.props.id}`, {
          text: feedback,
          rating,
        })
        .then((response) => {
          console.log(response.data);
          this.setState((prevState) => {
            return {
              feedbacks: [response.data, ...prevState.feedbacks],
            };
          });
          this.handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { isMyProfile, id } = this.props;
    const {
      showModal,
      feedback,
      submitError,
      rating,
      feedbacks,
      feedbacksPerPage,
      currentPage,
    } = this.state;
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );
    return (
      <Row className="mt-5">
        <Col xs={12} className="mb-5">
          <h3 className="text-center mt-2 mb-5">Курси</h3>
          <Slider
            classN="courses"
            createRoute={routes.createCourse}
            isMyProfile={isMyProfile}
            id={id}
          ></Slider>
        </Col>
        <Col xs={12} className="mb-5">
          <h3 className="text-center mt-2 mb-4">Кімнати</h3>
          <RoomList userId={id} isMyProfile={isMyProfile} />
        </Col>
        <Col xs={12} lg={8} className="mb-5 mt-5 mx-auto">
          <div className="position-relative">
            <h3 className="text-center mt-2 mb-4">Відгуки</h3>
            {!isMyProfile && (
              <Button
                className="position-absolute"
                style={styles.feedbackButton}
                variant="secondary"
                onClick={this.handleShow}
              >
                Залишити відгук
              </Button>
            )}
          </div>
          <FeedbackList data={currentFeedbacks} />
          <CreateFeedback
            show={showModal}
            onHide={this.handleClose}
            onInputChange={this.handleInputChange}
            onRatingChange={this.handleRatingChange}
            onFormSubmit={this.handleFormSubmit}
            feedback={feedback}
            submitError={submitError}
            rating={rating}
          />
          <PaginationComponent
            totalRooms={feedbacks.length}
            roomsPerPage={feedbacksPerPage}
            active={currentPage}
            handlePaginationChange={this.handlePaginationChange}
          ></PaginationComponent>
        </Col>
      </Row>
    );
  }
}
