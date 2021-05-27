import React, { Component } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import fetchRoomById from "../../utils/fetchRoomById";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import routes from "../../routes";
import { Link } from "react-router-dom";

class Room extends Component {
  state = {
    maxUsers: "",
    roomName: "",
    courseId: "",
    coachId: "",
    roomId: "",
    users: [],
    isMyProfile: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetchRoomById(id)
      .then((response) => {
        const { maxUsers, roomName, courseId, coachId, users, _id } =
          response.data;
        const isMyProfile = this.props.id === coachId ? true : false;
        this.setState({
          maxUsers,
          roomName,
          courseId,
          coachId,
          users,
          isMyProfile,
          roomId: _id,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      const isMyProfile = this.props.id === this.state.coachId ? true : false;
      this.setState({ isMyProfile });
    }
  }

  render() {
    const { courseId, roomName, coachId, isMyProfile, roomId, users } =
      this.state;
    return (
      <Container>
        <h3 className="mb-4">
          {roomName}#{roomId}
        </h3>
        <Link to={routes.course + "/" + courseId} className="mr-3">
          <Button> Ознайомитись з тренувальним процесом</Button>
        </Link>
        <Link
          to={isMyProfile ? routes.myProfile : routes.profile + "/" + coachId}
        >
          <Button variant="secondary">Показати тренера</Button>
        </Link>
        <hr />
        <h4>Учасники:</h4>
        {users.length > 0 ? <ListGroup></ListGroup> : <p>Учаників немає</p>}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: authSelectors.getId(state),
  };
};

export default connect(mapStateToProps)(Room);
