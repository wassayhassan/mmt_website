import React, { Component } from "react";
import axios from "axios";

class T_email extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="flex justify-start gap-[40px]  mt-[35px]">
        <div>
          <div className="text-[#374557] leading-[54px] text-[22px] font-[700]">
            Contoller
          </div>
          <div>
            <table className="bg-[white] w-[295px] h-auto shadow-sm shadow-black rounded-2xl">
              <tr className="flex space-x-[96px] justify-start items-center pl-[27px] pr-[14px] pt-[14px] pb-[14px]">
                <td className="text-[#000000] leading-[24px] text-[16px] font-[400] w-[100px]">
                  Send Email
                </td>
                <td>
                  <button className="bg-[#374557] rounded-[10px] border-[2px] brder-solid border-[#374557] w-[77px] h-[48px] text-[18px] font-[500] text-[#FFFFFF]">
                    Select
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-[100px] justify-start items-center pl-[27px] pr-[14px] pt-[14px] pb-[14px]">
                <td className="text-[#000000] leading-[24px] text-[16px] font-[400] w-[100px]">
                  Template 1
                </td>
                <td>
                  <button className="bg-[#374557] rounded-[10px] border-[2px] brder-solid border-[#374557] w-[77px] h-[48px] text-[18px] font-[500] text-[#FFFFFF]">
                    Select
                  </button>
                </td>
              </tr>
              <tr className="flex space-x-[100px] justify-start items-center pl-[27px] pr-[14px] pt-[14px] pb-[14px]">
                <td className="text-[#000000] leading-[24px] text-[16px] font-[400] w-[100px]">
                  Template 12
                </td>
                <td>
                  <button className="bg-[#374557] rounded-[10px] border-[2px] brder-solid border-[#374557] w-[77px] h-[48px] text-[18px] font-[500] text-[#FFFFFF]">
                    Select
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* right side complete data */}

        <div className="w-[100%] bg-[white]">
          <div className="mt-[27px] ml-[40px] mr-[40px] flex justify-start items-center gap-[20px]">
            <label className="text-[#374557] leading-[22px] text-[24px] font-[700]">Title</label>
            <input type="text"
              className="w-[95%] h-[40px] bg-[#FFFFFF] border-[0.5px] border-solid border-[#374557] rounded-[10px] pl-[4px]"
            />
          </div>
          <div className="mt-[13px] ml-[55px] mr-[40px] flex justify-start items-center gap-[20px]">
            <label className="text-[#374557] leading-[22px] text-[24px] font-[700]">To.</label>
            <input type="text"
              className="w-[95%] h-[40px] bg-[#FFFFFF] border-[0.5px] border-solid border-[#374557] rounded-[10px] pl-[4px]"
            />
          </div>
          <div className="flex space-x-[58px] ml-[110px]">
            <div className="flex gap-[10px]">
              <input type="checkbox" />
              <label className="text-[#374557] leading-[30px] font-[700] text-[20px]">All Parents</label>
            </div>
            <div className="flex gap-[10px]">
              <input type="checkbox" />
              <label className="text-[#374557] leading-[30px] font-[700] text-[20px]">All Students</label>
            </div>
            <div className="flex gap-[10px]">
              <input type="checkbox" />
              <label className="text-[#374557] leading-[30px] font-[700] text-[20px]">All Teacher</label>
            </div>
            <div className="flex gap-[10px]">
              <input type="checkbox" />
              <label className="text-[#374557] leading-[30px] font-[700] text-[20px]">All wait list</label>
            </div>
          </div>
          <div className="flex ml-[40px] gap-[18px] ">
            <div className="flex gap-[5px] mt-[12px] items-center">
              <label className="text-[#374557] leading-[22px] text-[20px] font-[700]">Article</label>
              <input
                type="text"
                className="border-[1px] border-solid rounded-[10px] bg-[#FFFFFF] border-[#374557] w-[210px] h-[38px]"
              />
            </div>
            <div className="flex gap-[5px] mt-[12px] items-center">
              <label className="text-[#374557] leading-[22px] text-[20px] font-[700]">Template</label>
              <input
                type="text"
                className="border-[1px] border-solid rounded-[10px] bg-[#FFFFFF] border-[#374557] h-[38px] w-[80%]"
              />
            </div>
            <div className="flex gap-[5px] mt-[12px] items-center">
              <label className="text-[#374557] leading-[22px] text-[20px] font-[700]">Schedule</label>
              <input
                type="text"
                className="border-[1px] border-solid rounded-[10px] bg-[#FFFFFF] border-[#374557] h-[38px] w-[50%]"
              />
            </div>
          </div>
          {/* text area */}
          <div className="ml-[40px] mt-[11px] ">
            <textarea id="w3review" rows="4" cols="50" className="border-[1px] border-solid rounded-[10px] bg-[#FFFFFF] border-[#374557] h-[640px] w-[98%] ">

            </textarea>
            <div className="flex justify-end gap-4 mr-[40px] mt-[24px] pb-[31px]">
              <button className="bg-[#374557] border-[2px] border-solid rounded-[10px] text-[#FFFFFF] leading-[27px] font-[700] pl-[22px] pr-[22px] pt-[10px] pb-[10px]">Add template</button>
              <button className="bg-[#374557] border-[2px] border-solid rounded-[10px] text-[#FFFFFF] leading-[27px] font-[700] pl-[22px] pr-[22px] pt-[10px] pb-[10px]">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default T_email;
