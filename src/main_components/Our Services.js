import React, { Component } from "react";

import "./style/App.css"
import "./style/animation.scss"

class OurServices extends Component {


    render() {
        return (
            <div>
                <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
                    <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                        <h2 className="font-bold text-[34px]">Our Services </h2>
                    </div>
                    <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

                        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                            <img src="https://cdn.devdojo.com/images/december2020/productivity.png" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 " />
                        </div>

                        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                Academic Subject Tutoring
                            </h2>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full" data-primary="yellow-400"><span className="text-sm font-bold">✓</span></span>
                                    We offer academic tutoring for any and all academic subjects, from K-12 level to advanced placement classes. Whether it’s mathematics, physics, chemistry, American litercvature, or world history, our subject specialists are ready to help students regardless of where they are in their curriculum.
                                </li>

                            </ul>
                        </div>

                        <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                College Admissions Coaching & Consulting
                            </h2>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full" data-primary="yellow-400"><span className="text-sm font-bold">✓</span></span>
                                    From school selection to providing feedback on personal statements, our college admission specialists are ready to assist students and families with all aspects of the application process.
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

                        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                            SAT/ACT Test Preparation
                            </h2>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full" data-primary="yellow-400"><span className="text-sm font-bold">✓</span></span>
                                    Whether your student is taking the SAT or the ACT, we have years of experience helping students prepare for test day with confidence.                                </li>

                            </ul>
                        </div>

                        <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                K-12 - Learning Pods and Small Group Instruction                            </h2>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full" data-primary="yellow-400"><span className="text-sm font-bold">✓</span></span>
                                    Our experienced, dedicated educators provide needed instruction and academic support for small group learning pods.                                </li>
                            </ul>
                        </div>

                        <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                                SHSAT/ISEE Test Preparation
                            </h2>
                            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full" data-primary="yellow-400"><span className="text-sm font-bold">✓</span></span>
                                    Our experienced, dedicated educators provide needed instruction and academic support for small group learning pods.                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default OurServices;