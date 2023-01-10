import React, { Component } from "react";
import workImage1 from '../Assets/images/work-image-1.webp'
import workImage2 from '../Assets/images/work-image-2.webp'
import workImage3 from '../Assets/images/work-image-3.webp'

import people from '../Assets/images/people.png'
import notepad from '../Assets/images/notepad.png'
import dollartag from '../Assets/images/dollar-tag.png'
import $ from 'jquery';
import StickyBox from "react-sticky-box";

import "./style/App.css"
import "./style/animation.scss"

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu ul li a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}


class HowItWorks extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');

        });
    }

    render() {
        return (
            <div>
                <div className="hidden md:block">
                    <section className="px-2 py-32 bg-white md:px-0">
                        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                            <div className="flex flex-wrap items-center sm:-mx-3">
                                <div style={{ display: "flex", alignItems: "flex-start" }}>


                                    <StickyBox offsetTop={200} offsetBottom={20}>

                                        <div>
                                            <h2 className="font-bold text-[34px]">HOW ARE WE UNIQUE?</h2>
                                            <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">The Best Learning Experience - “We offer what actually works”</p>
                                        </div>


                                        <div className="left-sidebar">
                                            <div id="menu">
                                                <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                                                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                                        <a href="#1" className='active flex justify-start items-center p-[26px] hover:bg-gray-100 max-w-[357px] focus:scale-100 rounded-3xl'>
                                                            <span>
                                                                <img src={people} className="w-[93px] h-[62px]" />
                                                            </span>
                                                            <div className="flex justify-center text-left flex-col">
                                                                <h2 className='text-17px font-bold'>#1 Private and Small Group Instruction</h2>
                                                                <p className='text-[15px] text-[#11182b8f]'>Your child will learn in the best way suited for them</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                                        <a href="#2" className='active flex justify-start items-center p-[26px] hover:bg-gray-100 max-w-[357px] focus:scale-100 rounded-3xl'>
                                                            <span>
                                                                <img src={dollartag} className="w-[121px] h-[62px]" />
                                                            </span>
                                                            <div className="flex justify-center text-left flex-col">
                                                                <h2 className='text-17px font-bold'>#2 Competitive Pricing</h2>
                                                                <p className='text-[15px] text-[#11182b8f]'>There is no large upfront cost. We offer our service for continuous bases</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                                                        <a href="#3" className='active flex justify-start items-center p-[26px] hover:bg-gray-100 max-w-[357px] focus:scale-100 rounded-3xl'>
                                                            <span>
                                                            <img src={notepad} className="w-[62px] h-[62px]" />
                                                            </span>
                                                            <div className="flex justify-center text-left flex-col">
                                                                <h2 className='text-17px font-bold'>#3 Results</h2>
                                                                <p className='text-[15px] text-[#11182b8f]'>150+ subjects available</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </StickyBox>


                                    <div style={{ height: 'auto', width: '60%' }}>
                                        <section className="section px-2 py-32" id="1" style={{ height: 'auto' }}>
                                            <img src={workImage1} alt="" className=' lg:max-w-[630px]' />

                                        </section>

                                        <section className="section px-2 py-32" id="2" style={{ height: 'auto' }}>
                                            <img src={workImage2} alt="" className=' lg:max-w-[630px]' />
                                        </section>

                                        <section className="section px-2 py-32" id="3" style={{ height: 'auto' }}>
                                            <img src={workImage3} alt="" className=' lg:max-w-[630px]' />
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

                {/* how is work for mobile devices */}
                <div className="md:hidden">
                    <div className="flex flex-col">
                        <div className="">
                            <div >
                                <h2 className="font-bold text-[34px]">HOW ARE WE UNIQUE?</h2>
                                <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">GoPeer pairs vetted college students who attend top US universities with students for 1-to-1 tutoring lessons.</p>
                            </div>
                        </div>
                        <div className="">
                            <div className='flex mt-5 flex-nowrap gap-1 overflow-x-scroll'>
                                <div className=" min-w-[320px] max-w-[426px]">
                                    <img src={workImage1} alt="" className=' w-full' />
                                    <div className='flex justify-start items-center p-[26px] hover:bg-gray-100  focus:scale-100 rounded-2xl rounded-tr-none rounded-tl-none'>
                                        <span>
                                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2827 16.2827C14.4668 18.0987 14.4668 21.0214 14.4668 26.8668V27.9001C14.4668 33.7455 14.4668 36.6683 16.2827 38.4842C18.0987 40.3001 21.0214 40.3001 26.8668 40.3001H27.8977C26.0564 38.7395 24.8943 36.4512 24.8943 33.9011C24.8943 29.1983 28.8466 25.3859 33.722 25.3859C36.3355 25.3859 38.6838 26.4815 40.3001 28.2224C40.3001 28.116 40.3001 28.0086 40.3001 27.9001V26.8668C40.3001 21.0214 40.3001 18.0987 38.4842 16.2827C36.6683 14.4668 33.7455 14.4668 27.9001 14.4668H26.8668C21.0214 14.4668 18.0987 14.4668 16.2827 16.2827Z" fill="#1A1B1E"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M33.8681 23.0044C27.5541 23.0044 22.4355 27.9401 22.4355 34.0286C22.4355 40.1171 27.5541 45.0528 33.8681 45.0528C36.128 45.0528 38.2347 44.4206 40.0084 43.3294L45.6552 48.6368L45.8468 48.8021C46.5156 49.2979 47.4637 49.2415 48.0688 48.6337C48.7344 47.9651 48.733 46.8825 48.0657 46.2157L42.6318 41.1084C44.2976 39.1932 45.3006 36.7238 45.3006 34.0286C45.3006 27.9401 40.1821 23.0044 33.8681 23.0044ZM33.6853 25.9037C38.2789 25.9037 42.0027 29.5453 42.0027 34.0374C42.0027 38.5295 38.2789 42.1711 33.6853 42.1711C29.0917 42.1711 25.3679 38.5295 25.3679 34.0374C25.3679 29.5453 29.0917 25.9037 33.6853 25.9037Z" fill="#0079FD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M33.8677 23.7795C27.9549 23.7795 23.2102 28.3946 23.2102 34.0287C23.2102 39.6629 27.9549 44.278 33.8677 44.278C35.9815 44.278 37.9481 43.6868 39.602 42.6694L40.1069 42.3588L46.1735 48.0609L46.3277 48.1939C46.6906 48.4484 47.1953 48.4124 47.5192 48.087C47.8809 47.7237 47.8824 47.1364 47.5246 46.7711L41.5573 41.1626L42.0467 40.5999C43.5965 38.818 44.5252 36.527 44.5252 34.0287C44.5252 28.3946 39.7805 23.7795 33.8677 23.7795ZM21.6602 34.0287C21.6602 27.4859 27.1525 22.2295 33.8677 22.2295C40.5829 22.2295 46.0752 27.4859 46.0752 34.0287C46.0752 36.6555 45.1865 39.0807 43.6885 41.0385L48.6047 45.6592L48.6131 45.6676C49.5828 46.6366 49.5849 48.2091 48.6176 49.1806C47.7372 50.0649 46.3583 50.1464 45.3849 49.4248L45.3619 49.4078L45.1361 49.213L39.8983 44.2899C38.1178 45.2694 36.0587 45.828 33.8677 45.828C27.1525 45.828 21.6602 40.5716 21.6602 34.0287ZM24.5925 34.0375C24.5925 29.1012 28.6797 25.1288 33.6849 25.1288C38.6901 25.1288 42.7773 29.1012 42.7773 34.0375C42.7773 38.9739 38.6901 42.9462 33.6849 42.9462C28.6797 42.9462 24.5925 38.9739 24.5925 34.0375ZM33.6849 26.6788C29.503 26.6788 26.1425 29.9897 26.1425 34.0375C26.1425 38.0854 29.503 41.3962 33.6849 41.3962C37.8669 41.3962 41.2273 38.0854 41.2273 34.0375C41.2273 29.9897 37.8669 26.6788 33.6849 26.6788Z" fill="#0079FD"></path></svg>
                                        </span>
                                        <div className="flex justify-center text-left flex-col">
                                            <h2 className='text-17px font-bold'>Find your perfect tutor</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>150+ subjects available</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" min-w-[320px] max-w-[426px]">
                                    <img src={workImage2} alt="" className=' w-full' />
                                    <div className='flex justify-start items-center p-[26px] hover:bg-gray-100  focus:scale-100 rounded-2xl rounded-tr-none rounded-tl-none'>
                                        <span>
                                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5615 40.3213C12.1863 35.8031 15.4023 31.7859 19.8925 31.164L22.8239 30.758L26.4361 30.6747C30.6029 30.5785 34.129 33.7491 34.4739 37.9022C35.2962 42.6468 31.7986 47.0373 26.9908 47.2953L24.2098 47.4446L20.0061 48.1133C15.9544 48.7578 12.3396 45.4816 12.5848 41.3869C12.603 41.0828 12.5995 40.7777 12.5742 40.474L12.5615 40.3213Z" fill="#1A1B1E"></path><path d="M17.8913 24.0116C17.6619 21.2491 19.6002 18.7818 22.338 18.3513C22.602 18.3098 22.8689 18.2883 23.1362 18.2871L23.3325 18.2861C25.9943 18.2735 28.2213 20.3131 28.4416 22.9653C28.8968 25.9748 26.6557 28.7554 23.6153 28.8925L23.0667 28.9937C20.3581 29.4935 17.8715 27.3697 17.9415 24.6163L17.8913 24.0116Z" fill="#1A1B1E"></path><path d="M30.8001 20.9906C30.5811 15.8148 34.5996 11.4469 39.7756 11.2345C44.9517 11.0222 49.3252 15.0459 49.5443 20.2216L49.6079 21.7249C49.862 27.7308 45.199 32.7994 39.1927 33.0458L31.3239 33.3686L28.0285 33.5038C26.5638 33.5638 25.9102 31.6862 27.0968 30.8267C29.593 29.0184 31.0154 26.0785 30.885 22.997L30.8637 22.4938L30.8001 20.9906Z" fill="#0079FD"></path><rect width="5.51718" height="3.10672" rx="1.55336" transform="matrix(-0.860616 -0.510412 -0.532871 0.845483 42.5215 19.0288)" fill="white"></rect><rect width="9.65507" height="3.10672" rx="1.55336" transform="matrix(0.860616 0.510412 0.532871 -0.845483 33.9102 22.3418)" fill="white"></rect></svg>
                                        </span>
                                        <div className="flex justify-center text-left flex-col">
                                            <h2 className='text-17px font-bold'>Find your perfect tutor</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>150+ subjects available</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" min-w-[320px] max-w-[426px]">
                                    <img src={workImage3} alt="" className=' w-full' />
                                    <div className='flex justify-start items-center p-[26px] hover:bg-gray-100  focus:scale-100 rounded-2xl rounded-tr-none rounded-tl-none'>
                                        <span>
                                            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3965 28.6628C13.3965 23.3654 13.3965 20.7167 15.0422 19.071C16.6879 17.4253 19.3366 17.4253 24.634 17.4253H33.6205C38.9179 17.4253 41.5666 17.4253 43.2123 19.071C44.858 20.7167 44.858 23.3654 44.858 28.6628V29.601C44.858 34.8984 44.858 37.5471 43.2123 39.1928C41.5666 40.8385 38.9179 40.8385 33.6205 40.8385H24.634C19.3366 40.8385 16.6879 40.8385 15.0422 39.1928C13.3965 37.5471 13.3965 34.8984 13.3965 29.601V28.6628Z" fill="#1A1B1E"></path><path d="M20.7286 32.4701C21.9602 27.8734 22.5761 25.575 24.3704 24.5071C24.4094 24.4839 24.4487 24.4611 24.4884 24.439C26.3104 23.419 28.6087 24.0349 33.2054 25.2666L41.3091 27.4379C45.9058 28.6696 48.2041 29.2854 49.272 31.0797C49.2953 31.1188 49.318 31.1581 49.3402 31.1978C50.3601 33.0197 49.7443 35.3181 48.5126 39.9148C47.2809 44.5115 46.6651 46.8098 44.8708 47.8777C44.8318 47.901 44.7924 47.9237 44.7528 47.9459C42.9308 48.9658 40.6325 48.35 36.0358 47.1183L27.9321 44.9469C23.3354 43.7152 21.037 43.0994 19.9691 41.3051C19.9459 41.2661 19.9232 41.2267 19.901 41.1871C18.881 39.3651 19.4969 37.0668 20.7286 32.4701Z" fill="#0079FD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M40.6402 46.8334C39.5378 46.6288 38.1901 46.2679 36.4359 45.7981L28.3424 43.6305C26.4232 43.1166 24.9905 42.7329 23.8928 42.3201C25.4426 39.3897 28.6726 37.5989 32.1367 38.0188L33.207 38.1485L35.3502 38.6922C38.9624 39.6085 41.2717 43.1672 40.6402 46.8334Z" fill="white"></path><path d="M31.2054 32.3264C31.5633 30.3073 33.4158 28.921 35.4523 29.1483C35.6429 29.1696 35.8319 29.2049 36.0176 29.254L36.2588 29.3177C38.1067 29.8056 39.2785 31.6383 38.9452 33.5189C38.7114 35.7101 36.637 37.2002 34.4867 36.7216L34.4051 36.7034L33.8882 36.6592C31.9185 36.4907 30.5889 34.5446 31.1483 32.6487L31.2054 32.3264Z" fill="white"></path><ellipse cx="46.2416" cy="33.2053" rx="1.43821" ry="1.43821" transform="rotate(15 46.2416 33.2053)" fill="white"></ellipse></svg>
                                        </span>
                                        <div className="flex justify-center text-left flex-col">
                                            <h2 className='text-17px font-bold'>Find your perfect tutor</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>150+ subjects available</p>
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

export default HowItWorks;