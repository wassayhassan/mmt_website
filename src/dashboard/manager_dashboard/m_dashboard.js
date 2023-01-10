import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import "./calendar.css";
import PaymentReport from "./invoice/PaymentReport";
import UserManagement from "../../user_management/user_management";
import M_invoice from "./m_invoice"
import DashboardBlogContents from "../../Blog/BlogContent";
import BlogWriting from "../../Blog/BlogWriting";
import BlogEdit from "../../Blog/BlogEdit";
import M_home from "./m_home";
import M_tools from "./m_tools";
import T_main from "../teacher_dashboard/t_main";
import Edit_PaymentReport from "./invoice/Edit_PaymentReport";

class M_Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginstate: false,
      clicked: 0,
      aid: "",
      invoice_id: ""
    };
    this.setclicked = this.setclicked.bind(this);
    this.setclickedbec = this.setclickedbec.bind(this);
    this.setclickedbackfrominvoice = this.setclickedbackfrominvoice.bind(this);
  }

  setclickedbec(num, aid) {
    this.setState({ clicked: num });
    this.setState({ aid: aid });
  }

  setclickedbackfrominvoice(num, invoice_id) {
    this.setState({ clicked: num });
    this.setState({ invoice_id: invoice_id });
  }


  setclicked(num) {
    this.setState({ clicked: num });
  }

  render() {
    return (
      <div>
        <main className="flex w-full h-auto overflow-auto">
          <aside className="w-80 h-[1200px] bg-gray w-fulll hidden sm:block bg-[#6F7986]">
            <div className="text-center text-[#E5E5E5] mt-4 mb-12 text-3xl font-bold">Manager</div>
            <div className="flex flex-col justify-between h-screen p-4">
              <div className="text-sm">
                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(0)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" w-6 h-6 text-slate-50 transition duration-75"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  <span className="ml-4">[notworking] Dashboard</span>
                </div>

                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" flex-shrink-0 w-6 h-6 text-slate-50 transition duration-75"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22.983 22H20c0-2.61-1-4.986-2.637-6.767zm-2.023-2.276A7.98 7.98 0 0 0 18 7a7.964 7.964 0 0 0-1.015-3.903A5 5 0 0 1 21 8a4.999 4.999 0 0 1-5.66 4.957z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  <span className="ml-4">Students</span>
                </div>

                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" flex-shrink-0 w-6 h-6 text-slate-50 transition duration-75"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  <span className="ml-4">BlogWriting</span>
                </div>

                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(3)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" flex-shrink-0 w-6 h-6 text-slate-50 transition duration-75"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M21 4H7a2 2 0 1 0 0 4h14v13a1 1 0 0 1-1 1H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h13a1 1 0 0 1 1 1v1zm-1 3H7a1 1 0 1 1 0-2h13v2z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  <span className="ml-4">Invoice</span>
                </div>

                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(4)}
                >
                  <svg
                    aria-hidden="true"
                    className=" flex-shrink-0 w-6 h-6 text-slate-50 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-4">Tools</span>
                </div>

                <div
                  className="flex items-center p-2 text-sm text-slate-50 font-semibold rounded-lg hover:bg-[#C0C0C0] focus:bg-[#C0C0C0]"
                  onClick={() => this.setclicked(5)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" flex-shrink-0 w-6 h-6 text-slate-50 transition duration-75"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M17 9.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4.2zM5 8v2h2V8H5z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  <span className="ml-4">[notworking] Class schedule</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="w-full h-[1200px]">
            {this.state.clicked == 0 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <M_home handleBackClick={this.setclicked} />
              </div>
            }
            {this.state.clicked == 1 && (
              <div className="h-[1200px] pl-20 pr-20 pt-4 bg-[#E5E5E5]" style={{ paddingBottom: "100px" }}>
                <UserManagement />
              </div>
            )}
            {this.state.clicked == 2 && (
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <DashboardBlogContents handleAddClick={this.setclickedbec} />
              </div>
            )}
            {this.state.clicked == 21 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <BlogEdit handleBackClick={this.setclicked} aid={this.state.aid} />
              </div>
            }
            {this.state.clicked == 22 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <BlogWriting handleBackClick={this.setclicked} />
              </div>
            }
            {this.state.clicked == 3 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <M_invoice handleAddClick={this.setclickedbackfrominvoice} />
              </div>
            }
            {this.state.clicked == 31 &&
              <PaymentReport />
            }
            {this.state.clicked == 32 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <Edit_PaymentReport handleBackClick={this.setclickedbackfrominvoice} invoice_id={this.state.invoice_id} />
              </div>
            }
            {this.state.clicked == 4 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <M_tools handleAddClick={this.setclicked} />
              </div>
            }
            {this.state.clicked == 5 &&
              <div className="h-[1200px] pl-20 pr-20 pt-10 bg-[#E5E5E5]" style={{ paddingBottom: "60px" }}>
                <T_main handleAddClick={this.setclicked} />
              </div>
            }
          </section>
        </main>
      </div>
    );
  }
}

export default M_Dashboard;
