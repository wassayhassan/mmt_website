
import React, { Component } from 'react';

class T_top_menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.changetab = this.changetab.bind(this);
    }

    changetab(num) {
        this.props.setclicked(num);
        for (let i = 1; i < 4; i++) {
            var main = document.getElementById("btn" + i);
            if (i == num) {
                main.className = "leading-[32px] tracking-[-0.02em] text-[16px] font-[600] rounded-[5px] md:pl-[17px]  md:pr-[17px]  md:h-[36px] text-center  max-w-[103px] bg-[#374557] text-[#E7E7E7] font-bold";
            } else {
                main.className = "leading-[32px] text-[#374557] tracking-[-0.02em] text-[16px] font-[600] rounded-[5px] md:pl-[17px]  md:pr-[17px]  md:h-[36px]  font-bold";
            }
        }
    }

    render() {
        return (
            <>
                <div className="max-ml-[110px] ml-[3%] max-mr-[97px] mr-[3%] mb-[35px] bg-white">
                    <div className=" relative bg-[]">
                        <div className="">
                            <img src="/images/image 72.svg" className="w-[100vw] rounded-t-[30px]" />
                            <img src="/images/edit-246 1.svg"
                                className="hidden absolute  right-2 top-[16%] md:top-[50%]  lg:top-[50%] xl:top-[65%] w-[43px]" />
                            <img src="/images/Avatar.svg"
                                className="w-[5]  h-[15%] md:mt-[-3%] mt-[-1%] scale-[200%] ml-[4%]  rounded-full absolute  border-solid border-[2px] border-[#374557] " />
                        </div>
                        <div className="w-[100%] h-[81px] bg-[#E7E7E7] flex pl-[12%] justify-start items-center gap-[5%] rounded-b-[30px]">
                            <button onClick={() => this.changetab(1)} id="btn1" className="leading-[32px] tracking-[-0.02em] text-[16px] font-[600] rounded-[5px] md:pl-[17px]  md:pr-[17px]  md:h-[36px] text-center  max-w-[103px] bg-[#374557] text-[#E7E7E7] font-bold">
                                Dashboard
                            </button>
                            <button onClick={() => this.changetab(2)} id="btn2" className="leading-[32px] text-[#374557] tracking-[-0.02em] text-[16px] font-[600] rounded-[5px] md:pl-[17px]  md:pr-[17px]  md:h-[36px]  font-bold">
                                Calendar
                            </button>
                            <button onClick={() => this.changetab(3)} id="btn3" className="leading-[32px] text-[#374557] tracking-[-0.02em] text-[16px] font-[600] rounded-[5px] md:pl-[17px]  md:pr-[17px]  md:h-[36px]  font-bold">
                                Personal
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default T_top_menu;
