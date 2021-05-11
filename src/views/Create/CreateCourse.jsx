import React, { Component } from "react";
import JoditEditor from "jodit-react";

export default class CreateCourse extends Component {
  state = {
    content: "sdsd",
  };

  render() {
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
    };
    const { content } = this.state;
    return (
      <div>hello</div>
      // <JoditEditor
      //   ref={editor}
      //   value={content}
      //   config={config}
      //   tabIndex={1} // tabIndex of textarea
      //   onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      //   onChange={(newContent) => {}}
      // />
    );
  }
}
