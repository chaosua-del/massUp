import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import styles from "./Slider.module.css";
import normalizeSliders from "../../utils/normalizeSliders";

export default class Slider extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    normalizeSliders(
      this.props.classN + "-slide",
      this.props.classN + "-swiper-container"
    );

    // console.log(swiperContainer.offsetHeight);
    SwiperCore.use([Navigation]);
  }

  handleClose = () => this.setState({ showModal: false });
  handleShow = () => this.setState({ showModal: true });

  render() {
    const breakpoints = {
      990: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
    };
    const { data, classN, createRoute } = this.props;
    return (
      <>
        <Swiper
          className={`${styles.swiper} ${classN}-swiper-container`}
          spaceBetween={20}
          slidesPerView={1}
          // centeredSlides={true}
          loop={true}
          breakpoints={breakpoints}
          navigation={{
            nextEl: `.${classN}__swiper-button-next`,
            prevEl: `.${classN}__swiper-button-prev`,
          }}
        >
          {data ? (
            data.map((data) => {
              return (
                <SwiperSlide
                  className={`${classN}-slide ${styles.swiperSlide}`}
                >
                  <Link to="#">{data.name}</Link>
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide className={`${classN}-slide ${styles.swiperSlide}`}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Name</Card.Title>
                  <Link to={createRoute}>Create</Link>
                </Card.Body>
              </Card>
            </SwiperSlide>
          )}
          <div
            className={`${styles.buttonPrev} ${classN}__swiper-button-prev swiper-button-prev`}
          ></div>
          <div
            className={`${styles.buttonNext} ${classN}__swiper-button-next swiper-button-next`}
          ></div>
        </Swiper>
      </>
    );
  }
}
