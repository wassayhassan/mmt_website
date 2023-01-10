import React, { Component } from "react";
import { BASELINE } from "../../../util/index";
import axios from "axios";

class T_instructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t_title: "",
      t_descr: ""
    };
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.preload = this.preload.bind(this);
    this.add_teacher = this.add_teacher.bind(this);
    this.remove_card = this.remove_card.bind(this);
    this.save_cards = this.save_cards.bind(this);
  }

  async save_cards() {
    var main = document.getElementById("main");
    var len = main.getElementsByTagName("input").length;
    var cards = [];
    for (let i = 0; i < len; i++) {
      cards.push({
        name: main.getElementsByTagName("input")[i].value,
        role: main.getElementsByTagName("input")[i + 1].value,
        desc: main.getElementsByTagName("input")[i + 2].value,
      });
      i += 2;
    }

    var data = {
      page_title: this.state.t_title,
      page_desc: this.state.t_descr,
      cards: JSON.stringify(cards)
    }
    var self = this;
    axios.post(BASELINE + "dashboard/update/instructor/title", data).then(function (response) {
      alert(response.data.message);
    }).catch(function (error) {
      alert(error);
    });

  }

  remove_card(ele) {
    ele.remove();
  }

  add_teacher() {
    var main = document.getElementById("main");
    var div = document.createElement("div");
    div.className = "w-full border border-gray-200 rounded-lg shadow-sm text-center";

    var div2 = document.createElement("div");
    div2.className = "flex flex-col items-center justify-center p-10";

    var img = document.createElement("img");
    img.className = "w-32 h-32 mb-6 rounded-full";
    img.src = BASELINE + "files/uploads/profile/default_profile.jpg"

    var name = document.createElement("input");
    name.className = "text-lg font-medium";
    name.placeholder = "place the name";

    var role = document.createElement("input");
    role.className = "font-medium text-blue-500";
    role.placeholder = "place the role";

    var desc = document.createElement("input");
    desc.className = "text-gray-400";
    desc.placeholder = "place the description";

    var remove = document.createElement("button");
    remove.className = "px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200"
    remove.innerText = "remove";
    remove.addEventListener("click", (event) => {
      this.remove_card(div);
    });

    div2.appendChild(img);
    div2.appendChild(name);
    div2.appendChild(role);
    div2.appendChild(desc);
    div2.appendChild(remove);
    div.appendChild(div2);
    main.appendChild(div);
  }

  preload(ele) {
    var main = document.getElementById("main");
    for (let i = 0; i < ele.length; i++) {
      var div = document.createElement("div");
      div.className = "w-full border border-gray-200 rounded-lg shadow-sm text-center";

      var div2 = document.createElement("div");
      div2.className = "flex flex-col items-center justify-center p-10";

      var img = document.createElement("img");
      img.className = "w-32 h-32 mb-6 rounded-full";
      img.src = BASELINE + "files/uploads/profile/default_profile.jpg"

      var name = document.createElement("input");
      name.className = "text-lg font-medium";
      name.value = ele[i].name;

      var role = document.createElement("input");
      role.className = "font-medium text-blue-500";
      role.value = ele[i].role;

      var desc = document.createElement("input");
      desc.className = "text-gray-400";
      desc.value = ele[i].desc;

      var remove = document.createElement("button");
      remove.className = "px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200"
      remove.innerText = "remove";
      remove.addEventListener("click", (event) => {
        this.remove_card(div);
      });

      div2.appendChild(img);
      div2.appendChild(name);
      div2.appendChild(role);
      div2.appendChild(desc);
      div2.appendChild(remove);
      div.appendChild(div2);
      main.appendChild(div);
    }
  }

  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    var self = this;
    axios.get(BASELINE + "dashboard/get/instructor", {}).then(function (response) {
      self.setState({ t_title: response.data.data.page_title });
      self.setState({ t_descr: response.data.data.page_desc });
      self.preload(JSON.parse(response.data.data.teachers));
    }).catch(function (error) {
      alert(error);
    });
  }

  render() {
    return (
      <div>
        <section className="w-full bg-white lg:py-14">
          <div className="max-w-6xl px-12 mx-auto text-center">
            <div className="space-y-12 md:text-center">
              <div className="max-w-3xl mb-4 space-y-5 sm:mx-auto sm:space-y-4">
                <input className="border-[2px] brder-solid border-[#374557] relative text-4xl font-extrabold tracking-tight sm:text-5xl" name="t_title" onChange={this.handleInputFieldChange} value={this.state.t_title} />
                <textarea className="border-[2px] brder-solid border-[#374557] text-xl text-gray-500" name="t_descr" onChange={this.handleInputFieldChange} value={this.state.t_descr} />
              </div>
              <button
                className="px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200 mb-[20px]"
                onClick={this.save_cards}
              >
                Update
              </button>
            </div>

            <div id="main" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

              <div className="w-full border border-gray-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center justify-center p-10">
                  <button
                    className="px-5 py-2.5 text-sm font-medium text-center text-white bg-[#374557] rounded-lg focus:ring-4 duration-300 hover:bg-[#27313e] focus:ring-blue-200 mb-[20px]"
                    onClick={this.add_teacher}
                  >Add</button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default T_instructor;
