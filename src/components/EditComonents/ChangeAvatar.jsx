import React, { Component } from "react";
import { Form, Spinner } from "react-bootstrap";
import config from "../../config";
import defaultAvatar from "../../images/default-avatar.png";
import axios from "axios";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import authOperations from "../../redux/auth/authOperations";

const styles = {
  avatar: {
    width: "250px",
    height: "250px",
  },
  spinner: {
    justifyContent: "center",
    alightItems: "center",
  },
};

class ChangeAvatar extends Component {
  state = {
    isLoading: false,
  };

  handleFileInputChange = async (e) => {
    this.setState({ isLoading: true });
    const file = await e.target.files[0];
    const formData = new FormData();
    formData.append("filedata", file);
    console.log("formData", formData);

    await axios
      .post(`${config.api_url}/avatar`, formData)
      .then((response) => {
        console.log(response);
        this.props.getUser();
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Form className="d-flex justify-content-center flex-column align-items-center py-5">
        <div
          style={styles.avatar}
          className={`d-flex position-relative ${
            isLoading && "align-items-center justify-content-center "
          }`}
        >
          {isLoading ? (
            <Spinner
              style={styles.spinner}
              animation="border"
              variant="primary"
            />
          ) : (
            <img
              className="mb-3"
              src={
                this.props.avatar
                  ? config.url + "/uploads/" + this.props.avatar
                  : defaultAvatar
              }
              alt="user"
            />
          )}
        </div>
        <Form.Group>
          <Form.File
            className="pl-5 mt-2"
            name="filedata"
            onChange={this.handleFileInputChange}
            id="exampleFormControlFile1"
          />
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    avatar: authSelectors.getAvatar(state),
  };
};

export default connect(mapStateToProps, {
  getUser: authOperations.getCurrentUser,
})(ChangeAvatar);
