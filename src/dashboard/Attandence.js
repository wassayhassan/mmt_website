import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Circularbar from "./Circularbar";

class StudyLogs extends Component {
  render() {
    return (
      <>
        <div className="grid grid-cols-12 mt-[55px] space-x-[28px] ml-[3%] mr-[3%]">
          <div className="col-span-8 pl-[8]">
            <table className="bg-[#FFFFFF] w-[100%] rounded-[20px]">
              <tr className="font-[600] text-[18px] leading-[27px] text-[#374557]">
                <th className=" p-[43px] ">Event</th>
                <th className=" p-[43px] ">Date/Time</th>
                <th className=" p-[43px] ">Attandance</th>
                <th className=" p-[43px] ">Notes</th>
              </tr>
              <tr className="text-center pt-[46px] border-l-[#374557] border-[#DBDBDB] border-r-[0px] border-[1px] border-l-[5px] font-[400] text-[14px] leading-[21px] text-[#374557]">
                <td className=" p-[43px] flex gap-[50px]">
                  <img src="/images/Group 7227.svg" />
                  Lesson
                </td>
                <td className=" p-[43px] ">22/03/2022 19:45</td>
                <td className=" p-[43px] ">Present</td>
                <td className=" p-[43px] ">Present</td>
              </tr>
              <tr className="text-center pt-[46px] font-[400] text-[14px] leading-[21px] text-[#374557]">
                <td className=" p-[43px] flex gap-[50px]">
                  <img src="/images/Group 7227.svg" />
                  Lesson
                </td>
                <td className=" p-[43px] ">22/03/2022 19:45</td>
                <td className=" p-[43px] ">Present</td>
                <td className=" p-[43px] ">Present</td>
              </tr>
              <tr className="text-center pt-[46px] border-l-[#374557] border-[#DBDBDB] border-r-[0px] border-[1px] border-l-[5px] font-[400] text-[14px] leading-[21px] text-[#374557] ">
                <td className=" p-[43px] flex gap-[50px]">
                  <img src="/images/Group 7227.svg" />
                  Lesson
                </td>
                <td className=" p-[43px]">22/03/2022 19:45</td>
                <td className=" p-[43px]">Present</td>
                <td className=" p-[43px]">Present</td>
              </tr>
              <tr className="text-center pt-[46px] font-[400] text-[14px] leading-[21px] text-[#374557]">
                <td className=" p-[43px] flex gap-[50px]">
                  <img src="/images/Group 7227.svg" />
                  Lesson
                </td>
                <td className=" p-[43px]">22/03/2022 19:45</td>
                <td className=" p-[43px]">Present</td>
                <td className=" p-[43px]">Present</td>
              </tr>
            </table>
          </div>
          {/* second grid col */}
          <div className="col-span-4 w-[93%] h- bg-[#FFFFFF] font-[poppins]">
            <div className="ml-[17px] mt-[16px] mr-[18px] mb-[26px]">
              <h1 className="font-[600] text-[22px] leading-[33px] text-[#374557]">Attandance Report</h1>
              {/* second */}
              <div className="flex justify-start items-center gap-5">
                {/* <img src="/images/Ellipse.svg" className="w-[100px] h-[170px]" /> */}
                <div className="lg:w-[100%] xl:w-[20%] min-w-[100px] h-[170px] pt-[25px] justify-center items-center" >
                  <Circularbar className="" />
                </div>
                <div>
                  <h1 className="font-[600] text-[18px] leading-[27px] text-[#374557]">
                    Attendance Report 80% attendance over the last 90 days.
                  </h1>
                  <p className="font-[400] text-[14px] leading-[21px] text-[#A098AE] mt-[10px]">
                    Muhammad attended 1 of 1 scheduled events (0 absences)
                  </p>{" "}
                </div>
              </div>
              {/* third */}
              <div className="flex flex-col gap-[4px] mt-[19px]">
                <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Start</label>
                <input type="date" className="border-[1px] border-solid pr-2 pl-[11px] pt-[15px] pb-[11px] border-[#374557] rounded-[5px]" />
              </div>
              {/* 4th */}
              <div className="flex flex-col gap-[4px] mt-[19px]">
                <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">End</label>
                <input type="date" className="border-[1px] border-solid pr-2 pl-[11px] pt-[15px] pb-[11px] border-[#374557] rounded-[5px]" />
              </div>
              <div className="flex justify-between mt-[18px] w-[100%]">
                <div className="flex gap-[4px]">
                  <input type="checkbox" />
                  <label className="font-[400] text-[13px] leading-[20px] text-[#606060]">Student Notes</label>
                </div>
                <div className="flex gap-[4px]">
                  <input type="checkbox" className="text-[#969696] font-[400] text-[14px]" />
                  <label className="font-[400] text-[13px] leading-[20px] text-[#606060]">Parent Notes</label>
                </div>
                <div className="flex gap-[4px]">
                  <input type="checkbox" />
                  <label className="font-[400] text-[13px] leading-[20px] text-[#606060]">Private Notes</label>
                </div>
              </div>
              <button className="w-[100%] bg-[#374557] flex justify-center items-center gap-[10px] mt-[22px] pt-[6px] pb-[6px] rounded-md">
                <img src="/images/vector (4).svg" /> <span className="font-[600] text-[18px] leading-[27px] text-[#FFFFFF]">Print</span>
              </button>
            </div>
          </div>
          {/* second grid col end*/}
        </div>
      </>
    );
  }
}

export default StudyLogs;
