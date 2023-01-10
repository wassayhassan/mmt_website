import React, { Component } from "react";
import M_calendar from "./m_Calender";
import axios from "axios";

import "../../App.css";

class M_home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container bg-white mx-auto rounded-2xl">
        <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
          <i className="fa-solid fa-book-open pl-5 pt-3"></i>
          <p className="text-2xl font-semibold ml-5 mt-1">Home</p>
        </div>
        {/* left side data */}
        <div className="flex     mt-2">
          {/* calender */}
          <div className="w-[80%]">
            <div className="h-[450px]  rounded-[16px] shadow-s shadow-black mb-1 bg-[#FDFDFD] w-[92%] ml-[40px] mt-[20px] flex justify-center items-center">
              <M_calendar style={{}} />
            </div>
            {/* after calender */}
            <div className="mt-[44px] ml-[40px] flex justify-between w-[92%]">
              <div className="shadow-2xl w-[45%] h-[430px] mb-[30px] bg-[#F5F5F5]  rounded-b-lg ">
                <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
                  <i className="fa-solid fa-book-open pl-5 pt-3"></i>
                  <p className="text-2xl font-semibold ml-1 mt-1">Invoice</p>
                </div>
                <table className="w-[100%] text-start">
                  <tr className="border-[#000000] border-b-[1px]  font-[700] text-[18px] text-[#000000] leading-[27px]">
                    <th className="pt-[16px] pb-[10px] text-center ">parents</th>
                    <th className="pt-[16px] pb-[10px] text-center">
                      paid/wating
                    </th>
                    <th className="pt-[16px] pb-[10px] text-center">price</th>
                  </tr>
                  <tr className="border-[#000000] border-b-[1px]  font-[400] text-[16px] leading-[24px] text-[#000000]">
                    <td className="pt-[16px] pb-[10px] text-center">kim,angi</td>
                    <td className="pt-[16px] pb-[10px] text-center">paid</td>
                    <td className="pt-[16px] pb-[10px] text-center">$5000</td>
                  </tr>
                  <tr className="border-[#000000] border-b-[1px]  font-[400] text-[16px] leading-[24px] text-[#000000]">
                    <td className="pt-[16px] pb-[10px] text-center">kim,angi</td>
                    <td className="pt-[16px] pb-[10px] text-center">paid</td>
                    <td className="pt-[16px] pb-[10px] text-center">$5000</td>
                  </tr>
                  <tr className="border-[#000000] border-b-[1px]  font-[400] text-[16px] leading-[24px] text-[#000000]">
                    <td className="pt-[16px] pb-[10px] text-center">kim,angi</td>
                    <td className="pt-[16px] pb-[10px] text-center">paid</td>
                    <td className="pt-[16px] pb-[10px] text-center">$5000</td>
                  </tr>
                  <tr className="border-[#000000] border-b-[1px]  font-[400] text-[16px] leading-[24px] text-[#000000]">
                    <td className="pt-[16px] pb-[10px] text-center">kim,angi</td>
                    <td className="pt-[16px] pb-[10px] text-center">paid</td>
                    <td className="pt-[16px] pb-[10px] text-center">$5000</td>
                  </tr>
                </table>
              </div>
              {/* 2nd table start here */}
              <div className="shadow-2xl w-[45%] h-[430px] mb-[30px] bg-[#F5F5F5]  rounded-b-lg ">
                <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
                  <i className="fa-solid fa-book-open pl-5 pt-3"></i>
                  <p className="text-2xl ml-1 mt-1">Quick Slot</p>
                </div>
                <div className="flex flex-col justify-center gap-[13px] items-center">
                  <div className="h-[46px] w-[95%] bg-[#374557] mt-[26px] rounded-[10px] pl-[18px] pt-[4px]  text-[20px] text-[#FFFFFF] leading-[39px] font-[400]">
                    Invoice generator
                  </div>
                  <div className="h-[46px] w-[95%] bg-[#374557] rounded-[10px] pl-[18px]  pt-[4px]  text-[20px] text-[#FFFFFF] leading-[39px] font-[400]">
                    Add Student
                  </div>
                  <div className="h-[46px] w-[95%] bg-[#374557] rounded-[10px] pl-[18px]  pt-[4px]  text-[20px] text-[#FFFFFF] leading-[39px] font-[400]">
                    Add Blog Article
                  </div>
                  <div className="h-[46px] w-[95%] bg-[#374557] rounded-[10px] pl-[18px]  pt-[4px]  text-[20px] text-[#FFFFFF] leading-[39px] font-[400]">
                    Quick Metting
                  </div>
                </div>
              </div>
              {/* 2nd  table end here*/}
            </div>
          </div>
          {/* right side bar */}
          <div className="flex flex-col gap-[24px] mr-[20px] mt-[47px]">
            <div className="w-[280px] h-[112px] rounded-[16px] bg-[#4CBC9A] mr-100 flex gap-2">
              <div className="flex justify-center items-center gap-4 pl-2">
                <img src="/images/Vector (5).svg" alt="img" />
                <div className="flex flex-col gap-2">
                  <div className=" font-[700] text-[18px] leading-[27px] text-[#FFFFFF]">23940</div>
                  <div className=" font-[400] text-[14px] leading-[24px] text-[#FFFFFF]">Total Courses</div>
                </div>
              </div>
              <div className="flex justify-end items-center ml-[25%]">
                <img src="/images/circle chart.svg" alt="#" className="pl-[2%]" />
              </div>
            </div>
            {/* two div*/}
            <div className="w-[280px] h-[112px] rounded-[16px] bg-[#FEC64F] mr-100 flex gap-2">
              <div className="flex justify-center items-center gap-4 pl-2">
                <img src="/images/Vector.png" alt="img" />
                <div className="flex flex-col gap-2">
                  <div className=" font-[700] text-[18px] leading-[27px] text-[#FFFFFF]">32567</div>
                  <div className=" font-[400] text-[14px] leading-[24px] text-[#FFFFFF]">Amount of students</div>
                </div>
              </div>
              <div className="flex justify-end items-center ml-[15%]">
                <img src="/images/circle chart (1).svg" alt="#" className="pl-[2%]" />
              </div>
            </div>
            {/* 3rd */}
            <div className="w-[280px] h-[112px] rounded-[16px] bg-[#FC6B57] mr-100 flex gap-2">
              <div className="flex justify-center items-center gap-4 pl-2">
                <img src="/images/Vector (8).svg" alt="img" />
                <div className="flex flex-col gap-2">
                  <div className=" font-[700] text-[18px] leading-[27px] text-[#FFFFFF]">94230</div>
                  <div className=" font-[400] text-[14px] leading-[24px] text-[#FFFFFF]">Amount of Parents</div>
                </div>
              </div>
              <div className="flex justify-end items-center ml-[15%]">
                <img src="/images/circle chart (2).svg" alt="#" className="pl-[2%]" />
              </div>
            </div>

          </div>
          {/* right side bar */}
        </div>
      </div>
    );
  }
}

export default M_home;
