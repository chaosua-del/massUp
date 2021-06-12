import React, { Component } from "react";
import { Container, Button, Spinner, Tabs, Tab } from "react-bootstrap";
import fetchRoomById from "../../utils/fetchRoomById";
import { connect } from "react-redux";
import routes from "../../routes";
import { Link } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import UsersList from "../../components/Room/UsersList";
import authOperations from "../../redux/auth/authOperations";
import UsersChart from "../../components/Room/UsersChart";

class Room extends Component {
  state = {
    maxUsers: "",
    roomName: "",
    courseId: "",
    coachId: "",
    roomId: "",
    userRoomId: "",
    currentUser: null,
    users: [],
    loading: true,
    joined: false,
    joinedThisRoom: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetchRoomById(id)
      .then((response) => {
        const { maxUsers, roomName, courseId, coachId, _id } = response.data;
        const users = response.data.users ? response.data.users : [];
        this.setState({
          maxUsers,
          roomName,
          courseId,
          coachId,
          users,
          roomId: _id,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevState.currentUser) {
      const currentUser = this.props.user;
      const joined = currentUser.joinedRoom ? true : false;
      const joinedThisRoom =
        currentUser.joinedRoom === this.state.roomId ? true : false;
      const isMyProfile = this.state.coachId === currentUser.id ? true : false;
      this.setState({
        currentUser,
        loading: false,
        joined,
        joinedThisRoom,
        isMyProfile,
      });
    }
  }

  handleJoinRoom = () => {
    const users = [...this.state.users, this.state.currentUser];
    console.log(this.state.currentUser);

    this.setState((prevState) => {
      return {
        users,
        joined: true,
        joinedThisRoom: true,
      };
    });

    axios
      .put(`${config.api_url}/users/room`, { joinedRoom: this.state.roomId })
      .catch((err) => console.log(err));

    axios
      .put(`${config.api_url}/room/${this.state.roomId}`, {
        users,
      })
      .catch((err) => console.log(err));

    this.props.onJoin();
  };

  handleLeaveRoom = () => {
    const users = this.state.users.filter(
      (user) => user.id !== this.state.currentUser.id
    );
    this.setState((prevState) => {
      return {
        users,
        joinedRoom: null,
        joinedThisRoom: false,
        joined: false,
      };
    });

    axios
      .put(`${config.api_url}/users/room`, { joinedRoom: null })
      .catch((err) => console.log(err));

    axios
      .put(`${config.api_url}/room/${this.state.roomId}`, {
        users,
      })
      .catch((err) => console.log(err));

    this.props.onJoin();
  };

  handleDeleteUser = (id) => {
    const users = this.state.users.filter((user) => user.id !== id);
    this.setState((prevState) => {
      return {
        users,
      };
    });

    axios
      .put(`${config.api_url}/users/deleteFromRoom/${id}`)
      .catch((err) => console.log(err));

    axios
      .put(`${config.api_url}/room/${this.state.roomId}`, {
        users,
      })
      .catch((err) => console.log(err));

    this.props.onJoin();
  };

  render() {
    const {
      courseId,
      roomName,
      coachId,
      roomId,
      users,
      loading,
      isMyProfile,
      joined,
      joinedThisRoom,
    } = this.state;
    return (
      <Container className="pb-5 mb-5">
        <Tabs defaultActiveKey="participants" id="uncontrolled-tab-example">
          <Tab eventKey="participants" title="Загальне">
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <div>
                <h3 className="my-4">
                  Кімнта: {roomName}#{roomId}
                </h3>
                <Link to={routes.course + "/" + courseId} className="mr-3">
                  <Button> Ознайомитись з тренувальним процесом</Button>
                </Link>
                <Link
                  to={
                    isMyProfile
                      ? routes.myProfile
                      : routes.profile + "/" + coachId
                  }
                >
                  <Button className="mr-3" variant="secondary">
                    Показати тренера
                  </Button>
                </Link>
                {!isMyProfile && !joined && (
                  <Button variant="dark" onClick={this.handleJoinRoom}>
                    Вступити в кімнату
                  </Button>
                )}
                {joinedThisRoom && (
                  <Button onClick={this.handleLeaveRoom} variant="danger">
                    Покинути кімнату
                  </Button>
                )}
                <hr />
                <h3 className="text-center mt-5 mb-4">Учасники</h3>
                {users.length > 0 ? (
                  <UsersList
                    data={users}
                    onDelete={this.handleDeleteUser}
                    isMyProfile={isMyProfile}
                  />
                ) : (
                  <p>Учаників немає</p>
                )}
              </div>
            )}
          </Tab>
          <Tab eventKey="statistic" title="Статистика">
            <UsersChart users={users} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  onJoin: authOperations.getCurrentUser,
})(Room);
