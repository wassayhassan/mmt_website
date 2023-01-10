import React, { Component, createElement } from "react";
import UserAddPanel from './user_add_panel';
import axios from "axios";
import { BASELINE } from "../util/index";

import "../App.css";
class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_lst: [],
      search: ""
    };
    this.UserAddPanel = React.createRef()
    this.create_body_user = this.create_body_user.bind(this);
    this.get_all_user_data = this.get_all_user_data.bind(this);
    this.show_search = this.show_search.bind(this);
    this.edit_profile = this.edit_profile.bind(this);
    this.sort_table = this.sort_table.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.search_user = this.search_user.bind(this);
  }

  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.search_user()
  }

  sort_table(id) {
    var selected = [];
    var main = document.getElementById("user_body");
    main.innerHTML = '';

    if (id == "1") {
      for (let i = 0; i < this.state.user_lst.name.length; i++) {
        this.create_body_user(this.state.user_lst.id[i], this.state.user_lst.name[i], this.state.user_lst.email[i], this.state.user_lst.status[i], this.state.user_lst.Role[i], this.state.user_lst.invoice[i]);
      }
    }
    else if (id == "2") { //parents
      for (let i = 0; i < this.state.user_lst.name.length; i++) {
        if (this.state.user_lst.Role[i] == "parents") {
          this.create_body_user(this.state.user_lst.id[i], this.state.user_lst.name[i], this.state.user_lst.email[i], this.state.user_lst.status[i], this.state.user_lst.Role[i], this.state.user_lst.invoice[i]);
        }
      }
    }
    else if (id == "3") { //student
      for (let i = 0; i < this.state.user_lst.name.length; i++) {
        if (this.state.user_lst.Role[i] == "student") {
          this.create_body_user(this.state.user_lst.id[i], this.state.user_lst.name[i], this.state.user_lst.email[i], this.state.user_lst.status[i], this.state.user_lst.Role[i], this.state.user_lst.invoice[i]);
        }
      }
    }
    else if (id == "4") { //customer
      for (let i = 0; i < this.state.user_lst.name.length; i++) {
        if (this.state.user_lst.Role[i] == "customer") {
          this.create_body_user(this.state.user_lst.id[i], this.state.user_lst.name[i], this.state.user_lst.email[i], this.state.user_lst.status[i], this.state.user_lst.Role[i], this.state.user_lst.invoice[i]);
        }
      }
    }
    else if (id == "5") { //Teacher
      for (let i = 0; i < this.state.user_lst.name.length; i++) {
        if (this.state.user_lst.Role[i] == "Teacher") {
          this.create_body_user(this.state.user_lst.id[i], this.state.user_lst.name[i], this.state.user_lst.email[i], this.state.user_lst.status[i], this.state.user_lst.Role[i], this.state.user_lst.invoice[i]);
        }
      }
    }


    var main = document.getElementById("searchlst");
    main.className = "hidden absolute top-full left-0 sm:-left-2/4 z-10 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-md";
  }

  async edit_profile(id) {
    this.UserAddPanel.current.get_by_id(id);
  }

  async get_all_user_data() {
    var self = this;
    axios.get(BASELINE+"user/get/info/member/all", [])
      .then(function (response) {
        //Insert the data here
        self.setState({ user_lst: response.data });
        self.state.user_lst = response.data;

        var main = document.getElementById("user_body");
        main.innerHTML = '';
        for (let i = 0; i < response.data.name.length; i++) {
          self.create_body_user(response.data.id[i], response.data.name[i], response.data.email[i], response.data.status[i], response.data.Role[i], response.data.invoice[i]);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  create_body_user(id, name, email, status, role, invoice) {
    var main = document.getElementById("user_body");
    var main_tr = document.createElement("tr");
    main_tr.className = "bg-white border-b text-center";

    var main_th = document.createElement("th");
    main_th.scope = "row";
    main_th.className = "py-2 px-6 font-medium text-gray-900 whitespace-nowrap underline cursor-pointer";
    main_th.addEventListener("click", (event) => {
      this.edit_profile(id);
    });

    main_th.innerText = name;

    var td1 = document.createElement("td");
    td1.className = "py-2 px-6";
    td1.innerText = email;

    var td2 = document.createElement("td");
    td2.className = "py-2 px-6";
    td2.innerText = status;

    var td3 = document.createElement("td");
    td3.className = "py-2 px-6";
    td3.innerText = role;

    var td4 = document.createElement("td");
    td4.className = "py-2 px-6";
    td4.innerText = invoice;

    main_tr.appendChild(main_th);
    main_tr.appendChild(td1);
    main_tr.appendChild(td2);
    main_tr.appendChild(td3);
    main_tr.appendChild(td4);
    main.appendChild(main_tr);
    this.UserAddPanel.current.reset_val();
  }

  show_search() {
    var main = document.getElementById("searchlst");
    if (main.className == "absolute top-full left-0 sm:-left-2/4 z-10 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-md") {
      main.className = "hidden absolute top-full left-0 sm:-left-2/4 z-10 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-md";
    } else {
      main.className = "absolute top-full left-0 sm:-left-2/4 z-10 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-md";
    }
  }

  componentDidMount() {
    this.get_all_user_data();
  }

  search_user() {
    var main = document.getElementById("user_body");
    var tr = main.getElementsByTagName("tr");
    var input = document.getElementById("default-input").value.toUpperCase();;

    for (let i = 0; i < tr.length; i++) {
      let name = tr[i].getElementsByTagName("th")[0].innerText.toUpperCase();

      if (name) {
        if (name.indexOf(input) > -1) {
          tr[i].className = "bg-white border-b text-center";
        } else {
          tr[i].className = "hidden bg-white border-b text-center";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <section>
          <div className="container bg-white mx-auto rounded-2xl mt-14">
            <div className="">
              <div
                className="flex gap-5 text-xl text-white font-semibold bg-[#374151] p-2 rounded-tl-2xl rounded-tr-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"
                    fill="rgba(255,255,255,1)" />
                </svg>
                <span>Students</span>
              </div>

              <div className="pl-4 pr-4 p-2 ">
                <div
                  className="flex justify-between flex-col md:flex-row my-2 mb-8 py-2 px-5 mx-auto shadow-md rounded-2xl">
                  <div className=" flex gap-5 justify-center">
                    <button className=" flex flex-col items-center cursor-pointer" onClick={() => this.UserAddPanel.current.closepanel("on")}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="font-bold" viewBox="0 0 24 24"
                        width="30" height="30">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="rgba(77,192,104,1)" />
                      </svg>
                      <span className="font-semibold text-sm">Add User</span>
                    </button>
                    <div className=" flex flex-col items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z"
                          fill="rgba(249,164,41,1)" />
                      </svg>
                      <span className="font-semibold text-sm">[notworking] Messaging</span>
                    </div>
                    <div className="relative hidden">
                      <div data-active-student="" className="flex flex-col items-center cursor-pointer ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox=" 0 0 24 24" width="24"
                          height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
                            fill="rgba(77,192,104,1)" />
                        </svg>

                        <div className="flex gap-1.5 font-semibold items-center cursor-pointer ">
                          <span className="text-sm">Active</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28"
                            height="28">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 16l-6-6h12z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="flex gap-5 sm:gap-5 justify-center items-center">
                    <div data-active-student="" className=" flex flex-col items-center">
                      <div data-student-active="" className="relative">
                        <div className="flex flex-col items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
                              fill="rgba(77,192,104,1)" />
                          </svg>

                          <button onClick={() => this.show_search()} className="flex gap-1 font-semibold items-center cursor-pointer">
                            <span className="text-sm">All</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28"
                              height="28">
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M12 16l-6-6h12z" />
                            </svg>
                          </button>
                        </div>
                        <ul data-student-dropdoun=""
                          id="searchlst"
                          className="hidden absolute top-full left-0 sm:-left-2/4 z-10 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-md">
                          <li onClick={() => this.sort_table(1)}
                            className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center pl-3">
                              <label htmlFor="students-checkbox"
                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">All</label>
                            </div>
                          </li>
                          <li onClick={() => this.sort_table(2)}
                            className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center pl-3">
                              <label htmlFor="students-checkbox"
                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">Parents</label>
                            </div>
                          </li>
                          <li onClick={() => this.sort_table(3)}
                            className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center pl-3">
                              <label htmlFor="parents-checkbox"
                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">Students</label>
                            </div>
                          </li>
                          <li onClick={() => this.sort_table(4)}
                            className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center pl-3">
                              <label htmlFor="customer-checkbox"
                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">Customers</label>
                            </div>
                          </li>
                          <li onClick={() => this.sort_table(5)}
                            className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                            <div className="flex items-center pl-3">
                              <label htmlFor="teacher-checkbox"
                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">Teachers</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <input type="text" id="default-input"
                        placeholder="Search by Name..."
                        name="search"
                        onChange={this.handleInputFieldChange}
                        className="block p-2 pl-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button onClick={this.search_user}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer mt-5 md:mt-0"
                        viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                          fill="rgba(149,164,166,1)" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="overflow-x-auto relative shadow-lg sm:rounded-2xl">
                    <table className="w-full text-l text-left text-gray-900 font-semibold">
                      <thead className="text-base text-white uppercase bg-[#374151]">
                        <tr className="text-center">
                          <th scope="col" className="py-3 px-6">
                            Name
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Email
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Status
                          </th>
                          <th scope="col" className="py-3 px-6">
                            Role
                          </th>
                          <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody id="user_body">

                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              <div className=" flex justify-end mb-14 p-4 hidden">

                <div aria-label="Page">
                  <ul className="inline-flex items-center -space-x-px">
                    <li>
                      <a href="#"
                        className="block py-2  ml-0 leading-tight bg-white rounded-l-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36"
                          height="36">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M8 12l6-6v12z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        className="py-2 px-3 w-9 h-9 leading-tight bg-white  text-xl font-semibold">1</a>
                    </li>
                    <li>
                      <a href="#" className="py-2 px-3 leading-tight bg-white  text-xl font-semibold">2</a>
                    </li>
                    <li>
                      <a href="#" aria-current="page"
                        className="z-10 py-2 px-3 leading-tight text-xl font-semibold bg-white">3</a>
                    </li>
                    <li>
                      <a href="#" className="py-2 px-3 leading-tight bg-white  text-xl font-semibold">4</a>
                    </li>
                    <li>
                      <a href="#" className="py-2 px-3 leading-tight bg-white  text-xl font-semibold">5</a>
                    </li>
                    <li>
                      <a href="#" className="block py-2  leading-tight bg-white rounded-r-lg ">
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36"
                          height="36">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M16 12l-6 6V6z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>
        <UserAddPanel
          ref={this.UserAddPanel}
          create_body_user={this.create_body_user}
          get_all_user_data={this.get_all_user_data}
        />
      </div>
    );
  }
}

export default UserManagement;
