import React, { Component } from "react";
import Hero from "../../components/Home/Hero";
import Main from "../../components/Home/Main";
import Footer from "../../components/Footer";

export default class Home extends Component {
  render() {
    return (
      <>
        <Hero />
        <Main />
        <Footer />
      </>

      /* <Row>
          <Col lg="4">
            <Link to={routes.showRooms}>
              <Button>Show Rooms</Button>
            </Link>
          </Col>
          <Col lg="4">
            <Link to={routes.showCoaches}>
              <Button>Show Coaches</Button>
            </Link>
          </Col>
          <Col lg="4"></Col>
        </Row> */
    );
  }
}
