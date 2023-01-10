import React, { Component } from "react";
import $ from 'jquery';
import privateImg1 from '../Assets/images/Private-Tutoring-1.webp'
import privateImg2 from '../Assets/images/Private-Tutoring-2.webp'
import privateImg3 from '../Assets/images/Private-Tutoring-3.webp'
import privateImg4 from '../Assets/images/Private-Tutoring-4.webp'
import StickyBox from "react-sticky-box";

import "./style/App.css"
import "./style/animation.scss"

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu ul li a').removeClass("active2");
            currLink.addClass("active2");
        } else {
            currLink.removeClass("active2");
        }
    });
}
class PrivateTutoring extends Component {
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
                $(this).removeClass('active2');
            })
            $(this).addClass('active2');

        });
    }
    render() {
        return (
            <div className="sm:px-14 md:py-[120px] min-h-screen">
                <div className="container mx-auto">
                    <div className="hidden md:block">
                        <div className='flex flex-row-reverse lg:max-w-[1080px] mx-auto'>
                            <div className="flex-1 pl-8">
                                <StickyBox offsetTop={200} offsetBottom={20}>
                                    <div>
                                        <h2 className="font-bold text-[34px]">How GoPeer works</h2>
                                        <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">GoPeer pairs vetted college students who attend top US universities with students for 1-to-1 tutoring lessons.</p>
                                    </div>
                                    <div className="right-sidebar">
                                        <div id="menu">
                                            <ul className="my-14 flex flex-col gap-3 border-l border-gray-200">
                                                <li className="">
                                                    <a href="#4" className='active2 py-4 px-2'>
                                                        <h2 className='text-17px font-bold'>Collaborative Whiteboard</h2>
                                                        <p className='text-[15px] text-[#11182b8f]'>To help students understand concepts</p>
                                                    </a>
                                                </li>

                                                <li className="">
                                                    <a href="#5" className='active2 py-4 px-2'>
                                                        <h2 className='text-17px font-bold'>Notes, Code, and Screen Sharing</h2>
                                                        <p className='text-[15px] text-[#11182b8f]'>Edit essays, code, or share screens</p>
                                                    </a>
                                                </li>

                                                <li className="">
                                                    <a href="#6" className='active2 py-4 px-2'>
                                                        <h2 className='text-17px font-bold'>Playback Lesson Recordings</h2>
                                                        <p className='text-[15px] text-[#11182b8f]'>All sessions can be recorded for playback later.</p>
                                                    </a>
                                                </li>

                                                <li className="">
                                                    <a href="#7" className='active2 py-4 px-2'>
                                                        <h2 className='text-17px font-bold'>Content and Curriculum</h2>
                                                        <p className='text-[15px] text-[#11182b8f]'>Bring your own material or utilize GoPeer’s content and curriculum</p>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </StickyBox>
                            </div>
                            <div className="flex-1 mt-[120px] ml-12 top-0 hidden md:block">
                                <div className="flex flex-col gap-5">
                                    <section className="py-32" id="4">
                                        <img src={privateImg1} alt="" className=' lg:max-w-[630px]' />
                                    </section>

                                    <section className="py-32" id="5">
                                        <img src={privateImg2} alt="" className=' lg:max-w-[630px]' />
                                    </section>

                                    <section className="py-32" id="6">
                                        <img src={privateImg3} alt="" className=' lg:max-w-[630px]' />
                                    </section>
                                    <section className="py-32" id="7">
                                        <img src={privateImg4} alt="" className=' lg:max-w-[630px]' />
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* privet for small devices  */}

                    <div className="md:hidden">
                        <div className='flex flex-col gap-3 mx-auto'>
                            <div className="pl-8">
                                <div>
                                    <h2 className="font-bold text-[34px]">How GoPeer works</h2>
                                    <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">GoPeer pairs vetted college students who attend top US universities with students for 1-to-1 tutoring lessons.</p>
                                </div>
                            </div>
                            <div className="flex-1  ml-12 top-0 ">
                                <div className="flex gap-4 overflow-x-scroll">
                                    <div className='min-w-[300px]'>
                                        <img src={privateImg1} alt="" className=' lg:max-w-[464px]' />
                                        <div className=' py-4 px-2'>
                                            <h2 className='text-17px font-bold'>Collaborative Whiteboard</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>To help students understand concepts</p>
                                        </div>
                                    </div>
                                    <div className='min-w-[300px]'>
                                        <img src={privateImg2} alt="" className=' lg:max-w-[464px]' />
                                        <div className=' py-4 px-2'>
                                            <h2 className='text-17px font-bold'>Notes, Code, and Screen Sharing</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>Edit essays, code, or share screens</p>
                                        </div>
                                    </div>
                                    <div className='min-w-[300px]'>
                                        <img src={privateImg3} alt="" className=' lg:max-w-[464px]' />
                                        <div className=' py-4 px-2'>
                                            <h2 className='text-17px font-bold'>Playback Lesson Recordings</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>All sessions can be recorded for playback later.</p>
                                        </div>
                                    </div>
                                    <div className='min-w-[300px]'>
                                        <img src={privateImg4} alt="" className=' lg:max-w-[464px]' />
                                        <div className=' py-4 px-2 '>
                                            <h2 className='text-17px font-bold'>Content and Curriculum</h2>
                                            <p className='text-[15px] text-[#11182b8f]'>Bring your own material or utilize GoPeer’s content and curriculum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default PrivateTutoring;