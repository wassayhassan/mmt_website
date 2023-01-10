import React from 'react';
import { MdOutlineDone } from 'react-icons/md'
import { AiOutlineMinus } from 'react-icons/ai'

const Instruction = () => {
    return (
        <div className='sm:px-14 py-[120px]'>
            <div className="container mx-auto lg:max-w-[1080px]">
                <div className=" flex w-full">
                    <div className="max-w-[455px] min-w-[200px] px-[26px] pb-[58px]">
                        <h2 className='font-bold text-xl lg:text-[28px] py-[23px]'>Much more than just quality instruction</h2>
                        <p className=' py-[23px] text-gray-500 border-b border-gray-100'>1:1 mentorship with instructors from top US universities </p>
                        <p className=' py-[23px] text-gray-500 border-b border-gray-100'>Real-time learning and collaboration</p>
                        <p className=' py-[23px] text-gray-500 border-b border-gray-100'>$20/hour or $10 for 30-mins for all lessons</p>
                        <p className=' py-[23px] text-gray-500 border-b border-gray-100'>Curricula focused on creativity and discovery</p>
                        <p className=' py-[23px] text-gray-500 border-b border-gray-100'> Virtual classroom designed for online tutoring</p>
                    </div>
                    <div className=" flex items-center">
                        <div className="flex flex-col items-center  bg-blue-500 rounded-2xl px-[26px] py-[58px] lg:p-[58px]">
                            <h3 className='font-bold text-[17px] py-6 text-white'>GoPeer</h3>
                            <div className="flex flex-col">
                                <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-white text-blue-600 rounded-full'>
                                    <MdOutlineDone />
                                </div>
                                <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-white text-blue-600 rounded-full'>
                                    <MdOutlineDone />
                                </div>
                                <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-white text-blue-600 rounded-full'>
                                    <MdOutlineDone />
                                </div>
                                <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-white text-blue-600 rounded-full'>
                                    <MdOutlineDone />
                                </div>
                                <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-white text-blue-600 rounded-full'>
                                    <MdOutlineDone />
                                </div>
                            </div>
                        </div>
                        <div className=" flex">
                            <div className='hidden md:block'>
                                <div className="flex flex-col items-center bg-[#f5f5f7] p-[26px] lg:p-8">
                                    <h3 className='text-gray-600 text-[15px] py-2.5 lg:mx-4 whitespace-nowrap'>Other Online <br /> Academies</h3>
                                    <div className="flex flex-col">
                                        <div className='w-5 h-5 my-6 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden md:block'>
                                <div className="flex flex-col items-center  bg-[#f5f5f7] p-[26px] py-8">
                                    <h3 className='text-gray-600 text-[15px] py-2.5 whitespace-nowrap'>Other Online <br /> Academies</h3>
                                    <div className="flex flex-col">
                                        <div className='w-5 h-5 my-6 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col items-center  bg-[#f5f5f7] rounded-2xl rounded-tl-none rounded-bl-none p-[26px] lg:p-8">
                                    <h3 className='text-gray-600 text-[15px] py-2.5 lg:mx-4 whitespace-nowrap hidden md:block'>Other Online <br /> Academies</h3>
                                    <h3 className='text-gray-600 text-[15px] py-2.5 lg:mx-4 whitespace-nowrap  md:hidden'>Other</h3>
                                    <div className="flex flex-col">
                                        <div className='w-5 h-5 my-6 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-blue-500 text-white rounded-full'>
                                            <MdOutlineDone />
                                        </div>
                                        <div className='w-5 h-5 my-[23px] border-b border-gray-50 flex justify-center items-center bg-gray-400 text-white rounded-full'>
                                            <AiOutlineMinus />
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
};

export default Instruction;