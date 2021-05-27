import React, { Component } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import withAuth from "../../hoc/withAuth";
import { connect } from "react-redux";
import config from "../../config";
import axios from "axios";
import {
  ChangeMainInfo,
  ChangeAvatar,
  ChangeMeasurments,
  ChangePassword,
} from "../../components/EditComonents";

class EditProfile extends Component {
  state = {
    firstname: "",
    age: "",
    newPassword: "",
    repeatPassword: "",
    currentPassword: "",
    email: "",
    city: "",
    country: "",
    height: "",
    weight: "",
    passwordMatch: false,
    avatar: File,
    avatarPreview: "",
    showModal: false,
  };

  componentDidMount() {
    axios
      .get(`${config.api_url}/users/find/${this.props.match.params.id}`)
      .then((response) => {
        const { user } = response.data;
        this.setState({
          firstname: user.firstname,
          age: user.age,
          email: user.email,
          city: user.city,
          country: user.country,
          height: user.height,
          weight: user.weight,
          avatarPreview: user.avatar,
        });
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (e, postRequest, credentials) => {
    e.preventDefault();
    console.log(postRequest);
    console.log(credentials);

    await axios
      .put(`${config.api_url}/users/${postRequest}`, credentials)
      .then((response) => {
        this.handleShow();
      })
      .catch((err) => console.log(err));
  };

  handleShow = () => this.setState({ showModal: true });

  handleClose = () => this.setState({ showModal: false });

  render() {
    const {
      firstname,
      email,
      city,
      age,
      country,
      height,
      weight,
      currentPassword,
      newPassword,
      repeatPassword,
    } = this.state;
    return (
      <>
        <Tabs defaultActiveKey="main">
          <Tab eventKey="main" title="Основне">
            <ChangeMainInfo
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              firstname={firstname}
              email={email}
              city={city}
              country={country}
              age={age}
            />
          </Tab>
          <Tab eventKey="avatar" title="Аватар">
            <ChangeAvatar />
          </Tab>
          <Tab eventKey="measurments" title="Показники">
            <ChangeMeasurments
              height={height}
              weight={weight}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
          </Tab>
          <Tab eventKey="password" title="Зміна паролю">
            <ChangePassword
              currentPassword={currentPassword}
              repeatPassword={repeatPassword}
              newPassword={newPassword}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Tab>
        </Tabs>
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Body>Зміни збережено!</Modal.Body>
          </Modal.Header>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, null)(withAuth(EditProfile));
