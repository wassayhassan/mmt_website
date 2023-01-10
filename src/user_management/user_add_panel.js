import React, { Component, createElement } from "react";
import axios from "axios";
import { BASELINE } from "../util/index";

import "../App.css";
import { doc } from "prettier";
import { min } from "moment";
import * as e from "cors";
class UserAddPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regiform: "0",
            updateview: "0",
            role: "customer",
            firstName: '',
            lastName: '',
            status: '',
            phoneNumber: '',
            address: '',
            zip: '',
            email: '',
            roles: [
                { "id": "customer", "name": "Customer" },
                { "id": "student", "name": "Student" },
                { "id": "parents", "name": "Parents" },
                { "id": "Teacher", "name": "Teacher" }
            ],
            statusList: [
                { "id": "active", "name": "Active" },
                { "id": "deactivate", "name": "deactivate" },
                { "id": "wl", "name": "Waiting list" },
                { "id": "ta", "name": "Teacher Assistants" },
                { "id": "training", "name": "Training" }
            ],

            //second page states
            birthday: '',
            age: null,
            gender: '',
            noOfChild: null,
            emergencyContactName1: '',
            emergencyContactName2: '',
            emergencyContactNo1: '',
            emergencyContactNo2: '',
            notes: '',
            genderList: [
                { "id": "m", "name": "Male" },
                { "id": "f", "name": "Female" },
                { "id": "etc", "name": "Others" }
            ],
            school: '',
            college: '',
            graduate_date: '',
            graduate_college: '',
            grade: '',
            expectedGraduate: '',
            uid: '',
            child_search: '',
            child_list: []
        };
        this.send_data_to_server = this.send_data_to_server.bind(this);
        this.reset_val = this.reset_val.bind(this);
        this.send_update_data = this.send_update_data.bind(this);
        this.closepanel = this.closepanel.bind(this);
        this.get_by_id = this.get_by_id.bind(this);
        this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
        this.change_form = this.change_form.bind(this);
        this.set_user_role = this.set_user_role.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.search_name = this.search_name.bind(this);
        this.add_child = this.add_child.bind(this);
        this.preload_add_child = this.preload_add_child.bind(this);
    }

    set_user_role = (e) => {
        this.setState({ role: e.target.value });
        this.state.role = e.target.value;
    }

    change_form = (e) => {
        this.setState({ regiform: e.target.value });
    };


    handleInputFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add_child(id, name) {
        var main = document.getElementById("list_child");

        var minus = document.createElement("button");
        minus.innerText = "X";
        minus.className = "mr-[4px]";
        minus.id = "child_x" + id;
        minus.value = id;
        var input = document.createElement("input");
        input.className = "mr-[5px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        input.id = "child_" + id;
        input.value = name;
        input.readOnly = true;

        minus.addEventListener("click", (event) => {
            var rex = document.getElementById("child_x" + id);
            rex.parentNode.removeChild(rex);

            var rei = document.getElementById("child_" + id);
            rei.parentNode.removeChild(rei);

            this.setState({
                child_list: this.state.child_list.filter((id) => id !== id)
            });
        });

        main.appendChild(minus);
        main.appendChild(input);
    }

    preload_add_child() {
        var self = this;
        for (let i = 0; i < this.state.child_list.length; i++) {
            var data = { uid: this.state.child_list[i].uid }
            axios.post(BASELINE + "user/get/info/member/id", data)
                .then(function (response) {
                    var name = response.data.info.Fname + ", " + response.data.info.Lname;
                    self.add_child(data.uid, name);
                })
                .catch(function (error) {
                    alert(error);
                });

        }
    }

    search_name(e) {
        this.setState({ [e.target.name]: e.target.value });
        var data = { "child_search": e.target.value };

        var self = this;
        axios.post(BASELINE + "search/child/by/name", data).then(function (response) {
            var main = document.getElementById("dropdown");
            main.innerHTML = "";
            var ul = document.createElement("ul");
            ul.className = "py-1 text-sm text-gray-700 dark:text-gray-200";
            ul.arialabel = "dropdownDefault";
            for (let i = 0; i < response.data.uid.length; i++) {
                var li = document.createElement("li");
                var alink = document.createElement("a");
                alink.className = "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
                alink.innerText = response.data.Fname[i] + ", " + response.data.Lname[i] + " | " + response.data.role[i];
                alink.id = response.data.uid[i];
                alink.addEventListener("click", (event) => {
                    var uid = event.target.id;
                    self.setState({ child_list: [...self.state.child_list, {"uid": uid}] });
                    self.add_child(uid, response.data.Fname[i] + ", " + response.data.Lname[i]);
                });

                li.appendChild(alink);
                ul.appendChild(li);
            }
            main.appendChild(ul);

            if (e.target.value == "") {
                var main = document.getElementById("dropdown");
                main.innerHTML = "";
            }

        }).catch(function (error) {
            alert(error);
        });
    }


    closepanel(bol) {
        var main = document.getElementById("modal");
        if (bol == "on") {
            main.className = "relative flex justify-center items-center";
        } else {
            main.className = "relative flex justify-center items-center hidden";
            this.setState({ regiform: "0" });
            this.reset_val();
        }
    }

    async send_update_data() {
        let { firstName, lastName, role, status, phoneNumber, address, zip, email,
            birthday, age, gender, emergencyContactName1, emergencyContactNo1, emergencyContactName2, emergencyContactNo2, notes,
            school, grade, expectedGraduate, noOfChild, uid, college, graduate_date, graduate_college, child_list
        } = this.state;

        var data = {
            "uid": uid,
            "firstName": firstName,
            "lastName": lastName,
            "role": role,
            "status": status,
            "phoneNumber": phoneNumber,
            "address": address,
            "zip": zip,
            "email": email,
            "birthday": birthday,
            "age": age,
            "gender": gender,
            "emergencyContactName1": emergencyContactName1,
            "emergencyContactNo1": emergencyContactNo1,
            "emergencyContactName2": emergencyContactName2,
            "emergencyContactNo2": emergencyContactNo2,
            "notes": notes,
            "school": school,
            "grade": grade,
            "expectedGraduate": expectedGraduate,
            "noOfChild": noOfChild,
            "college": college,
            "graduate_date": graduate_date,
            "graduate_college": graduate_college,
            "child_list": JSON.stringify(child_list)
        }

        var self = this;
        axios.post(BASELINE + "user/update/info/member/id", data)
            .then(function (response) {
                self.closepanel("off");
                alert("Successfully update the user information.");
                self.props.get_all_user_data();
            })
            .catch(function (error) {
                alert(error);
            });
        this.reset_val();
    };

    async send_data_to_server() {
        let { firstName, lastName, role, status, phoneNumber, address, zip, email,
            birthday, age, gender, emergencyContactName1, emergencyContactNo1, emergencyContactName2, emergencyContactNo2, notes,
            school, grade, expectedGraduate, noOfChild, college, graduate_date, graduate_college, child_list
        } = this.state;

        var data = {
            "firstName": firstName,
            "lastName": lastName,
            "role": role,
            "status": status,
            "phoneNumber": phoneNumber,
            "address": address,
            "zip": zip,
            "email": email,
            "birthday": birthday,
            "age": age,
            "gender": gender,
            "emergencyContactName1": emergencyContactName1,
            "emergencyContactNo1": emergencyContactNo1,
            "emergencyContactName2": emergencyContactName2,
            "emergencyContactNo2": emergencyContactNo2,
            "notes": notes,
            "school": school,
            "grade": grade,
            "expectedGraduate": expectedGraduate,
            "noOfChild": noOfChild,
            "college": college,
            "graduate_date": graduate_date,
            "graduate_college": graduate_college,
            "child_list": JSON.stringify(child_list)
        }

        var self = this;
        axios.post(BASELINE + "user/add/info/manually", data)
            .then(function (response) {
                self.props.create_body_user(response.data.id, response.data.name, response.data.email, response.data.status, response.data.role, response.data.invoice);
            })
            .catch(function (error) {
                alert(error);
            });
    };

    async get_by_id(id) {
        var self = this;
        this.state.uid = id;
        this.setState({ uid: id });
        var data = {
            "uid": id
        }
        axios.post(BASELINE + "user/get/info/member/id", data)
            .then(function (response) {
                self.reset_val();
                self.setState({ regiform: "0" });
                self.setState({ updateview: "1" });
                self.setState({ email: response.data.info.email });
                self.setState({ birthday: response.data.info.birthday });
                self.setState({ role: response.data.info.Role });
                self.setState({ firstName: response.data.info.Fname });
                self.setState({ lastName: response.data.info.Lname });
                self.setState({ status: response.data.info.status });
                self.setState({ phoneNumber: response.data.info.Pnumber });
                self.setState({ address: response.data.info.Address });
                self.setState({ zip: response.data.info.Zip });
                self.setState({ age: response.data.info.age });
                self.setState({ gender: response.data.info.gender });
                self.setState({ noOfChild: response.data.info.numofchild });
                self.setState({ invoice: response.data.info.invoice });
                self.setState({ emergencyContactName1: response.data.info.emergency_1_n });
                self.setState({ emergencyContactName2: response.data.info.emergency_2_n });
                self.setState({ emergencyContactNo1: response.data.info.emergency_1_p });
                self.setState({ emergencyContactNo2: response.data.info.emergency_2_p });
                self.setState({ notes: response.data.info.note });
                self.setState({ school: response.data.info.school });
                self.setState({ grade: response.data.info.grade });
                self.setState({ expectedGraduate: response.data.info.expected_grad });
                self.setState({ college: response.data.info.college });
                self.setState({ graduate_date: response.data.info.graduate_date });
                self.setState({ graduate_college: response.data.info.graduate_college });
                if (response.data.info.child_list != "") {
                    self.setState({ child_list: JSON.parse(response.data.info.child_list) });
                }
                self.closepanel("on");

            })
            .catch(function (error) {
                alert(error);
            });
    }

    handleDropdownChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    reset_val() {
        this.setState({ regiform: "0" });
        this.setState({ updateview: "0" });
        this.setState({ role: "customer" });
        this.setState({ firstName: '' });
        this.setState({ lastName: '' });
        this.setState({ status: '' });
        this.setState({ phoneNumber: '' });
        this.setState({ address: '' });
        this.setState({ zip: '' });
        this.setState({ age: null });
        this.setState({ gender: '' });
        this.setState({ noOfChild: null });
        this.setState({ emergencyContactName1: '' });
        this.setState({ emergencyContactName2: '' });
        this.setState({ emergencyContactNo1: '' });
        this.setState({ emergencyContactNo2: '' });
        this.setState({ notes: '' });
        this.setState({ school: '' });
        this.setState({ grade: '' });
        this.setState({ college: '' });
        this.setState({ graduate_date: '' });
        this.setState({ graduate_college: '' });
        this.setState({ child_list: [] });
        this.setState({ email: '' });
        this.setState({ child_search: '' });

        var main = document.getElementById("modal");
        main.className = "relative flex justify-center items-center hidden";
    }

    render() {
        let { firstName, lastName, role, status, phoneNumber, address, zip, email, roles, statusList,
            birthday, age, gender, noOfChild, emergencyContactName1, emergencyContactName2, emergencyContactNo1, emergencyContactNo2, notes, genderList,
            school, grade, expectedGraduate, college, graduate_date, graduate_college, child_search, child_list
        } = this.state;

        return (
            <div className="relative flex justify-center items-center hidden" id="modal">
                <div id="menu" className="left-0 w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
                    <div className="2xl:container 2xl:mx-auto py-28 px-4 md:px-28 flex justify-center items-center">
                        <div className=" dark:bg-gray-800 relative justify-center items-center bg-white md:rounded-t-3xl rounded-t-xl">
                            <h1 className='w-full bg-[#374557] text-white md:px-12 px-2 md:rounded-t-2xl rounded-t-xl py-4 font-bold'>Add User</h1>
                            {this.state.regiform === "0" && (
                                <div className="rounded-xl md:py-4 md:px-10 overflow-auto" style={{ height: "700px" }}>

                                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                        <div>
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                            <input type="text" id="first_name" name="firstName" onChange={this.handleInputFieldChange} value={firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sean" required />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                            <input type="text" id="last_name" name="lastName" onChange={this.handleInputFieldChange} value={lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kim" required />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
                                            <div>
                                                <select
                                                    id="countries"
                                                    name="role"
                                                    // onClick={this.set_user_role}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
                                                    value={role}
                                                    onChange={this.handleDropdownChange}
                                                >
                                                    <option defaultValue>Choose a status</option>
                                                    {roles.map((el, i) =>
                                                        <option key={el.id} name={el.id} id={i} value={el.id}>
                                                            {el.name}
                                                        </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                            <div>
                                                <select
                                                    id="countries"
                                                    name="status"
                                                    value={status}
                                                    onChange={this.handleDropdownChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
                                                >
                                                    <option defaultValue>Choose a status</option>
                                                    {statusList.map((el, i) =>
                                                        <option key={el.id} name={el.id} id={i} value={el.id}>
                                                            {el.name}
                                                        </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                                            <input type="tel" id="phone" name="phoneNumber" onChange={this.handleInputFieldChange} value={phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                                            <input type="address" id="address" name="address" onChange={this.handleInputFieldChange} value={address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
                                            <input type="number" id="visitors" name="zip" onChange={this.handleInputFieldChange} value={zip} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="97229" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                        <input type="email" id="email" name="email" onChange={this.handleInputFieldChange} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="seank@mmtprep.com" required />
                                    </div>

                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="1" onClick={this.change_form}
                                    >Next</button>
                                </div>
                            )
                            }
                            {this.state.regiform === "1" && this.state.role === "student" && (
                                <div className="rounded-xl md:py-4 md:px-10 overflow-auto" style={{ height: "700px" }}>
                                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birthday</label>
                                            <input type="date" id="visitors" name="birthday" onChange={this.handleInputFieldChange} value={birthday} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="03/04/1999" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Age</label>
                                            <input type="number" id="visitors" name="age" onChange={this.handleInputFieldChange} value={age} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">School</label>
                                            <input type="text" id="visitors" name="school" onChange={this.handleInputFieldChange} value={school} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Grade</label>
                                            <input type="text" id="visitors" name="grade" onChange={this.handleInputFieldChange} value={grade} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expected Graduate</label>
                                            <input type="text" id="visitors" name="expectedGraduate" onChange={this.handleInputFieldChange} value={expectedGraduate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                            <div>
                                                <select
                                                    id="countries"
                                                    name="gender"
                                                    value={gender}
                                                    onChange={this.handleDropdownChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
                                                >
                                                    <option defaultValue>Choose a gender</option>
                                                    {genderList.map((el, i) =>
                                                        <option key={el.id} name={el.id} id={i} value={el.id}>
                                                            {el.name}
                                                        </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 1</label>
                                            <input type="address" id="address" name="emergencyContactName1" onChange={this.handleInputFieldChange} value={emergencyContactName1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 1</label>
                                            <input type="tel" id="phone" name="emergencyContactNo1" onChange={this.handleInputFieldChange} value={emergencyContactNo1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 2</label>
                                            <input type="address" id="address" name="emergencyContactName2" onChange={this.handleInputFieldChange} value={emergencyContactName2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 2</label>
                                            <input type="tel" id="phone" name="emergencyContactNo2" onChange={this.handleInputFieldChange} value={emergencyContactNo2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Note</label>
                                        <textarea rows="4" type="text" id="email" name="notes" onChange={this.handleInputFieldChange} value={notes} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>

                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="0" onClick={this.change_form} readOnly
                                    >Back</button>
                                    <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="2" onClick={this.change_form} readOnly
                                    >Review</button>
                                </div>
                            )}

                            {this.state.regiform === "1" && (this.state.role === "parents" || this.state.role === "customer") && (
                                <div className="rounded-xl md:py-4 md:px-10 overflow-auto" style={{ height: "700px" }}>
                                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birthday</label>
                                            <input type="date" id="visitors" name="birthday" onChange={this.handleInputFieldChange} value={birthday} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="03/04/1999" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Age</label>
                                            <input type="number" id="visitors" name="age" onChange={this.handleInputFieldChange} value={age} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                            <div>
                                                <select
                                                    id="countries"
                                                    name="gender"
                                                    value={gender}
                                                    onChange={this.handleDropdownChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
                                                >
                                                    <option defaultValue>Choose a gender</option>
                                                    {genderList.map((el, i) =>
                                                        <option key={el.id} name={el.id} id={i} value={el.id} >
                                                            {el.name}
                                                        </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of child</label>
                                            <input type="number" id="visitors" name="noOfChild" onChange={this.handleInputFieldChange} value={noOfChild} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 1</label>
                                            <input type="address" id="address" name="emergencyContactName1" onChange={this.handleInputFieldChange} value={emergencyContactName1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 1</label>
                                            <input type="tel" id="phone" name="emergencyContactNo1" onChange={this.handleInputFieldChange} value={emergencyContactNo1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 2</label>
                                            <input type="address" id="address" name="emergencyContactName2" onChange={this.handleInputFieldChange} value={emergencyContactName2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 2</label>
                                            <input type="tel" id="phone" name="emergencyContactNo2" onChange={this.handleInputFieldChange} value={emergencyContactNo2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label onClick={this.preload_add_child} htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Child (click to refresh*)</label>
                                        <div className='md:grid grid-cols-2 py-2 text-[#374557]'>
                                            <div id="list_child" className='grid-cols-1 pl-2 md:pr-44 pr-0 flex'>

                                            </div>
                                        </div>
                                        <div className='md:grid grid-cols-2 py-2 text-[#374557]'>
                                            <div className='grid-cols-1 pl-2 md:pr-44 pr-0 flex'>
                                                <input
                                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                    placeholder='search by first name' name="child_search" value={child_search} onChange={this.search_name}
                                                />
                                            </div>
                                        </div>
                                        <div id="dropdown" className="ml-2 z-10 w-[200px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">

                                        </div>

                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Note</label>
                                        <textarea rows="4" type="text" id="email" name="notes" onChange={this.handleInputFieldChange} value={notes} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>

                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="0" onClick={this.change_form}
                                    >Back</button>
                                    <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="2" onClick={this.change_form}
                                    >Review</button>
                                </div>
                            )}
                            {this.state.regiform === "1" && this.state.role === "Teacher" && (
                                <div className="rounded-xl md:py-4 md:px-10 overflow-auto" style={{ height: "700px" }}>
                                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birthday</label>
                                            <input type="date" id="visitors" name="birthday" onChange={this.handleInputFieldChange} value={birthday} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="03/04/1999" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Age</label>
                                            <input type="number" id="visitors" name="age" onChange={this.handleInputFieldChange} value={age} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">College</label>
                                            <input type="text" id="visitors" name="college" onChange={this.handleInputFieldChange} value={college} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gradudate Date</label>
                                            <input type="text" id="visitors" name="graduate_date" onChange={this.handleInputFieldChange} value={graduate_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Graduate College</label>
                                            <input type="text" id="visitors" name="graduate_college" onChange={this.handleInputFieldChange} value={graduate_college} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                            <div>
                                                <select
                                                    id="countries"
                                                    name="gender"
                                                    value={gender}
                                                    onChange={this.handleDropdownChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-5000"
                                                >
                                                    <option defaultValue>Choose a gender</option>
                                                    {genderList.map((el, i) =>
                                                        <option key={el.id} name={el.id} id={i} value={el.id}>
                                                            {el.name}
                                                        </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 1</label>
                                            <input type="address" id="address" name="emergencyContactName1" onChange={this.handleInputFieldChange} value={emergencyContactName1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 1</label>
                                            <input type="tel" id="phone" name="emergencyContactNo1" onChange={this.handleInputFieldChange} value={emergencyContactNo1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                        <div>
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Name 2</label>
                                            <input type="address" id="address" name="emergencyContactName2" onChange={this.handleInputFieldChange} value={emergencyContactName2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="15160 NW Laidlaw Rd Suite 116, Portland, OR" required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emergency Contact: Phone number 2</label>
                                            <input type="tel" id="phone" name="emergencyContactNo2" onChange={this.handleInputFieldChange} value={emergencyContactNo2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Note</label>
                                        <textarea rows="4" type="text" id="email" name="notes" onChange={this.handleInputFieldChange} value={notes} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>

                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="0" onClick={this.change_form} readOnly
                                    >Back</button>
                                    <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="2" onClick={this.change_form} readOnly
                                    >Review</button>
                                </div>
                            )}
                            {this.state.regiform === "2" && this.state.role === "student" && (
                                <div className="rounded-xl md:py-4 md:px-10">
                                    <h1>Final Review</h1>
                                    <div className="mb-6 text-sm font-medium text-gray-900 dark:text-gray-300" style={{ width: "600px" }}>
                                        First Name:
                                        <input
                                            type="text"
                                            className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                            value={this.state.firstName}
                                            readOnly
                                        /><br />


                                        Last Name:
                                        <input
                                            type="text"
                                            className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                            value={this.state.lastName}
                                            readOnly
                                        /><br />

                                        Email: {this.state.email}<br />
                                        Gender: {this.state.gender}<br />
                                        Age: {this.state.age}<br />
                                        Birthday: {this.state.birthday}<br /><br />
                                        Role: {this.state.role}<br />
                                        School: {this.state.school}<br />
                                        Grade: {this.state.grade}<br />
                                        Expected Graduate: {this.state.expectedGraduate}<br /><br />

                                        Address: {this.state.address}<br />
                                        Zip Code: {this.state.zip}<br />
                                        Phone Number: {this.state.phoneNumber}<br />

                                        Emergency Contact 1: {this.state.emergencyContactName1} {this.state.emergencyContactNo1}<br />
                                        Emergency Contact 2: {this.state.emergencyContactName2} {this.state.emergencyContactNo2}<br />
                                    </div>
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="1" onClick={this.change_form}
                                    >Back</button>
                                    {this.state.updateview === "0" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_data_to_server}
                                        >Submit</button>
                                    )}
                                    {this.state.updateview === "1" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_update_data}
                                        >Update</button>
                                    )}
                                </div>
                            )}
                            {this.state.regiform === "2" && (this.state.role === "parents" || this.state.role === "customer") && (
                                <div className="rounded-xl md:py-4 md:px-14 min-w-[1200px]">
                                    <h1>Final Review</h1>
                                    First Name:
                                    <input
                                        type="text"
                                        className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                        value={this.state.firstName}
                                        readOnly
                                    /><br />


                                    Last Name:
                                    <input
                                        type="text"
                                        className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                        value={this.state.lastName}
                                        readOnly
                                    /><br />
                                    Email: {this.state.email}<br />
                                    Gender: {this.state.gender}<br />
                                    Age: {this.state.age}<br />
                                    Birthday: {this.state.birthday}<br /><br />
                                    Role: {this.state.role}<br />
                                    School: {this.state.school}<br />
                                    Grade: {this.state.grade}<br />
                                    Expected Graduate: {this.state.expectedGraduate}<br /><br />

                                    Address: {this.state.address}<br />
                                    Zip Code: {this.state.zip}<br />
                                    Phone Number: {this.state.phoneNumber}<br />

                                    Emergency Contact 1: {this.state.emergencyContactName1} {this.state.emergencyContactNo1}<br />
                                    Emergency Contact 2: {this.state.emergencyContactName2} {this.state.emergencyContactNo2}<br />
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="1" onClick={this.change_form}
                                    >Back</button>
                                    {this.state.updateview === "0" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_data_to_server}
                                        >Submit</button>
                                    )}
                                    {this.state.updateview === "1" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_update_data}
                                        >Update</button>
                                    )}

                                </div>
                            )}
                            {this.state.regiform === "2" && this.state.role === "Teacher" && (
                                <div className="rounded-xl md:py-4 md:px-10">
                                    <h1>Final Review</h1>
                                    <div className="mb-6 text-sm font-medium text-gray-900 dark:text-gray-300" style={{ width: "600px" }}>
                                        First Name:
                                        <input
                                            type="text"
                                            className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                            value={this.state.firstName}
                                            readOnly
                                        /><br />


                                        Last Name:
                                        <input
                                            type="text"
                                            className='border border-[#374557] block rounded w-full p-2 text-[#969696] font-normal'
                                            value={this.state.lastName}
                                            readOnly
                                        /><br />

                                        Email: {this.state.email}<br />
                                        Gender: {this.state.gender}<br />
                                        Age: {this.state.age}<br />
                                        Birthday: {this.state.birthday}<br /><br />
                                        Role: {this.state.role}<br />
                                        College: {this.state.college}<br />
                                        Graduate Date: {this.state.graduate_date}<br />
                                        Graduate College: {this.state.graduate_college}<br /><br />

                                        Address: {this.state.address}<br />
                                        Zip Code: {this.state.zip}<br />
                                        Phone Number: {this.state.phoneNumber}<br />

                                        Emergency Contact 1: {this.state.emergencyContactName1} {this.state.emergencyContactNo1}<br />
                                        Emergency Contact 2: {this.state.emergencyContactName2} {this.state.emergencyContactNo2}<br />
                                    </div>
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        value="1" onClick={this.change_form}
                                    >Back</button>
                                    {this.state.updateview === "0" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_data_to_server}
                                        >Submit</button>
                                    )}
                                    {this.state.updateview === "1" && (
                                        <button className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={this.send_update_data}
                                        >Update</button>
                                    )}
                                </div>
                            )}

                            <button onClick={() => this.closepanel("off")} className="text-white dark:text-gray-400 absolute top-4 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserAddPanel;
