import React, { Component } from "react";
import { BASELINE } from "../../../util/index";
import axios from "axios";

class T_b_news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blst: [],
      img1: "https://cdn.devdojo.com/images/may2021/tails-blog-1.jpg",
      sub1: "",
      title1: "",
      img2: "",
      sub2: "",
      title2: "",
      img3: "",
      sub3: "",
      title3: ""
    };
    this.listarticle = this.listarticle.bind(this);
    this.onclickbtn = this.onclickbtn.bind(this);
    this.updatetitle = this.updatetitle.bind(this);
  }

  updatetitle(num, id) {
    var data = {
      'num': num,
      'aid': id
    }

    var self = this;
    axios.post(BASELINE + "blog/main/article/aid/get", { data }).then(function (response) {
      if (num == 1) {
        self.setState({ img1: response.data.img });
        self.setState({ sub1: response.data.sub });
        self.setState({ title1: response.data.title });
      }
      else if (num == 2) {
        self.setState({ img2: response.data.img });
        self.setState({ sub2: response.data.sub });
        self.setState({ title2: response.data.title });
      }
      else if (num == 3) {
        self.setState({ img3: response.data.img });
        self.setState({ sub3: response.data.sub });
        self.setState({ title3: response.data.title });
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  onclickbtn = (e) => {
    var main = document.getElementById(e.target.name);
    if (main.className == "hidden py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll") {
      main.className = "py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll";
    } else {
      main.className = "hidden py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll";
    }
  }

  listarticle() {
    for (let i = 1; i < 4; i++) {
      var main = document.getElementById("class" + i);
      var li = document.createElement("li");

      for (let j = 0; j < this.state.blst.aid.length; j++) {
        var alink = document.createElement("a");
        alink.className = "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
        alink.innerText = this.state.blst.subject[j] + " | " + this.state.blst.title[j];

        alink.addEventListener("click", (event) => {
          var self = this;
          var num = i;
          var data = {
            'num': i,
            'aid': this.state.blst.aid[j]
          }

          axios.post(BASELINE + "blog/main/article/aid/update", { data }).then(function (response) {
            self.updatetitle(num, self.state.blst.aid[j])
          }).catch(function (error) {
            alert(error);
          });

        });

        li.appendChild(alink);
      }
      main.appendChild(li);
    }
  }

  componentDidMount() {
    var self = this;
    axios.get(BASELINE + "blog/get/article/info", {}).then(function (response) {
      self.setState({ blst: response.data });
      self.state.blst = response.data;
      self.listarticle();
    }).catch(function (error) {
      alert(error);
    });

    axios.get(BASELINE + "blog/main/article/get", {}).then(function (response) {

      self.setState({ img1: response.data.img[0]});
      self.setState({ img2: response.data.img[1]});
      self.setState({ img3: response.data.img[2]});

      self.setState({ sub1: response.data.data[0].subject});
      self.setState({ sub2: response.data.data[1].subject});
      self.setState({ sub3: response.data.data[2].subject});

      self.setState({ title1: response.data.data[0].title});
      self.setState({ title2: response.data.data[1].title});
      self.setState({ title3: response.data.data[2].title});
    }).catch(function (error) {
      alert(error);
    });
    
  }

  render() {
    return (
      <div className="grid grid-cols-1 divide-y flex justify-start mt-[35px]">
        <div className="text-[#374557] text-[22px] font-[700]">
          Select main news articles
        </div>
        <section className="w-[100%] bg-white">
          <div className="max-w-5xl px-10 py-10 mx-auto xl:px-0">
            <ul className="flex flex-wrap -mx-2 overflow-hidden">
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <div className="relative flex items-end justify-center mx-2 overflow-hidden bg-gray-300 rounded-lg group h-96">
                  <img
                    src={this.state.img1}
                    className="absolute object-cover object-center w-full h-full transition duration-300 ease-out transform scale-100 group-hover:scale-105"
                  />
                  <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="relative z-20 p-5 text-left">
                    <span className="relative inline-block px-3 py-1 -ml-1 text-xs tracking-wide text-white uppercase">
                      <span className="absolute inset-0 transform -skew-x-6 bg-indigo-500"></span>
                      <span className="relative">{this.state.sub1}</span>
                    </span>
                    <h2 className="my-2 font-serif text-xl font-semibold text-white">
                    {this.state.title1}
                    </h2>
                  </div>
                </div>
              </li>
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <div className="relative flex items-end justify-center mx-2 overflow-hidden bg-gray-300 rounded-lg group h-96">
                  <img
                    src={this.state.img2}
                    className="absolute object-cover object-center w-full h-full transition duration-300 ease-out transform scale-100 group-hover:scale-105"
                  />

                  <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="relative z-20 p-5 text-left">
                    <span className="relative inline-block px-3 py-1 -ml-1 text-xs tracking-wide text-white uppercase">
                      <span className="absolute inset-0 transform -skew-x-6 bg-red-500"></span>
                      <span className="relative">{this.state.sub2}</span>
                    </span>
                    <h2 className="my-2 font-serif text-xl font-semibold text-white">
                    {this.state.title2}
                    </h2>
                  </div>
                </div>
              </li>
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <div className="relative flex items-end justify-center mx-2 overflow-hidden bg-gray-300 rounded-lg group h-96">
                  <img
                    src={this.state.img3}
                    className="absolute object-cover object-center w-full h-full transition duration-300 ease-out transform scale-100 group-hover:scale-105"
                  />
                  <div className="absolute z-10 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="relative z-20 p-5 text-left">
                    <span className="relative inline-block px-3 py-1 -ml-1 text-xs tracking-wide text-white uppercase">
                      <span className="absolute inset-0 transform -skew-x-6 bg-yellow-500"></span>
                      <span className="relative">{this.state.sub3}</span>
                    </span>
                    <h2 className="my-2 font-serif text-xl font-semibold text-white">
                    {this.state.title3}
                    </h2>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="max-w-5xl px-10 py-10 mx-auto xl:px-0 h-auto max-h-[300px]">
            <ul className="flex flex-wrap -mx-2">
              <li className="w-full px-2 my-2  md:w-1/3 lg:w-1/3 xl:w-1/3">
                <button id="dropdownDefault" name="class1" onClick={this.onclickbtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                  <ul id="class1" className="hidden py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll" >

                  </ul>
                </div>


              </li>
              <li className="w-full px-2 my-2 md:w-1/3 lg:w-1/3 xl:w-1/3">
                <button id="dropdownDefault" name="class2" onClick={this.onclickbtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                  <ul id="class2" className="hidden py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll" >

                  </ul>
                </div>
              </li>
              <li className="w-full px-2 my-2 md:w-1/3 lg:w-1/3 xl:w-1/3">
                <button id="dropdownDefault" name="class3" onClick={this.onclickbtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                  <ul id="class3" className="hidden py-1 text-sm text-gray-700 dark:text-gray-200 max-h-[300px] overflow-y-scroll" >

                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default T_b_news;
