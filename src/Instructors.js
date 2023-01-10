import React, { Component } from "react";
import { BASELINE } from "./util/index";
import axios from "axios";

class Instructors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            t_title: "",
            t_descr: ""
        };
        this.preload = this.preload.bind(this);
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
    
          var name = document.createElement("h2");
          name.className = "text-lg font-medium";
          name.innerText = ele[i].name;
    
          var role = document.createElement("p");
          role.className = "font-medium text-blue-500";
          role.innerText = ele[i].role;
    
          var desc = document.createElement("p");
          desc.className = "text-gray-400";
          desc.innerText = ele[i].desc;
    
          div2.appendChild(img);
          div2.appendChild(name);
          div2.appendChild(role);
          div2.appendChild(desc);
          div.appendChild(div2);
          main.appendChild(div);
        }
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
                <section className="w-full py-12 bg-white lg:py-24">
                    <div className="max-w-6xl px-12 mx-auto text-center">
                        <div className="space-y-12 md:text-center">
                            <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                                <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">{this.state.t_title}</h2>
                                <p className="text-xl text-gray-500">{this.state.t_descr}</p>
                            </div>
                        </div>
                        <div id="main" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Instructors;

