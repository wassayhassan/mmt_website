import React, { Component } from "react";
import { BASELINE } from "../../util/index";
import axios from "axios";

import "../../App.css";

class M_invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i_lst: [],
      total_p: 0
    };
    this.get_all_invoice = this.get_all_invoice.bind(this);
    this.change_table = this.change_table.bind(this);
    this.number_link = this.number_link.bind(this);
    this.sendinvoice_id = this.sendinvoice_id.bind(this);
  }

  async sendinvoice_id(num, aid) {
    this.props?.handleAddClick(num, aid);
  }

  number_link() {
    var main = document.getElementById("num_link");
    for (let i = 0; i < this.state.i_lst.length; i++) {
      var li = document.createElement("li");
      var alink = document.createElement("a");
      alink.className = "py-2 px-3 w-9 h-9 leading-tight bg-white  text-xl font-semibold cursor-pointer";
      alink.innerText = i + 1;
      alink.addEventListener("click", () => {
        this.change_table(i);
      });
      li.appendChild(alink);
      main.appendChild(li);
    }
  }

  change_table(row) {
    var main = document.getElementById("user_body");
    main.innerHTML = "";

    for (let i = 0; i < this.state.i_lst[row].length; i++) {
      var tr = document.createElement("tr");
      tr.className = "bg-white border-b text-center";

      var th = document.createElement("th");
      th.scope = "row";
      th.className = "py-2 px-6 font-medium text-gray-900 whitespace-nowrap underline cursor-pointer";
      th.innerText = "# " + this.state.i_lst[row][i].id;
      th.addEventListener("click", () => {
        this.sendinvoice_id(32, parseInt(this.state.i_lst[row][i].id));
      });

      var tdn = document.createElement("td");
      tdn.className = "py-2 px-6";
      tdn.innerText = this.state.i_lst[row][i].c_name;

      var tdp = document.createElement("td");
      tdp.className = "py-2 px-6";
      tdp.innerText = "$ " + this.state.i_lst[row][i].total;

      var tdi = document.createElement("td");
      tdi.className = "py-2 px-6";
      tdi.innerText = this.state.i_lst[row][i].i_date;

      var tdpd = document.createElement("td");
      tdpd.className = "py-2 px-6";
      if (this.state.i_lst[row][i].Remains != null) {
        tdpd.innerText = "$ " + this.state.i_lst[row][i].Remains;
      } else {
        tdpd.innerText = "$ " + this.state.i_lst[row][i].total;
      }

      var tds = document.createElement("td");
      tds.className = "py-2 px-6";
      if (this.state.i_lst[row][i].status == 0) {
        tds.innerText = "Sent";
      }
      if (this.state.i_lst[row][i].status == 1) {
        tds.innerText = "Partial pay";
      }
      if (this.state.i_lst[row][i].status == 2) {
        tds.innerText = "Dump";
      }
      if (this.state.i_lst[row][i].status == 3) {
        tds.innerText = "Due Date passed";
      }
      if (this.state.i_lst[row][i].status == 4) {
        tds.innerText = "Paid";
      }

      tr.appendChild(th);
      tr.appendChild(tdn);
      tr.appendChild(tdp);
      tr.appendChild(tdi);
      tr.appendChild(tdpd);
      tr.appendChild(tds);
      main.appendChild(tr);
    }
  }

  get_all_invoice(data) {
    var row = [];
    var cnt = 0;
    var tp = 0;
    for (let i = 0; i < data.length; i++) {
      tp += parseInt(data[i].total);
      if (cnt < 12) {
        cnt += 1;
        row.push(data[i]);
      } else {
        cnt = 1;
        this.state.i_lst.push(row);
        row = []
        row.push(data[i]);
      }
    }
    if (cnt != 0) {
      this.state.i_lst.push(row);
    }
    this.setState({ total_p: tp });
    this.change_table(0);
    this.number_link();
  }

  componentDidMount() {
    var self = this;
    axios.get(BASELINE + "invoice/get/all", {})
      .then(function (response) {
        self.get_all_invoice(response.data.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    return (
      <div className="container bg-white mx-auto rounded-2xl">
        <div className="head bg-slate-700 h-10 rounded-t-lg text-white flex">
          <i className="fa-solid fa-book-open pl-5 pt-3"></i>
          <p className="text-2xl font-semibold ml-5 mt-1">Invoice</p>
        </div>
        <div className="pl-4 pr-4 p-2">
          <div className="bg-white h-full rounded-b-lg relative">
            <div className="mt-4">
              <div className="options flex relative">
                <select
                  className="bg-slate-700 text-xl px-5 py-1 font-bold rounded-lg absolute left-5 text-white"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <option value="-1" defaultValue>Over All</option>
                  <option value="0">Sent</option>
                  <option value="1">Partial pay</option>
                  <option value="2">Dump</option>
                  <option value="3">Due Date passed</option>
                  <option value="4">Paid</option>
                </select>

                <div className="btn ml-70 bg-slate-700 rounded-lg absolute w-50 right-72"><button
                  className="text-xl font-bold text-white px-5 py-1 w-96">
                  <span className="float-left"> Total Price: $ {this.state.total_p} </span>
                </button></div>
                <div className="btn bg-slate-700 rounded-lg absolute right-5"><button
                  className="text-xl font-bold text-white px-5 py-1"
                  onClick={() => {
                    this.props?.handleAddClick(31);
                  }}>
                  Create Invoice
                </button></div>
              </div>

              <div className="mt-14 overflow-x-auto relative shadow-lg sm:rounded-2xl">
                <table className="w-full text-l text-left text-gray-900 font-semibold">
                  <thead className="text-base text-white uppercase bg-[#374151]">
                    <tr className="text-center">
                      <th scope="col" className="py-3 px-6">
                        #
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Client
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Total price
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Issue Date
                      </th>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap">
                        Remains
                      </th>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody id="user_body">

                  </tbody>
                </table>
              </div>


              <div className=" flex justify-end mb-14 p-4">
                <div aria-label="Page">
                  <ul id="num_link" className="inline-flex items-center -space-x-px">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default M_invoice;
