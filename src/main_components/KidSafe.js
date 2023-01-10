import React from 'react';

import kidImg from '../Assets/images/kid-safe.webp'

const KidSafe = () => {
    return (
        <div className='sm:px-14 py-[120px]'>
            <div className="container mx-auto lg:max-w-[1080px]">
                <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-center">
                    <div className="max-w-[400px]">
                        <h2 className='font-bold text-[34px]'>100% kid safe</h2>
                        <p className='text-[17px] text-gray-400 mt-5'>Lessons are taught by vetted and qualified college students. Always high-quality. Always age-appropriate.</p>
                        <button type="button" class="text-white bg-blue-600 hover:bg-opacity-95 outline-none font-semibold rounded-full text-[17px] px-[23px] py-[17px] text-center mt-6">Start Learning</button>
                    </div>
                    <div className="flex-grow ">
                        <div className="flex justify-center md:justify-end w-full">
                            <img src={kidImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KidSafe;