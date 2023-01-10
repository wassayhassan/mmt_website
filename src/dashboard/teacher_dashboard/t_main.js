
import React, { Component } from 'react';
import Calendart from './t_main_daily_calendar';
import axios from "axios";
import { BASELINE } from "../../util/index"

class T_main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        {/* second section */}

        <section className="mt-[50px] ">
          <div className="flex justify-evenly items-center ">
            <div className="w-[28%] h-[400px] max-h-[440px] bg-[#FDFDFD] mt-[20px] rounded-[16px] shadow-[#000000] shadow-sm">
              <header className="w-[100%] h-[46px] bg-[#374557] rounded-t-[20px] text-white ">
                <span className="ml-2 mt-2 font-[700] text-[36px] leading-[54px]">
                  Calender
                </span>
              </header>
              <div className="mt-[2px] border-none shadow-xl shadow-gray-400 ">
                <Calendart />
              </div>
            </div>
            <div className="w-[32%] h-[400px] max-h-[440px] bg-[#FDFDFD] mt-[20px] rounded-[16px] shadow-[#000000] shadow-sm">
              <header className="w-[100%] h-[46px] bg-[#374557] rounded-t-[20px] text-white ">
                <span className="ml-2 mt-2 font-[700] text-[36px] leading-[54px]">
                  Whiteboard
                </span>
              </header>
              <div className="flex flex-col space-y-[13px]">
                <div className="flex flex-col ml-[27px] mr-[27px] mt-[5%]">
                  <label className="w-[600] text-[18px] leading-[27px] text-[#374557]">
                    Set Title
                  </label>
                  <input
                    type="text"
                    className="h-[48px] border-[#374557] bg-[#FFFFFF] border-[1px] border-solid rounded-[5px] pl-2"
                  />
                </div>
                <div className="flex flex-col ml-[27px] mr-[27px] mt-[5%]">
                  <label className="w-[600] text-[18px] leading-[27px] text-[#374557]">
                    Set Class type
                  </label>
                  <input
                    type="text"
                    className="h-[48px] border-[#374557] bg-[#FFFFFF] border-[1px] border-solid rounded-[5px] pl-2"
                  />
                </div>
                <div className="flex flex-col ml-[27px] mr-[27px] mt-[5%]">
                  <label className="w-[600] text-[18px] leading-[27px] text-[#374557]">
                    Attend Students
                  </label>
                  <input
                    type="text"
                    className="h-[48px]  border-[#374557] bg-[#FFFFFF] border-[1px] border-solid rounded-[5px] pl-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-[32%] h-[400px] max-h-[440px] bg-[#FDFDFD] mt-[20px] rounded-[16px] shadow-[#000000] shadow-sm ">
              <header className="w-[100%] h-[46px] bg-[#374557] rounded-t-[20px] text-white ">
                <span className="ml-2 mt-2 font-[700] text-[36px] leading-[54px]">
                  Created class
                </span>
                <table className="text-black w-[100%] ">
                  <tr className="text-center">
                    <th className="">Title</th>
                  </tr>
                  <tr>
                    <td className="text-[#000000] leading-[24px] text-[16px] font-[400] pl-[7px]">English 1:1 w. Aiden Oh</td>
                    <td className="pt-[17px] pb-[12px] text-center">
                      <button className="text-[#FFFFFF] pt-[10px] pb-[10px] text-center pl-[10px] pr-[10px] rounded-[10px] font-[500] text-[18px] leading-[27px] bg-[#374557]">
                        Continue class
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#000000] leading-[24px] text-[16px] font-[400] pl-[7px]">English 1:1 w. Aiden Oh math is fun</td>
                    <td className="pt-[17px] pb-[12px] text-center">
                      <button className="text-[#FFFFFF]  pt-[10px] pb-[10px] text-center pl-[10px] pr-[10px] rounded-[10px] font-[500] text-[18px] leading-[27px] bg-[#374557]">
                        Continue class
                      </button>
                    </td>
                  </tr>
                </table>
              </header>
            </div>
          </div>
        </section>
        {/* third section */}
        <section className="pt-[36px] pl-5 pr-5 pb-[36px]">
          <div className="flex justify-between items-center ">
            <label className="text-[#374557] leading-[54px] text-[36px] font-[700]">Students List</label>
            <input type="text" placeholder="Search" className="rounded-[30px] border-[1px] border-solid border-[#000000] pl-[15px]  leading-[27px]  text-[#000000] text-[18px] font-[600] w-[465px]" />
          </div>
          <table className="w-[100%] mt-[25px]  shadow-sm shadow-black scale-100 rounded-[20px]  bg-[white]" >
            <tr className="text-center h-[70px]">
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Person</th>
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Classes</th>
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Email Address</th>
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Phone</th>
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Date</th>
              <th className="text-[#374557] leading-[24px] text-[16px] font-[600]">Current Class</th>
            </tr>
            <tr className="text-center h-[112px] border-[1px] border-solid border-l-[#374557] border-l-[4px] ">
              <td className="flex gap-[16px] justify-center items-center mt-[30px]">
                <img src="/images/placeholder.svg" />
                <label className="font-[700] text-[18px] leading-[27px] text-[#374557]">Samanta William</label>
              </td>
              <td className="text-[#374557] leading-[27px] text-[18px] font-[600]">#123456789</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">sara.cruz@example.com</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">(704) 555-0127</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">March 25, 2021</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">AGS 1</td>
            </tr>
            <tr className="text-center h-[112px]">
              <td className="flex gap-[26px] justify-center items-center mt-[30px]">
                <img src="/images/placeholder.svg" />
                <label className="font-[700] text-[18px] leading-[27px] text-[#374557]">Tony Soap</label>
              </td>
              <td className="text-[#374557] leading-[27px] text-[18px] font-[600]">#123456789</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">sara.cruz@example.com</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">(704) 555-0127</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">March 25, 2021</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">AGS 1</td>
            </tr>
            <tr className="text-center h-[112px] border-[1px] border-solid border-l-[#374557] border-l-[4px] ">
              <td className="flex gap-[16px] justify-center items-center mt-[30px]">
                <img src="/images/placeholder.svg" />
                <label className="font-[700] text-[18px] leading-[27px] text-[#374557]">Karen Hope</label>
              </td>
              <td className="text-[#374557] leading-[27px] text-[18px] font-[600]">#123456789</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">sara.cruz@example.com</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">(704) 555-0127</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">March 25, 2021</td>
              <td className="text-[#374557] leading-[21px] text-[14px] font-[400]">AGS 1</td>
            </tr>
          </table>
        </section>
      </>
    );
  }
}

export default T_main;
