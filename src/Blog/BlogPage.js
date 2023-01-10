import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BASELINE } from "../util/index";
import axios from "axios";

import "../App.css";
import BlogContent from "./MainPage_BlogContent";

class BlogContents extends Component {
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
      title3: "",
      link1: "",
      link2: "",
      link3: ""
    };

  }

  componentDidMount() {
    var self = this;

    axios.get(BASELINE + "blog/main/article/get", {}).then(function (response) {

      self.setState({ img1: response.data.img[0] });
      self.setState({ img2: response.data.img[1] });
      self.setState({ img3: response.data.img[2] });

      self.setState({ sub1: response.data.data[0].subject });
      self.setState({ sub2: response.data.data[1].subject });
      self.setState({ sub3: response.data.data[2].subject });

      self.setState({ title1: response.data.data[0].title });
      self.setState({ title2: response.data.data[1].title });
      self.setState({ title3: response.data.data[2].title });

      self.setState({ link1: "/post/" + response.data.data[0].aid });
      self.setState({ link2: "/post/" + response.data.data[1].aid });
      self.setState({ link3: "/post/" + response.data.data[2].aid });
    }).catch(function (error) {
      alert(error);
    });

  }

  render() {
    return (
      <div>
        <section className="w-[100%] bg-white">
          <div className="max-w-5xl px-10 py-10 mx-auto xl:px-0">
            <ul className="flex flex-wrap -mx-2 overflow-hidden">
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <Link to={this.state.link1}>
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
                </Link>
              </li>
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <Link to={this.state.link2}>
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
                </Link>
              </li>
              <li className="w-full px-2 my-2 overflow-hidden md:w-1/3 lg:w-1/3 xl:w-1/3">
                <Link to={this.state.link3}>
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
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <BlogContent />
      </div>
    );
  }
}

export default BlogContents;
