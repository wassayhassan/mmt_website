import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BASELINE, CLIENT_URL } from "../../../util/index";
import axios from "axios";

class T_testmonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: ""
    };
    this.uploadAdapter = this.uploadAdapter.bind(this);
    this.bringcontext = this.bringcontext.bind(this);
    this.updatecontext = this.updatecontext.bind(this);
  }

  async updatecontext() {
    var data = {
      context: this.state.context
    }
    var self = this;
    axios.post(BASELINE + "dashboard/update/testmonial", data)
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  bringcontext() {
    var self = this;
    axios.get(BASELINE + "dashboard/get/testmonial", {})
      .then(function (response) {
        self.setState({ context: response.data.data.context });
      })
      .catch(function (error) {
        alert(error);
      });
  }


  uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            axios.post(BASELINE + "dashboard/testmonial/upload/image", body)
              .then(function (response) {
                resolve({ default: `${CLIENT_URL}/${response.data.link}` });
              })
              .catch(function (error) {
                reject(error);
              });
          });
        });
      },
    };
  }

  componentDidMount() {
    this.bringcontext();
  }

  render() {
    return (
      <div className="grid grid-cols-1 divide-y flex justify-start mt-[35px]">
        <CKEditor
          editor={DecoupledEditor}
          data={this.state.context}
          onReady={(editor) => {
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );

            editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
              return this.uploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            //console.log({ event, editor, data });
            this.setState({ context: data });
          }}
          onBlur={(event, editor) => {
            //  console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //  console.log("Focus.", editor);
          }}
        />

        <button
          className="px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200 mb-[20px]"
          onClick={this.updatecontext}
        >
          Update
        </button>
      </div>
    );
  }
}

export default T_testmonial;
