
import React, { Component } from 'react';
import axios from "axios";
import {BASELINE} from "../../util/index"

class UserPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      pnum: ""
    };
    this.Bring_Info_by_id = this.Bring_Info_by_id.bind(this);
    
    
    this.test_send_email = this.test_send_email.bind(this);
  }

  async Bring_Info_by_id() {
    var self = this;
    axios.get(BASELINE+'user/get/one/info', {})
      .then(function (response) {
        self.setState({fname: response.data.info.Fname});
        self.setState({lname: response.data.info.Lname});
        self.setState({email: response.data.info.email});
        self.setState({pnum: response.data.info.Pnumber});
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async test_send_email() {
    axios.post(BASELINE+'email/send', {})
      .then(function (response) {
      })
      .catch(function (error) {
        alert(error);
      });
  }

  componentDidMount() {
    this.Bring_Info_by_id();
  //  this.test_send_email();
  }

  render() {
    let { fname, lname, email, pnum } = this.state;
    return (
      <>
        <div className="bg-[#FFFFFF] w-[100%] h-[750px] ml-[3%] mr-[3%]">
          <div className="grid grid-cols-12">
            <div className="col-span-6 ml-[5%] pt-[31px] flex flex-col">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">First Name*</label>
              <input
                readOnly
                type="text"
                value={fname}
                className="outline-none font-[600] text-[14px] leading-[21px] text-[#374557] w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
              />
            </div>
            <div className="col-span-6 pt-[31px] flex flex-col ml-[5%]">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Last Name*</label>
              <input
                readOnly
                type="text"
                value={lname}
                className="outline-none font-[600] text-[14px] leading-[21px] text-[#374557]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="grid grid-cols-12">
            <div className="col-span-6 ml-[5%] pt-[31px] flex flex-col">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Email*</label>
              <input
                readOnly
                type="email"
                value={email}
                className="outline-none font-[600] text-[14px] leading-[21px] text-[#374557]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
              />
            </div>
            <div className="col-span-6 pt-[31px]  flex flex-col ml-[5%]">
              <div className="flex justify-start  space-x-[16rem]  items-center">
                <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Phone*</label>
                <div className="hidden flex gap-2">
                  <input type="checkbox" className="rounded-3xl ]" />
                  <label className="text-[#A098AE] ">Send SMS Direct Message</label>
                </div>
              </div>
              <input
                readOnly
                type="tel"
                value={pnum}
                className="outline-none font-[600] text-[14px] leading-[21px] text-[#374557]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="hidden flex justify-start items-center ml-[2.5%] gap-2 mt-[40px] font-[poppins]">
            <img src="/images/Vector (1).svg" rel="image" />
            <p className="font-[600] text-[16px] leading-[24px] text-[#374557]">Click to display Birthday and Additional Details</p>
          </div>
          {/* 4th row */}
          <div className="hidden grid grid-cols-12 font-[poppins]">
            <div className="col-span-6 ml-[5%] pt-[31px] flex flex-col">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Default Lesson Category*</label>
              <div className="relative">
                <input
                  readOnly
                  type="tel"
                  placeholder="30 "
                  className="outline-none font-[600] text-[14px] leading-[21px] text-[#969696]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
                />
                <img
                  src="/images/arrow.svg"
                  className="absolute mt-[-30px] ml-[80%] text-center  right-[9px] md:right-[200] lg:right-[14%] xl:right-[13%] 2xl:right-[45%]"
                />
              </div>
            </div>
            <div className="hidden col-span-6 pt-[31px]  flex flex-col ml-[5%]">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Default Lesson Length*</label>
              <div className="relative">
                <input
                  readOnly
                  type="tel"
                  placeholder="30 "
                  className="outline-none font-[600] text-[14px] leading-[21px] text-[#969696]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
                />
                <p className="absolute mt-[-36px] right-[9px] md:right-[200] lg:right-[14%] xl:right-[13%] 2xl:right-[45%] text-center font-[600] text-[18px] leading-[27px] text-[#9A9A9A]">
                  Minutes
                </p>
              </div>
            </div>
          </div>

          {/* 6th row */}
          <div className="grid grid-cols-12">
            <div className="col-span-6 pt-[31px]  flex flex-col ml-[5%] bg-white">
              <label className="font-[600] text-[18px] leading-[27px] text-[#374557]">Make-up creadiets*</label>
              <div className="relative">
                <input
                  readOnly
                  type="tel"
                  placeholder="30 "
                  className="  outline-none font-[600] text-[14px] leading-[21px] text-[#969696]  w-[100%]  max-w-[577px] mt-[16px] p-[12px] border-[1px] border-solid rounded-[5px] border-[#374557]"
                />
                <p className=" font-[600] text-[18px] leading-[27px] text-[#9A9A9A]  right-[9px] md:right-[200] lg:right-[24%] xl:right-[13%] 2xl:right-[45%]  absolute mt-[-36px] ml-[80%] text-center">
                  Minutes
                </p>
              </div>
              <p className="mt-[19px] font-[400] text-[18px] leading-[27px] text-[#374557]">
                Makeup credits are automatically adjusted when makeup lessons are taught.
                Only change this value if you wish to override the number of credits assigned to this student.
              </p>
            </div>
            <div className="hidden col-span-6 pt-[31px]  flex flex-col items-end justify-end m-4 bg-white">
              <button className="text-white p-3 bg-[#374557] w-[20%] ">
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserPersonal;
