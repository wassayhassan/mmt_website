import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";

class BlogWriting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_article_id: "",
      title: "",
      title_img: "",
      title_img_loc: "",
      context: "",
      subject: "",
      date: "",
    };
    this.uploadAdapter = this.uploadAdapter.bind(this);
    this.postarticle = this.postarticle.bind(this);
    this.settitle = this.settitle.bind(this);
    this.setsubject = this.setsubject.bind(this);
    this.set_blog_id = this.set_blog_id.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.bringsubejct = this.bringsubejct.bind(this);
  }

  bringsubejct() {
    axios.get(BASELINE+"blog/subject/get", {})
      .then(function (response) {
        var main = document.getElementById("blogsubject");
        main.innerHTML = "";
        for (let i = 0; i < response.data.title.length; i++) {
          var op = document.createElement("option");
          op.value = response.data.title[i];
          op.innerText = response.data.title[i];
          main.appendChild(op);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  settitle = (e) => {
    this.setState({ title: e.target.value });
  };

  setsubject = (e) => {
    this.setState({ subject: e.target.value });
    this.state.subject = e.target.value;
  };

  async set_blog_id() {
    var self = this;
    axios
      .post(BASELINE+"blog/uploads/post/add/id", {})
      .then(function (response) {
        self.setState({ blog_article_id: response.data.blog_id });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async postarticle() {
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    this.setState({ date: date });
    this.state.date = date;

    const formData = new FormData();
    formData.append("title_img", this.state.title_img_loc);
    formData.append("blog_article_id", this.state.blog_article_id);
    formData.append("title", this.state.title);
    formData.append("date", this.state.date);
    formData.append("subject", this.state.subject);
    formData.append("context", this.state.context);

    axios.post(BASELINE+"blog/add/article", formData)
      .then(function (response) {
        alert(response.data.message);
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
            body.append("aid", this.state.blog_article_id);
            axios.post(BASELINE+"blog/upload/image", body)
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

  handleChangeImage = (e) => {
    this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
    this.setState({ title_img_loc: e.target.files[0] });
  };

  componentDidMount() {
    this.set_blog_id();
    this.bringsubejct();
  }

  render() {
    return (
      <div>
        <div className="container mx-auto p-5 md:p-9 rounded-2xl bg-white">
          <div className="flex flex-col gap-10 md:flex-row items-center text-slate-400">
            <div className="rounded-2xl p-6 h-36 sm:max-w-[200px] max-w-[250px] text-sm text-slate-400 bg-white border border-dashed mb-3 border-slate-500 flex justify-center items-center">
              {this.state.title_img == "" && <p>+ Drag and drop or click here to upload image</p>}{" "}
              {this.state.title_img != "" && <img src={this.state.title_img} alt="img" />}
              <input
                type="file"
                name="title_img"
                accept="image/*"
                onChange={this.handleChangeImage}
              />
            </div>
            <div className="w-full">
              <select
                id="blogsubject"
                onChange={this.setsubject}
                className="bg-gray-50 border border-gray-500 text-sm rounded-md outline-none focus:ring-blue-500 text-slate-400 focus:border-blue-500 block mb-5 p-2.5 w-full md:w-[451px]"
              >
                <option defaultValue="">Select Subject</option>
              </select>
              <input
                type="text"
                id=""
                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full md:w-[451px]"
                placeholder="Title"
                onChange={this.settitle}
              />
            </div>
          </div>

            <button
              className="md:mt-0 ml-auto items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200 mb-2"
              onClick={() => {
                this.props?.handleBackClick(2);
              }}
            >
              Back
            </button>

          <button
            onClick={this.postarticle}
            className="ml-10 mt-8 md:mt-0 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200 mb-10"
          >
            Post Article
          </button>

          <CKEditor
            editor={DecoupledEditor}
            //data={blogDetail}
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
        </div>
      </div>
    );
  }
}

export default BlogWriting;
