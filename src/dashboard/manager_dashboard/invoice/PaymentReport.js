import React, { Component, createElement } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Calendar from 'react-calendar';
import { BASELINE } from "../../../util/index";

class PaymentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_data: [{ title: "Website design", describe: "Hi, thank you for working", quantity: 300, price: 1 }],
      num_row: 0,
      num_sub_row: 0,
      total_price: 0,
      addrow_show: "block",
      subtotal: 0,
      subtotal2: 0,
      c_name: "Angie Kim",
      c_email: "angiek@mmtprep.com",
      c_num: "971-256-1284",
      selected_id: "",
      pick_date: "",
      pick_date2: "",
      issue_d: "Click to modify",
      due_d: "Click to modify",
      invocie_num: "",
      c_title: "",
      c_price: "",
      c_des: "",
      class_info: "Suite 116 15160 Northwest Laidiaw Road Portiand, Oregon 97229 United States Angiek@mmtprep.com Phone: 971-256-2586",
      note: ""
    };
    this.preset = this.preset.bind(this);
    this.addRow = this.addRow.bind(this);
    this.autocal_total = this.autocal_total.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.addsubtotal = this.addsubtotal.bind(this);
    this.set_subprice = this.set_subprice.bind(this);
    this.set_subprice2 = this.set_subprice2.bind(this);
    this.get_p_lst = this.get_p_lst.bind(this);
    this.get_p_lst_info = this.get_p_lst_info.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.showpanel = this.showpanel.bind(this);
    this.hidepanel = this.hidepanel.bind(this);
    this.gen_invocie_num = this.gen_invocie_num.bind(this);
    this.addClassItem = this.addClassItem.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.GetClassItem = this.GetClassItem.bind(this);
    this.ClassClicked = this.ClassClicked.bind(this);
    this.insert2invoice = this.insert2invoice.bind(this);
    this.changetext = this.changetext.bind(this);
    this.remove_row = this.remove_row.bind(this);
  }

  remove_row = (num) => {
    document.getElementById("table_item").deleteRow(num);
    var num_row = document.getElementsByClassName("item").length;
    for (let i = 0; i < num_row; i++) {
      var main = document.getElementById("table_item").rows[i];
      var btn = main.getElementsByTagName("td")[3].getElementsByTagName("button")[0];
      btn.removeEventListener("click", (event) => {
        this.remove_row(i);
      });
      btn.addEventListener("click", (event) => {
        this.remove_row(i);
      });
    }
    this.autocal_total();
  }

  changetext = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  insert2invoice() {
    var num_row = document.getElementsByClassName("item").length;
    var main = document.getElementById("table_item");

    var mtr = document.createElement("tr");
    mtr.className = "item";

    var td1 = document.createElement("td");
    var td1input = document.createElement("input");
    td1input.id = num_row + "_title";
    td1input.value = this.state.c_title;
    td1.className = "pl-4 py-2 inputStyle flex flex-col";
    td1.appendChild(td1input);

    var td12input = document.createElement("input");
    td12input.id = num_row + "_describe";
    td12input.className = "text-xs";
    td12input.value = this.state.c_des;
    td1.appendChild(td12input);

    var td2 = document.createElement("td");
    td2.innerText = "$";
    var td2input = document.createElement("input");
    td2input.type = "number";
    td2input.id = num_row + "_price";
    td2input.value = this.state.c_price;
    td2.className = "pl-4 py-2 inputStyle text-right";
    td2input.addEventListener("change", (event) => {
      this.autocal_sub_total(event.target.id);
    });
    td2.appendChild(td2input);

    var td3 = document.createElement("td");
    var td3input = document.createElement("input");
    td3input.type = "number";
    td3input.id = num_row + "_quantity";
    td3input.value = 0;
    td3.className = "pl-4 py-2 inputStyle text-right";
    td3input.addEventListener("change", (event) => {
      this.autocal_sub_total(event.target.id);
    });
    td3.appendChild(td3input);

    var td4 = document.createElement("td");
    var td4btn = document.createElement("button");
    td4btn.id = num_row + "_subtotal";
    var num = num_row;
    td4btn.addEventListener("click", (event) => {
      this.remove_row(num);
    });
    td4.appendChild(td4btn);

    main.appendChild(mtr);
    mtr.appendChild(td1);
    mtr.appendChild(td2);
    mtr.appendChild(td3);
    mtr.appendChild(td4);

    this.setState({ c_title: "" });
    this.setState({ c_price: "" });
    this.setState({ c_des: "" });
  }

  ClassClicked = (e) => {
    var data = {
      cid: e.target.value
    }
    var self = this;
    axios.post(BASELINE + "class/get/one", data)
      .then(function (response) {
        self.setState({ c_title: response.data.title[0] });
        self.setState({ c_price: response.data.price[0] });
        self.setState({ c_des: response.data.description[0] });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async gen_invocie_num() {
    var num = Math.floor(Math.random() * 9999999);
    this.setState({ invocie_num: num.toString() });
  }

  changeDate2 = (e) => {
    var date = e.toString().split(" ");
    this.setState({ due_d: date[0] + ", " + date[1] + " / " + date[2] + " / " + date[3] });
    this.state.due_d = date[0] + ", " + date[1] + " / " + date[2] + " / " + date[3];
  }

  changeDate = (e) => {
    var date = e.toString().split(" ");
    this.setState({ issue_d: date[0] + ", " + date[1] + " / " + date[2] + " / " + date[3] });
    this.state.issue_d = date[0] + ", " + date[1] + " / " + date[2] + " / " + date[3];
  }

  get_p_lst_info = (e) => {
    var data = {
      id: e.target.value
    }
    var self = this;
    axios.post(BASELINE + "user/get/info/addressNphoneNname", data)
      .then(function (response) {
        self.setState({ c_email: response.data.email });
        self.setState({ c_num: response.data.pnum });
        self.setState({ c_name: response.data.name });
        self.setState({ selected_id: response.data.uid });
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async GetClassItem() {
    var self = this;
    axios.post(BASELINE + 'class/get/all', {})
      .then(function (response) {
        var main = document.getElementById("classitem");
        main.innerHTML = "";

        var op = document.createElement("option");
        op.value = "";
        op.innerText = "Select One...";
        main.appendChild(op);

        for (let i = 0; i < response.data.title.length; i++) {
          var op = document.createElement("option");
          op.value = response.data.cid[i];
          op.innerText = response.data.title[i];
          main.appendChild(op);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async addClassItem() {
    var data = {
      title: this.state.c_title,
      price: this.state.c_price,
      describe: this.state.c_des
    }
    var self = this;
    axios.post(BASELINE + "class/add", data)
      .then(function (response) {
        var select = document.getElementById('customers');
        self.setState({ c_title: "" });
        self.setState({ c_price: "" });
        self.setState({ c_des: "" });
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  async get_p_lst() {
    axios.post(BASELINE + "user/get/info/parents/namenid", {})
      .then(function (response) {
        var select = document.getElementById('customers');
        for (let i = 0; i < response.data.p_lst.length; i++) {
          var opt = document.createElement('option');
          opt.value = response.data.p_idlst[i];
          opt.innerHTML = response.data.p_lst[i];
          select.appendChild(opt);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  set_subprice = (e) => {
    this.setState({ subtotal: e.target.value });
  };

  set_subprice2 = (e) => {
    this.setState({ subtotal2: e.target.value });
  };

  addsubtotal(ver) {
    //ver == 0 -> add && ver == 1 -> per
    this.setState({ num_sub_row: this.state.num_sub_row + 1 });

    var f_p = 0;
    var td2 = document.createElement("td");

    if (ver == 0) {
      this.setState({ subtotal: 0 });
      f_p = this.state.subtotal2;
      td2.innerText = "Sub Total: +$" + f_p;
    } else if (ver == 1) {
      this.setState({ subtotal2: 0 });
      f_p = (this.state.subtotal / 100) * this.state.total_price;
      td2.innerText = "Sub Total: (" + this.state.subtotal + "%) $" + f_p;
    }

    td2.id = "sub_total";
    td2.className = "pl-4 py-2 inputStyle";
    td2.value = parseInt(f_p);
    var main = document.getElementById("subTotal");
    main.innerHTML = "";

    var td = document.createElement("td");
    td.colSpan = "3";

    main.appendChild(td);
    main.appendChild(td2);
    this.autocal_total();
  }

  preset() {
    var full_length = this.state.table_data.length;
    for (let i = 0; i < full_length; i++) {
      this.setState({ num_row: this.state.num_row + 1 });
      var main = document.getElementById("table_item");

      var mtr = document.createElement("tr");
      mtr.className = "item";

      var td1 = document.createElement("td");
      var td1input = document.createElement("input");
      td1input.id = this.state.num_row + "_title";
      td1input.value = this.state.table_data[i].title;
      td1.className = "pl-4 py-2 inputStyle flex flex-col";
      td1.appendChild(td1input);

      var td12input = document.createElement("input");
      td12input.id = this.state.num_row + "_describe";
      td12input.className = "text-xs";
      td12input.value = this.state.table_data[i].describe;
      td1.appendChild(td12input);

      var td2 = document.createElement("td");
      td2.innerText = "$";
      var td2input = document.createElement("input");
      td2input.type = "number";
      td2input.id = this.state.num_row + "_price";
      td2input.value = this.state.table_data[i].quantity;
      td2.className = "pl-4 py-2 inputStyle text-right";
      td2input.addEventListener("change", (event) => {
        this.autocal_sub_total(event.target.id);
      });
      td2.appendChild(td2input);

      var td3 = document.createElement("td");
      var td3input = document.createElement("input");
      td3input.type = "number";
      td3input.id = this.state.num_row + "_quantity";
      td3input.value = this.state.table_data[i].price;
      td3.className = "pl-4 py-2 inputStyle text-right";
      td3input.addEventListener("change", (event) => {
        this.autocal_sub_total(event.target.id);
      });
      td3.appendChild(td3input);

      var td4 = document.createElement("td");
      td4.id = this.state.num_row + "_subtotal";
      td4.innerText = "$ " + this.state.table_data[i].quantity * this.state.table_data[i].price;

      main.appendChild(mtr);
      mtr.appendChild(td1);
      mtr.appendChild(td2);
      mtr.appendChild(td3);
      mtr.appendChild(td4);
      this.autocal_total();
    }
  }

  addRow() {
    var num_row = document.getElementsByClassName("item").length;
    var main = document.getElementById("table_item");

    var mtr = document.createElement("tr");
    mtr.className = "item";

    var td1 = document.createElement("td");
    var td1input = document.createElement("input");
    td1input.id = num_row + "_title";
    td1.className = "pl-4 py-2 inputStyle flex flex-col";
    td1.appendChild(td1input);

    var td12input = document.createElement("input");
    td12input.id = num_row + "_describe";
    td12input.className = "text-xs";
    td1.appendChild(td12input);

    var td2 = document.createElement("td");
    td2.innerText = "$";
    var td2input = document.createElement("input");
    td2input.type = "number";
    td2input.id = num_row + "_price";
    td2.className = "pl-4 py-2 inputStyle text-right";
    td2input.addEventListener("change", (event) => {
      this.autocal_sub_total(event.target.id);
    });
    td2.appendChild(td2input);

    var td3 = document.createElement("td");
    var td3input = document.createElement("input");
    td3input.type = "number";
    td3input.id = num_row + "_quantity";
    td3.className = "pl-4 py-2 inputStyle text-right";
    td3input.addEventListener("change", (event) => {
      this.autocal_sub_total(event.target.id);
    });
    td3.appendChild(td3input);

    var td4 = document.createElement("td");
    var td4btn = document.createElement("button");
    td4btn.id = num_row + "_subtotal";
    var num = num_row;
    td4btn.addEventListener("click", (event) => {
      this.remove_row(num);
    });
    td4.appendChild(td4btn);

    main.appendChild(mtr);
    mtr.appendChild(td1);
    mtr.appendChild(td2);
    mtr.appendChild(td3);
    mtr.appendChild(td4);
  }

  async autocal_total() {
    var f_sub_p = 0;
    var num_row = document.getElementsByClassName("item").length;
    for (let i = 0; i < num_row; i++) {
      var main = document.getElementById("table_item").rows[i];
      var quantity = main.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
      var price = main.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value;
      f_sub_p += (quantity * price);
    }

    if (document.getElementById("sub_total")) {
      var sub_price = document.getElementById("sub_total").value;
      f_sub_p += sub_price;
    }
    this.setState({ total_price: f_sub_p });
    this.state.total_price = f_sub_p;
  }

  autocal_sub_total = (e) => {
    var num_row = document.getElementsByClassName("item").length;
    for (let i = 0; i < num_row; i++) {
      var main = document.getElementById("table_item").rows[i];
      var quantity = main.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
      var price = main.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value;
      main.getElementsByTagName("td")[3].getElementsByTagName("button")[0].innerText = "$ " + (quantity * price);
    }
    this.autocal_total();
  };

  async printDocument() {
    var num_row = document.getElementsByClassName("item").length;
    var row = [];
    var subp = 0; //price
    var subop = 0; //option
    if (this.state.subtotal == 0) {
      subop = 0;
      subp = this.state.subtotal2;
    } else {
      subop = 1;
      subp = this.state.subtotal;
    }

    for (let i = 0; i < num_row; i++) {
      var main = document.getElementById("table_item").rows[i];
      row.push({
        title: main.getElementsByTagName("td")[0].getElementsByTagName("input")[0].value,
        desc: main.getElementsByTagName("td")[0].getElementsByTagName("input")[1].value,
        price: main.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value,
        quan: main.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value
      });
    }

    var data = [{
      id: this.state.invocie_num,
      title: this.state.class_info,
      creator: "MMTPrep",
      c_name: this.state.c_name,
      c_email: this.state.c_email,
      c_pnum: this.state.c_num,
      c_uid: this.state.selected_id,
      total: this.state.total_price,
      i_date: this.state.issue_d,
      f_date: this.state.due_d,
      paid: 0,
      status: 0,
      i_lst: JSON.stringify(row),
      note: this.state.note,
      subp: subp,
      subop: subop
    }];

    var self = this;
    const input = document.getElementById("invoice-box");
    console.log(input);
    let handleElement = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let doc = new jsPDF();
    doc.html(input.innerHTML, {
      'x': 15,
      'y': 15,
      'width': 200,
      'elementHandlers': handleElement
    });
    doc.save();
    console.log(doc);
    /*
    const input = document.getElementById("invoice-box");

    html2canvas(input).then((canvas) => {
      let img = canvas.toDataURL();

      let doc = new jsPDF();
      let imgData = img;
      doc.addImage(imgData, "JPEG", 15, 15, 180, 160);
      console.log("==>", doc);
      data.push({invoice: doc});
      axios.post(BASELINE + "invoice/add", data)
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
    });*/


  }

  async showpanel(name) {
    var main = document.getElementById(name);
    main.className = "w-full rounded-xl bg-white shadow-xl";
  }

  async hidepanel(name) {
    var main = document.getElementById(name);
    main.className = "hidden w-full rounded-xl bg-white shadow-xl";
  }

  componentDidMount() {
    //this.preset();
    this.get_p_lst();
    this.gen_invocie_num();
    this.GetClassItem();

    //issue_d
    var ndate = new Date();
    let date = ndate.getDate();
    let month = ndate.getMonth() + 1;
    let year = ndate.getFullYear();
    this.setState({ issue_d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(Date.now()).getDay()] + ", " + month + " / " + date + " / " + year });
  }

  render() {
    return (
      <div>
        <div className="bg-gray-200 text-gray-800 font-semibold min-h-screen">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row pt-10 rounded-sm gap-10">
              <div className="lg:w-4/12 w-full">
                <form action="">
                  <div className="flex flex-col gap-7 ">
                    <div className="w-full rounded-xl bg-white shadow-xl">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        Customer
                      </h3>
                      <div className="p-3 pb-7">
                        <select
                          id="customers"
                          className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-md font-bold rounded-xl focus:ring-blue-300 focus:border-blue-300 block w-full px-2 leading-4 outline-none cursor-pointer"
                          onClick={this.get_p_lst_info}
                        >
                          <option defaultValue>Select Customer</option>

                        </select>
                      </div>
                    </div>

                    <div className="w-full rounded-xl bg-white shadow-xl">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        Insert to the Invoice
                      </h3>
                      <div className="p-3 pb-1">
                        <div>
                          <select id="classitem"
                            className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-md font-bold rounded-xl focus:ring-blue-300 focus:border-blue-300 block w-full px-2 leading-4 mb-2 outline-none cursor-pointer"
                            onChange={this.ClassClicked}
                          >
                          </select>
                        </div>
                        <div className="flex justify-between mt-3">
                          <button
                            type="button"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-xl px-5 py-0.5 mr-2 mb-2"
                            onClick={this.addRow}
                          >
                            Blank Item
                          </button>

                          <button
                            type="button"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-xl px-5 py-0.5 mr-2 mb-2"
                            onClick={this.insert2invoice}
                          >
                            Insert
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full rounded-xl bg-white shadow-xl">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        Add Class
                      </h3>
                      <div className="p-3 pb-1">
                        <div>
                          <input
                            id="title"
                            type="string"
                            name="c_title"
                            value={this.state.c_title}
                            onChange={this.handleInputFieldChange}
                            className="block pl-1 my-1 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border-2 focus:ring-blue-300 focus:border-blue-300 resize-none outline-none border-gray-500"
                            placeholder="Class Title"
                          ></input>
                          <input
                            id="price"
                            type="number"
                            name="c_price"
                            value={this.state.c_price}
                            onChange={this.handleInputFieldChange}
                            className="block pl-1 my-1 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border-2 focus:ring-blue-300 focus:border-blue-300 resize-none outline-none border-gray-500"
                            placeholder="$1000"
                          ></input>
                          <textarea
                            id="describe"
                            rows="4"
                            name="c_des"
                            value={this.state.c_des}
                            onChange={this.handleInputFieldChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border-2 focus:ring-blue-300 focus:border-blue-300 resize-none outline-none border-gray-500"
                            placeholder="Description..."
                          ></textarea>
                        </div>
                        <div className="flex justify-between mt-3">
                          <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-xl px-5 py-0.5 mr-2 mb-2"
                          >
                            Delete
                          </button>

                          <button
                            type="button"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-xl px-5 py-0.5 mr-2 mb-2"
                            onClick={this.addClassItem}
                          >
                            Add
                          </button>

                        </div>
                      </div>
                    </div>
                    <div className="w-full rounded-xl bg-white shadow-xl pb-2">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        Add Subtotal
                      </h3>
                      <div className="p-3 pb-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            id="input-group-1"
                            className="bg-gray-50 border ml-8 border-gray-500 text-gray-700 text-md rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-200 px-2.5 py-1 outline-none"
                            onChange={this.set_subprice}
                            placeholder=""
                          />
                          <div className="flex absolute inset-y-0 ml-2 right-20 items-center pr-3 pointer-events-none text-xl text-gray-700">
                            %
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-0.5 mr-2"
                          onClick={() => this.addsubtotal(1)}
                        >
                          Add
                        </button>
                      </div>
                      <div className="p-3 pb-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <div className="flex absolute inset-y-0 ml-2 left-0 items-center pr-3 pointer-events-none text-xl text-gray-700">
                            $
                          </div>
                          <input
                            type="number"
                            id="input-group-1"
                            className="bg-gray-50 border ml-8 border-gray-500 text-gray-700 text-md rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-200 px-2.5 py-1 outline-none"
                            onChange={this.set_subprice2}
                            placeholder=""
                          />
                        </div>
                        <button
                          type="button"
                          className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-0.5 mr-2"
                          onClick={() => this.addsubtotal(0)}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-gray-700 shadow-lg w-full bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-xl px-5 py-1.5 mr-2"
                      onClick={this.printDocument}
                    >
                      [notworking] Send Email
                    </button>
                  </div>
                </form>
              </div>

              <div className="md:w-full lg:w-8/12 bg-white p-6 sm:p-8" id="invoice-box">
                <div className="">
                  <div className="mb-7 border-b border-gray-300">
                    <div className="flex justify-between items-center p-1.5 ">
                      <div className="mr-3">
                        <img src={require("../../../logo.jpg")} width="100" height="33" alt="logo" />
                      </div>
                      <div className="text-right text-base">
                        <p className="font-bold text-xl mb-4">Invoice#{this.state.invocie_num}</p>
                        <p className="text-gray-600 text-sm">
                          <span>Issue Date: </span>
                          <button onClick={() => this.showpanel("idp")}>{this.state.issue_d}</button>
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span>Due Date:</span>
                          <button onClick={() => this.showpanel("ddp")}>{this.state.due_d}</button>
                        </p>
                      </div>
                    </div>

                    <div className="hidden w-full rounded-xl bg-white shadow-xl" id="idp">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        <p>Issue Date Picker <button className="float-right" onClick={() => this.hidepanel("idp")}>X</button></p>
                      </h3>
                      <div className="p-3 pb-7">
                        <Calendar onChange={this.changeDate} value={this.state.pick_date} />
                      </div>
                    </div>

                    <div className="hidden w-full rounded-xl bg-white shadow-xl" id="ddp">
                      <h3 className="bg-gray-700 w-full text-white text-xl px-2.5 py-1.5 rounded-tr-xl rounded-tl-xl">
                        <p>Due Date Picker <button className="float-right" onClick={() => this.hidepanel("ddp")}>X</button></p>
                      </h3>
                      <div className="p-3 pb-7">
                        <Calendar onChange={this.changeDate2} value={this.state.pick_date2} />
                      </div>
                    </div>

                    <div className="flex justify-between items-start p-1.5">
                      <div className="">
                        <h4 className="text-gray-800 font-bold mb-[4px]">MMT Prep, LLC</h4>
                        <textarea className="text-xs text-gray-600 w-[250px] min-h-[70px]" value={this.state.class_info} name="class_info" onChange={this.changetext} />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-7/12 w-full flex justify-between text-xs mb-7 p-1.5 text-gray-600">
                    <div className="">
                      <p className="mb-[4px]">Bill To:</p>
                      <input value={this.state.c_name} name="c_name" onChange={this.changetext} className="font-bold text-gray-800 min-h-[5px]" />
                      <p>United States</p>
                    </div>
                    <div className=" text-right md:text-left">
                      <p>Additional Customer Info:</p>
                      <p>Address: <input value={this.state.c_email} name="c_email" onChange={this.changetext} /></p>
                      <p>Phone: <input value={this.state.c_num} name="c_num" onChange={this.changetext} /></p>
                    </div>
                  </div>
                  <div className="container">
                    <table className="w-full sm:bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-200 border-b border-gray-100 rounded-sm">
                        <tr className=" flex-no mb-2">
                          <th className="p-3">Item</th>
                          <th className="p-3">Unit Cost</th>
                          <th className="p-3">Quantity</th>
                          <th className="p-3">Price</th>
                        </tr>
                      </thead>

                      <tbody id="table_item"></tbody>

                      <tfoot>
                        <tr className="total" id="subTotal">

                        </tr>

                        <tr className="total">
                          <td colSpan="3"></td>
                          <td className="pl-4 py-2 inputStyle">Total: $ {this.state.total_price}</td>
                        </tr>
                      </tfoot>
                    </table>

                    <div>
                      <p className="text-gray-600 text-lg leading-10">Note:</p>
                      <div>
                        <textarea name="note"
                          className="resize-none w-full rounded-md border-2 border-gray-400 outline-none text-lg p-5 placeholder-gray-600"
                          placeholder="Text Edit..."
                          id=""
                          cols="30"
                          rows="7"
                          value={this.state.note}
                          onChange={this.changetext}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentReport;
