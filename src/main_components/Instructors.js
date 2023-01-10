import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { AiFillStar } from 'react-icons/ai'

import instructors1 from '../Assets/images/instructors-1.webp'
import instructors2 from '../Assets/images/instructors-2.webp'
import instructors3 from '../Assets/images/instructors-3.webp'


const Instructors = () => {
    const instructorsContainer = useRef(null)
    const instructorsLeft = useRef(null)
    const instructorsRight = useRef(null)
    useEffect(() => {
        const instructorsContan = instructorsContainer.current;
        const instructorsLeftContainer = instructorsLeft.current;
        const instructorsRightContainer = instructorsRight.current;

        gsap.fromTo(instructorsRightContainer, {}, {
            scrollTrigger: {
                trigger: instructorsContan,
                pin: instructorsLeftContainer,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pinSpacing: false,

            }
        })
    });
    return (
        <div className='sm:px-14 py-[120px]'>
            <div className="container mx-auto">
                <div className='hidden md:block' >
                    <div className=" flex lg:max-w-[1080px] mx-auto" ref={instructorsContainer}>
                        <div className="flex-1 " ref={instructorsLeft}>
                            <div className="flex items-center h-full">
                                <div>
                                    <h2 className="font-bold text-[34px]">Meet your inspiring instructors</h2>
                                    <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">Tutors are selected from top US universities like Harvard, MIT, and UC Berkeley.</p>
                                    <div className='flex justify-start mt-5'>
                                        <img src={instructors1} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                        <img src={instructors2} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                        <img src={instructors3} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex-1" ref={instructorsRight}>
                            <div className="flex flex-col">
                                <div className='bg-black bg-opacity-5 mb-7 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                                <div className='bg-black bg-opacity-5 mb-7 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                                <div className='bg-black bg-opacity-5 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* instructors for small devices  */}

                <div className='md:hidden'>
                    <div className=" flex flex-col gap-5" >
                        <div className="">
                            <div className="flex items-center h-full">
                                <div>
                                    <h2 className="font-bold text-[34px]">Meet your inspiring instructors</h2>
                                    <p className="text-[17px] mt-5 text-[#161b2bad] max-w-lg">Tutors are selected from top US universities like Harvard, MIT, and UC Berkeley.</p>
                                    <div className='flex justify-start mt-5'>
                                        <img src={instructors1} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                        <img src={instructors2} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                        <img src={instructors3} alt="" className='w-[70px] h-[70px] block rounded-full p-1 mr-4 hover:ring-[3px] focus:ring-[3px] focus:ring-gray-800 cursor-pointer ring-gray-800 object-cover object-center' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="" >
                            <div className="flex  gap-1 overflow-x-scroll">
                                <div className='min-w-[300px] bg-black bg-opacity-5 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                                <div className='min-w-[300px] bg-black bg-opacity-5 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                                <div className='min-w-[300px] bg-black bg-opacity-5 ml-auto max-w-[372px] rounded-2xl text-left p-[42px] border-[3px] border-gray-300'>
                                    <h4 className='text-17px font-bold mb-1'>Annie</h4>
                                    <p className='text-[15px] text-[#11182b8f]'>Carnegie Mellon University</p>
                                    <span className='flex justify-start my-2 '>
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                        <AiFillStar className='text-yellow-400 mr-1 text-lg' />
                                    </span>
                                    <p className='text-[19px] text-[#1a1b1e]'>Hi, I am a student at Carnegie Mellon University, majoring in Chemical Engineering and</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructors;