import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import normalizeSliders from "../../utils/normalizeSliders";
import routes from "../../routes";
import deleteCourseById from "../../utils/deleteCourseById";
import fetchAllCoursesById from "../../utils/fetchAllCoursesById";
import "./Slider.css";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";

class Slider extends Component {
  state = {
    showModal: false,
    editId: "",
    courses: [],
  };

  async componentDidMount() {
    await fetchAllCoursesById(this.props.id)
      .then((response) => {
        this.setState({ courses: response.data });
      })
      .catch((err) => console.log(err));

    if (this.state.courses.length > 0) {
      normalizeSliders(
        this.props.classN + "__swiper-slide",
        this.props.classN + "__swiper-container"
      );
    }
  }

  handleClose = () => this.setState({ showModal: false, editId: "" });
  handleShow = (id) => this.setState({ showModal: true, editId: id });

  handleDeleteCourse = async () => {
    const { editId } = this.state;

    await deleteCourseById(editId)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    this.setState((prevState) => {
      return {
        showModal: false,
        courses: prevState.courses.filter((element) => element._id !== editId),
      };
    });
  };

  render() {
    SwiperCore.use([Navigation]);
    const breakpoints = {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
    };
    const { classN, createRoute, isMyProfile } = this.props;
    const { courses } = this.state;

    return (
      <>
        {courses.length > 0 ? (
          <Swiper
            className={`${classN}__swiper-container`}
            spaceBetween={20}
            slidesPerView={1}
            // loop={true}
            breakpoints={breakpoints}
            navigation={true}
          >
            {courses.map((element) => {
              return (
                <SwiperSlide
                  key={element._id}
                  className={`${classN}__swiper-slide`}
                >
                  <Card style={{ width: "18rem", height: "100%" }}>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="mb-4">
                        {element.courseName}
                      </Card.Title>
                      <div className="d-flex justify-content-between mt-auto">
                        <Link
                          className="button d-block"
                          to={routes.course + "/" + element._id}
                        >
                          <Button variant="primary">Show Course</Button>
                        </Link>

                        {isMyProfile && (
                          <Button
                            onClick={() => this.handleShow(element._id)}
                            variant="secondary"
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div>
            <div className="my-4 text-center">No courses yet</div>
            {isMyProfile && (
              <div className="d-flex justify-content-center">
                <Button>
                  <Link to={createRoute}>Create</Link>
                </Button>
              </div>
            )}
          </div>
        )}
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You want to:</Modal.Title>
          </Modal.Header>

          <Modal.Body className="mx-auto">
            <Link
              to={routes.editCourse + "/" + this.state.editId}
              className="mr-2"
            >
              <Button variant="secondary">Edit</Button>
            </Link>

            <Button variant="danger" onClick={this.handleDeleteCourse}>
              Delete
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: authSelectors.getId(state),
  };
};

export default connect(mapStateToProps)(Slider);
