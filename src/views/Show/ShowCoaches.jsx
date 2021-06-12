import axios from "axios";
import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import CoachesList from "../../components/CoachesList";
import PaginationComponent from "../../components/PaginationComponent";
import config from "../../config";

export default class ShowCoaches extends Component {
  state = {
    coaches: [],
    coachesPerPage: 3,
    currentPage: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get(`${config.api_url}/users/coaches`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          coaches: response.data,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  handlePaginationChange = (e) => {
    if (e.target.tagName !== "SPAN") {
      this.setState({
        currentPage: parseInt(e.target.text),
      });
    } else {
      return;
    }
  };

  render() {
    const { coaches, coachesPerPage, currentPage, isLoading } = this.state;
    const indexOfLastRoom = currentPage * coachesPerPage;
    const indexOfFirstRoom = indexOfLastRoom - coachesPerPage;
    const currentCoaches = coaches.slice(indexOfFirstRoom, indexOfLastRoom);
    console.log("current", currentCoaches);
    return (
      <Container>
        <h3 className="mb-5 text-center">Тренери</h3>
        {isLoading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <CoachesList coaches={currentCoaches} />
        )}

        <PaginationComponent
          totalRooms={coaches.length}
          roomsPerPage={coachesPerPage}
          active={currentPage}
          handlePaginationChange={this.handlePaginationChange}
        ></PaginationComponent>
      </Container>
    );
  }
}
