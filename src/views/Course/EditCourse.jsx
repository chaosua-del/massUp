import React, { Component } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import axios from "axios";
import config from "../../config";
import routes from "../../routes";
import { Link } from "react-router-dom";
import fetchCourseById from "../../utils/fecthCourseById";
import draftToHtml from "draftjs-to-html";

export default class CreateCourse extends Component {
  state = {
    courseName: " ",
    courseSaved: false,
    editorState: EditorState.createEmpty(),
    contentState: {
      blocks: [],
      entityMap: {},
    },
    courseSavedId: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await fetchCourseById(id)
      .then((response) => {
        this.setState((prevState) => {
          return {
            courseName: response.data.courseName,
            contentState: {
              blocks: response.data.text,
            },
            editorState: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(
                  draftToHtml({ blocks: response.data.text, entityMap: {} })
                )
              )
            ),
          };
        });
      })
      .catch((err) => console.log(err));
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    console.log(this.state.editorState);
  };

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });

    console.log(this.state.contentState);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClose = () => {};

  handleNewCourse = () => {
    this.setState({
      courseSaved: false,
      text: "",
      courseName: "",
      editorState: EditorState.createEmpty(),
    });
  };

  handleFormSubmit = (e) => {
    const id = this.props.match.params.id;
    e.preventDefault();

    axios
      .put(`${config.api_url}/course`, {
        _id: id,
        courseName: this.state.courseName,
        text: this.state.contentState.blocks,
      })
      .then((response) => {
        this.setState({
          courseSaved: true,
          courseSavedId: response.data._id,
        });
        console.log("text", response.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      courseName,
      courseSaved,
      editorState,
      contentState,
      courseSavedId,
    } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formCourseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              required
              className="w-50"
              type="text"
              placeholder="Enter name"
              name="courseName"
              value={courseName}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Editor
            editorState={editorState}
            initialContentState={contentState}
            onContentStateChange={this.onContentStateChange}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "emoji",
                "image",
                "remove",
                "history",
              ],
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
            // onChange={this.handleEditorChange}
          />
          <Button type="submit">Save</Button>
        </Form>
        <Modal
          show={courseSaved}
          centered
          keyboard={false}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Course Saved!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="primary">
              <Link to={`${routes.course}/${courseSavedId}`}>Show It</Link>
            </Button>
            <Button variant="secondary" onClick={this.handleNewCourse}>
              Create Another Course
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
