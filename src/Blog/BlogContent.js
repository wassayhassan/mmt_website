import React, { Component } from "react";
import axios from "axios";
import { doc } from "prettier";
import { BASELINE } from "../util/index";

class DashboardBlogContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: false,
      AddSubjectTitle: "",
      SelectedSubject: "",
      SelectedSubject2: "",
      role: "",
      multi_table: [],
      article_data: [] //main data
    };
    this.sendArticleID = this.sendArticleID.bind(this);
    this.Add2Server = this.Add2Server.bind(this);
    this.Remove2Server = this.Remove2Server.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.bringsubejct = this.bringsubejct.bind(this);
    this.loadarticle = this.loadarticle.bind(this);
    this.sortbyvalue = this.sortbyvalue.bind(this);
    this.nav_multi_table = this.nav_multi_table.bind(this);
    this.change_table = this.change_table.bind(this);
  }

  async sendArticleID(num, aid) {
    this.props?.handleAddClick(num, aid);
  }

  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async loadarticle() {
    var self = this;
    axios
      .post(BASELINE+"blog/get/articles", {})
      .then(function (response) { //multi_table
        self.state.article_data = response.data;
        self.sortbyvalue("All");
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async sortbyvalue(sub) {
    this.state.multi_table = [];

    if (sub == "All") {
      for (let i = 0; i < this.state.article_data.aidlst.length; i++) {
        var col = [];
        for (let j = 0; j < 6; j++) {
          if (this.state.article_data.title[i + j]) {
            col.push(parseInt(i + j));
          }
        }
        i = i + 5;

        this.state.multi_table.push(col);
      }
    } else {
      var cnt = 0;
      var st = []; //small table
      for (let i = 0; i < this.state.article_data.aidlst.length; i++) {
        if (this.state.article_data.subject[i] == sub) {
          if (cnt < 6) {
            st.push(parseInt(i));
            cnt += 1;
          } else {
            cnt = 1;
            this.state.multi_table.push(st);
            st = [];
            st.push(parseInt(i));
          }
        }
      }
      if (cnt != 0) {
        this.state.multi_table.push(st);
      }
    }
    this.nav_multi_table()
    this.change_table(0)
  }


  async change_table(row) {
    var j = 0;
    for (let i = 0; i < row; i++) {
      j += 6;
    }

    var mainID = document.getElementById("BlogContentHere");
    mainID.innerHTML = '';

    for (let i = 0; i < this.state.multi_table[row].length; i++) {
      var main = document.createElement("div");
      main.className = "relative";
      main.id = "blog" + (this.state.multi_table[row][i]);

      var a = document.createElement("a");
      a.className = "pb-3 flex items-center bg-white rounded-lg border shadow-xl w-41 border-slate-500";

      var main_img = document.createElement("img");
      main_img.className = "rounded-lg w-48 mx-2 my-2";
      main_img.style.height = "100px";
      main_img.src = this.state.article_data.path[this.state.multi_table[row][i]];

      var div_title = document.createElement("div");
      div_title.className = "flex flex-col justify-between leading-normal pt-8";

      var txt_title = document.createElement("h5");
      txt_title.className = "text-sm font-semibold py-1 tracking-tight text-gray-900";
      txt_title.innerText = this.state.article_data.title[this.state.multi_table[row][i]];

      var p_context = document.createElement("p");
      p_context.className = "text-sm text-gray-700 dark:text-gray-400";
      p_context.id = "subject" + this.state.multi_table[row][i];
      p_context.innerText = "Subject: " + this.state.article_data.subject[this.state.multi_table[row][i]];

      var div_date = document.createElement("p");
      div_date.className = "text-sm text-gray-700 dark:text-gray-400";
      div_date.innerText = this.state.article_data.date[this.state.multi_table[row][i]];

      div_title.appendChild(txt_title);
      div_title.appendChild(div_date);
      div_title.appendChild(p_context);

      var div_edit = document.createElement("div");
      div_edit.className = "btn";

      var button_edit = document.createElement("button");
      button_edit.className = "absolute top-2 right-2 bg-slate-700 text-white rounded-lg pt";

      var span = document.createElement("span");
      span.className = "text-sm px-4 py-1";
      span.innerText = "Edit Article";
      span.addEventListener("click", () => {
        this.sendArticleID(21, parseInt(this.state.article_data.aidlst[j + i]));
      });

      button_edit.appendChild(span);
      div_edit.appendChild(button_edit);

      a.appendChild(main_img);
      a.appendChild(div_title);
      a.appendChild(div_edit);
      main.appendChild(a);
      mainID.appendChild(main);
    }
  }

  async nav_multi_table() {
    var main = document.getElementById("multi_table_id_nav");
    main.innerText = "";
    for (let i = 0; i < this.state.multi_table.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "py-2 px-3 leading-tight font-bold cursor-pointer	";
      a.innerText = i + 1;
      li.append(a);
      main.append(li);
      a.addEventListener("click", () => {
        this.change_table(i);
      });
    }
  }

  async Remove2Server() {
    var data = {
      "subject": this.state.SelectedSubject,
    };
    axios.post(BASELINE+"blog/subject/remove", data)
      .then(function (response) { })
      .catch(function (error) {
        alert(error);
      });

    this.setState({ SelectedSubject: "" });
    this.state.SelectedSubject = "";
    this.bringsubejct();
  }

  async Add2Server() {
    var data = {
      subject: this.state.AddSubjectTitle,
    };
    axios.post(BASELINE+"blog/subject/add", data)
      .then(function (response) { })
      .catch(function (error) {
        alert(error);
      });

    this.setState({ AddSubjectTitle: "" });
    this.state.AddSubjectTitle = "";
    this.bringsubejct();
  }

  bringsubejct() {
    var self = this;
    axios.get(BASELINE+"blog/subject/get", {})
      .then(function (response) {
        var main = document.getElementById("subject_select");
        main.innerHTML = "";
        var main2 = document.getElementById("subject_select2");
        main2.innerHTML = "";

        var opall = document.createElement("option");
        opall.value = "All";
        opall.innerText = "ALL";
        main2.appendChild(opall);

        for (let i = 0; i < response.data.title.length; i++) {
          var op = document.createElement("option");
          op.value = response.data.title[i];
          op.innerText = response.data.title[i];
          main.appendChild(op);

          var op2 = document.createElement("option");
          op2.value = response.data.title[i];
          op2.innerText = response.data.title[i];
          main2.appendChild(op2);
        }

        main2.onchange = function (e) {
          self.sortbyvalue(e.target.value);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  componentDidMount() {
    this.bringsubejct();
    this.loadarticle();
  }

  render() {
    let { AddSubjectTitle, SelectedSubject, SelectedSubject2 } = this.state;
    return (
      <div>
        <div>
          <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
            <i className="fa-solid fa-book-open pl-5 pt-3"></i>
            <p className="text-2xl font-semibold ml-5 mt-1">Blog Post</p>
          </div>
          <div className="bg-white rounded-b-lg relative" style={{ height: "800px" }}>
            <div className="shadow-xl w-80 mt-10 ml-5 rounded-lg inline-block">
              <div className="m-auto">
                <div className="subject h-10 bg-slate-700 text-white rounded-t-lg overflow-hidden">
                  <span className="mx-5 mt-2 inline-block text-lg font-semibold">Subject</span>
                </div>
                <div className="py-2 px-1">
                  <select
                    className="relative inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    id="subject_select2"
                    aria-expanded="true"
                    aria-haspopup="true"
                    name="SelectedSubject2"
                    value={SelectedSubject2}
                    onChange={this.handleInputFieldChange}
                  ></select>
                </div>
                <div className="flex p-1">
                  <input
                    className="relative inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onChange={this.handleInputFieldChange}
                    name="AddSubjectTitle"
                    value={AddSubjectTitle}
                  ></input>
                  <button
                    className="bg-slate-700 rounded-lg text-white w-40 ml-5 text-sm"
                    onClick={this.Add2Server}
                  >
                    Add Subject
                  </button>
                </div>
                <div className="flex px-1 pt-1 pb-4">
                  <select
                    className="relative inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    id="subject_select"
                    aria-expanded="true"
                    aria-haspopup="true"
                    name="SelectedSubject"
                    value={SelectedSubject}
                    onChange={this.handleInputFieldChange}
                  >
                    <option defaultValue>Select Subject</option>
                  </select>
                  <button
                    className="bg-slate-700 rounded-lg text-white w-40 ml-5 text-sm"
                    onClick={this.Remove2Server}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>


            <div className="posts absolute left-96 top-10 right-6">
              <div className="grid grid-cols-2 gap-7" id="BlogContentHere"></div>

              <div aria-label="Page navigation" className="pt-6">
                <ul className="inline-flex items-center -space-x-px" id="multi_table_id_nav">

                </ul>
              </div>
              <div className="btn">
                <button
                  onClick={() => {
                    this.props?.handleAddClick(22, -1);
                  }}
                  to="/BlogWriting"
                  className="w-full bg-slate-700 text-white p-3 mt-10 rounded-lg block text-center"
                >
                  <span className="text-lg font-bold">Add Article</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardBlogContents;
