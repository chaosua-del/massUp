import React, { Component } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import axios from "axios";
import config from "../../config";
import routes from "../../routes";
import { Link } from "react-router-dom";

export default class CreateCourse extends Component {
  state = {
    courseName: " ",
    courseSaved: false,
    editorState: EditorState.createEmpty(),
    contentState: {},
    courseSavedId: "",
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    console.log(editorState.getCurrentInlineStyle());
  };

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
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
    e.preventDefault();

    axios
      .post(`${config.api_url}/course`, {
        courseName: this.state.courseName,
        text: this.state.contentState.blocks,
        entityMap: this.state.contentState.entityMap,
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
