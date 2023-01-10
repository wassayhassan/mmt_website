import React, { Component } from "react";
import axios from "axios";

import "../../App.css";
import T_email from "./tools/t_email";
import T_b_news from "./tools/t_news";
import T_instructor from "./tools/t_instructor";
import T_testmonial from "./tools/t_testmonial";

class M_tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginstate: false,
      clicked: 0
    };
    this.setclicked = this.setclicked.bind(this);
  }

  setclicked(num) {
    console.log(num);
    this.setState({ clicked: num });
  }

  render() {
    return (
      <div className="container bg-white mx-auto rounded-2xl">
        <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
          <i className="fa-solid fa-book-open pl-5 pt-3"></i>
          <p className="text-2xl font-semibold ml-5 mt-1">Tools</p>
        </div>
        <div className="ml-[29px] mr-[29px]">
          {/* first navbar */}
          <div className="w-[100%] h-[50px] bg-[#374557] mt-[21px] rounded-2xl">
            <div className="flex justify-start items-center pl-[27px] space-x-12">
              <button className="text-[#FFFFFF] leading-[54px] text-[22px] font-[700]"
                onClick={() => this.setclicked(0)}>
                News
              </button>
              <button className="text-[#FFFFFF] leading-[54px] text-[22px] font-[700]"
                onClick={() => this.setclicked(1)}>
                Instructor
              </button>
              <button className="text-[#FFFFFF] leading-[54px] text-[22px] font-[700]"
                onClick={() => this.setclicked(2)}>
                Testimonial
              </button>
              <button className="text-[#FFFFFF] leading-[54px] text-[22px] font-[700]"
                onClick={() => this.setclicked(3)}>
                [notworking] Class
              </button>
              <button className="text-[#FFFFFF] leading-[54px] text-[22px] font-[700]"
                onClick={() => this.setclicked(4)}>
                [notworking] Email
              </button>
            </div>
          </div>
          {this.state.clicked == 0 &&
            <T_b_news />
          }
          {this.state.clicked == 1 &&
            <T_instructor />
          }
          {this.state.clicked == 2 &&
            <T_testmonial />
          }
          {this.state.clicked == 4 &&
            <T_email />
          }
        </div>
      </div>
    );
  }
}

export default M_tools;
