import React from 'react';

import subscribeImg from '../Assets/images/subscribe.svg';

const Subscribe = () => {
    return (
        <div className='sm:px-14 py-[120px] bg-gradient-to-r from-white to-blue-100'>
            <div className="container mx-auto lg:max-w-[1080px] bg-no-repeat bg-left-top" style={{ backgroundImage: `url(${subscribeImg})` }}>
                <div className="flex justify-center sm:justify-end">
                    <div className="sm:max-w-[375px]">
                        <h2 className='font-bold text-[34px]'>Stay up to date</h2>
                        <p className='text-[#161b2bad] text-[17px] mt-5 mb-7'>We'll keep you updated on new features, strategies to boost academic achievement and more</p>

                        <form>
                            <div class="relative">
                                <input type="search" id="search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-[#000b2b0a] rounded-full border border-r-gray-400  focus:ring-blue-500 " placeholder="Search" required="" />
                                <button type="submit" class="text-white absolute right-1 bottom-[5px] bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3 ">Subscibe</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;