import React, { Component } from "react";
import { withRouter } from "react-router";
import fetchCourseById from "../../utils/fecthCourseById";
import { Container, Button } from "react-bootstrap";
import htmlToDraft from "draftjs-to-html";
import { Link } from "react-router-dom";
import authSelectors from "../../redux/auth/authSelectors";
import routes from "../../routes";
import { connect } from "react-redux";

class Course extends Component {
  state = {
    courseName: "",
    coachId: "",
    html: "",
    isMyProfile: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    try {
      fetchCourseById(id).then((response) => {
        console.log(response.data);
        const isMyProfile =
          this.props.id === response.data.coach_id ? true : false;
        console.log(response.data);
        this.setState({
          courseName: response.data.courseName,
          coachId: response.data.coach_id,
          isMyProfile,
          html: htmlToDraft({
            blocks: response.data.text,
            entityMap: response.data.entityMap,
          }),
        });
        console.log(isMyProfile);
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      const isMyProfile = this.props.id === this.state.coachId ? true : false;
      this.setState({ isMyProfile });
    }
  }

  render() {
    const { courseName, html, isMyProfile, coachId } = this.state;

    return (
      <Container>
        <h3 className="mb-3">{courseName}</h3>
        <Link
          to={isMyProfile ? routes.myProfile : routes.profile + "/" + coachId}
        >
          <Button>Показати тренера</Button>
        </Link>
        <hr />
        <div className="mt-5" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: authSelectors.getId(state),
  };
};

export default connect(mapStateToProps)(withRouter(Course));
