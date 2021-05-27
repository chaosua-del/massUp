import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { Button, Card, Modal, Alert } from "react-bootstrap";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import normalizeSliders from "../../utils/normalizeSliders";
import routes from "../../routes";
import deleteCourseById from "../../utils/deleteCourseById";
import fetchAllCoursesById from "../../utils/fetchAllCoursesById";
import fetchAllRoomsById from "../../utils/fetchAllRoomsById";
import "./Slider.css";

class Slider extends Component {
  state = {
    showModal: false,
    editId: "",
    courses: [],
    // canDeleteCourse: true,
    modalError: "",
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

  handleClose = () =>
    this.setState({ showModal: false, editId: "", modalError: "" });
  handleShow = (id) => this.setState({ showModal: true, editId: id });

  handleDeleteCourse = async () => {
    const { editId } = this.state;
    let canDeleteCourse = true;

    await fetchAllRoomsById(this.props.id)
      .then((response) => {
        response.data.forEach((room) => {
          if (room.courseId === editId) {
            console.log("cannotdelete");
            canDeleteCourse = false;
          }
        });
        if (canDeleteCourse) {
          deleteCourseById(editId)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));

          this.setState((prevState) => {
            return {
              showModal: false,
              courses: prevState.courses.filter(
                (element) => element._id !== editId
              ),
            };
          });
        } else {
          this.setState({
            modalError: "Неможливо видалити курс, він прив'язний до кімнати!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
    const { courses, modalError } = this.state;

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
                          <Button variant="primary">Показти курс</Button>
                        </Link>

                        {isMyProfile && (
                          <Button
                            onClick={() => this.handleShow(element._id)}
                            variant="secondary"
                          >
                            Редагувати
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
            <div className="my-4 text-center">Немає курсів</div>
            {isMyProfile && (
              <div className="d-flex justify-content-center">
                <Button>
                  <Link to={createRoute}>Створити</Link>
                </Button>
              </div>
            )}
          </div>
        )}
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Виберіть дію:</Modal.Title>
          </Modal.Header>

          <Modal.Body className="mx-auto">
            {modalError ? (
              <Alert variant="danger">{modalError}</Alert>
            ) : (
              <div>
                <Link
                  to={routes.editCourse + "/" + this.state.editId}
                  className="mr-2"
                >
                  <Button variant="secondary">Редагувати</Button>
                </Link>

                <Button variant="danger" onClick={this.handleDeleteCourse}>
                  Видалити
                </Button>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Slider;
