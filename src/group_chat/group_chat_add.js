import React, { Component } from "react";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";
import { UserContext } from "../context/UserContext";

class GroupChatAdd extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            child_search: "",
            room_title: "",
            child_list: []
        };
        this.reset_val = this.reset_val.bind(this);
        this.send_room_data = this.send_room_data.bind(this);
        this.closepanel = this.closepanel.bind(this);
        this.search_name = this.search_name.bind(this);
        this.add_child = this.add_child.bind(this);
        this.handleInputFieldChange = this.handleInputFieldChange.bind(this);

    }

    reset_val() {
        this.setState({ child_list: [] });
        this.setState({ room_title: '' });
        this.setState({ child_search: '' });
    }

    send_room_data() {
        var data = {
            groupName: this.state.room_title,
            createdBy: this.props.user.uid,
            members: this.state.child_list
        }
        axios.post(`${BASELINE}conversation/`, data).then((res)=> {
            if(res.status === 200){
            
                const {user} = this.context;
                data.members.forEach((mem)=> {
                    if(mem === user.uid){
                        return;
                    }
                    this.props.socket.current.emit('newConversation', {...res.data, to: mem});
                })
                this.props.setConversations([ res.data, ...this.props.conversations]);
                this.props.setFilteredConversations([ res.data,...this.props.filteredConversations])
                this.props.setCurrentChat(res.data);
                this.closepanel();
            }
        })
    }

    handleInputFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closepanel() {
        var main = document.getElementById("modal");
        this.props.setAddOpen(false);

            main.className = "relative flex justify-center items-center hidden";
            this.setState({ regiform: "0" });
            this.reset_val();
        
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
                    if(self.state.child_list.includes(uid)){
                        return
                    }
                    self.setState({ child_list: [...self.state.child_list, uid ] });
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
    componentDidMount(){
        var main = document.getElementById("modal");
        if (this.props.addOpen == true) {
            main.className = "relative flex justify-center items-center";
        } else {
            main.className = "relative flex justify-center items-center hidden";
        }
    }
    componentDidUpdate(){
        var main = document.getElementById("modal");
        if (this.props.addOpen == true) {
            main.className = "relative flex justify-center items-center";
        } else {
            main.className = "relative flex justify-center items-center hidden";
        }
    }

    render() {
        let { child_search, room_title } = this.state;
        return (
            <div className="relative flex justify-center items-center hidden" id="modal">
                <div id="menu" className="left-0 w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
                    <div className="2xl:container 2xl:mx-auto py-28 px-4 md:px-28 flex justify-center items-center">
                        <div className=" dark:bg-gray-800 relative justify-center items-center bg-white md:rounded-t-3xl rounded-t-xl">
                            <h1 className='w-full bg-[#374557] text-white md:px-12 px-2 md:rounded-t-2xl rounded-t-xl py-4 font-bold'>Add Chat Room</h1>
                            <div className="rounded-xl md:py-4 md:px-10 overflow-auto">
                                <div className="grid gap-6 mb-6 lg:grid-cols-1">
                                    <div>
                                        <label htmlFor="room_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Room Title</label>
                                        <input type="text" id="room_title" name="room_title" onChange={this.handleInputFieldChange} value={room_title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="# Class 101" required />
                                    </div>
                                </div>

                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Participants</label>
                                <div className='md:grid grid-cols-2 py-2 text-[#374557]'>
                                    <div id="list_child" className='grid-cols-1 pl-2 md:pr-44 pr-0 flex'>

                                    </div>
                                </div>
                                <div className='md:grid grid-cols-2 py-2 text-[#374557]'>
                                    <div className='grid-cols-1 md:pr-44 pr-0 flex'>
                                        <input
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            placeholder='search by first name' name="child_search" value={child_search} onChange={this.search_name}
                                        />
                                    </div>
                                </div>
                                <div id="dropdown" className="ml-2 z-10 w-[200px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">

                                </div>

                                <button onClick={() => this.send_room_data()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Create</button>
                            </div>

                            <button onClick={() => this.closepanel()} className="text-white dark:text-gray-400 absolute top-4 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
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

export default GroupChatAdd;