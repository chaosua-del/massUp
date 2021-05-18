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

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      await fetchCourseById(id).then((response) => {
        this.setState({
          courseName: response.data.courseName,
          coachId: response.data.coach_id,
          html: htmlToDraft({
            blocks: response.data.text,
          }),
        });
        console.log("data", response.data);

        if (this.props.id === this.state.coachId) {
          this.setState({
            isMyProfile: true,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { courseName, html, isMyProfile, coachId } = this.state;

    return (
      <Container>
        <h3 className="mb-3">Course Name: {courseName}</h3>
        <Link
          to={isMyProfile ? routes.myProfile : routes.profile + "/" + coachId}
        >
          <Button> Show Coach</Button>
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
