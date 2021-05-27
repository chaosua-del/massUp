import axios from "axios";
import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";
import AllRoomsList from "../../components/Room/AllRoomsList";
import PaginationComponent from "../../components/PaginationComponent";
import config from "../../config";

export default class ShowRooms extends Component {
  state = {
    rooms: [],
    roomsPerPage: 10,
    currentPage: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get(`${config.api_url}/room/allRooms`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          rooms: response.data,
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
    const { rooms, roomsPerPage, currentPage, isLoading } = this.state;
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
    console.log("current", currentRooms);
    return (
      <Container>
        <h3 className="mb-5 text-center">Кімнати</h3>
        {isLoading ? (
          <Spinner animation="grow" variant="primary" />
        ) : (
          <AllRoomsList rooms={currentRooms}></AllRoomsList>
        )}

        <PaginationComponent
          totalRooms={rooms.length}
          roomsPerPage={roomsPerPage}
          active={currentPage}
          handlePaginationChange={this.handlePaginationChange}
        ></PaginationComponent>
      </Container>
    );
  }
}
