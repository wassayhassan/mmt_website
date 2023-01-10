import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { blogDetail } from "./blog";

class BlogArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: false,
      role: "",
    };
  }

  render() {
    return (
      <div
        className="article"
        style={{
          marginLeft: "400px",
          marginRight: "400px",
          marginBottom: "100px",
        }}
      >
        <div className="title font-medium leading-tight text-5xl mt-0 mb-2 text-blue-800 text-center">
          This is the title
        </div>
        <hr className="mt-6" />
        <div className="article_info">
          <div className="date float-left mr-10">Date: 2020-03-04</div>
          <div className="Subject float-right">Author: Jaegeun Oh</div>
          <div className="Author">Subject: Main Blog</div>
        </div>
        <hr />
        <CKEditor
          disabled={true}
          editor={DecoupledEditor}
          data={blogDetail}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default BlogArticle;
