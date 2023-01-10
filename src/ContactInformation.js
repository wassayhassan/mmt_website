import React, { useState, useEffect } from 'react';

import './App.css';

function ContactInformation() {
  return (
  <div>

<section className="relative px-6 overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 md:px-8">
    <div className="relative flex flex-wrap py-5 mx-auto md:py-3 max-w-7xl sm:pr-5 md:pr-0 sm:flex-nowrap sm:justify-center sm:items-center">
        <div className="inline-flex items-center order-1 w-11/12 max-w-screen-sm mb-2 text-sm text-white sm:order-none sm:w-auto md:text-base sm:mb-0">
            <span className="hidden mr-2 text-2xl md:block">🎉</span> This is a simple call to action bar that can draw your users attention
        </div>

        <a href="#" className="order-last inline-block w-full px-4 py-3 text-sm font-semibold text-center text-indigo-600 transition duration-100 rounded-md outline-none sm:py-2 sm:order-none sm:w-auto sm:ml-4 bg-indigo-50 hover:bg-white active:bg-white focus-visible:ring ring-indigo-300 whitespace-nowrap">Learn more</a>
    </div>
</section>

<div className="py-10 bg-white md:py-16">
    <div className="px-10 mx-auto max-w-7xl md:px-16">
        <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            <p className="text-xs font-bold text-blue-500 uppercase">Contact Us</p>
            <h2 className="mt-1 text-2xl font-bold text-left text-gray-800 lg:text-3xl md:mt-2">Need to ask us a question?</h2>
            <p className="max-w-screen-md mx-auto mt-4 text-left text-gray-500 md:text-lg md:mt-6">
                Fill out the form below and we'll do some research on our end and get back to you within 24-48 hours. For specific technical issues, please visit our <a href="#_" className="font-medium text-blue-500 underline">developer help center</a>.
            </p>
        </div>
        <form className="grid max-w-3xl gap-4 mx-auto sm:grid-cols-2">
            <div>
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">First name</label>
                <input name="first-name" className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300" />
            </div>

            <div>
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Last name</label>
                <input name="last-name" className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300" />
            </div>

            <div className="sm:col-span-2">
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Company</label>
                <input name="company" className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300" />
            </div>

            <div className="sm:col-span-2">
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Email</label>
                <input name="email" className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300" />
            </div>

            <div className="sm:col-span-2">
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Subject</label>
                <input name="subject" className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300" />
            </div>

            <div className="sm:col-span-2">
                <label className="inline-block mb-2 text-sm font-medium text-gray-500 sm:text-base">Message</label>
                <textarea name="message" className="w-full h-64 px-3 py-2 text-gray-800 transition duration-100 border rounded-md outline-none bg-gray-50 focus:ring ring-blue-300"></textarea>
            </div>

            <div className="flex items-center justify-between sm:col-span-2">
                <button className="inline-block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 bg-blue-600 rounded-md outline-none hover:bg-blue-500 active:bg-blue-700 ring-blue-300 md:text-base">Send Message</button>
            </div>
        </form>
        <p className="max-w-3xl mx-auto mt-5 text-xs text-gray-400">
            Please allow up to 24-48 hour response during the weekdays.
        </p>
    </div>
</div>


<section className="w-full flex bg-gray-50">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center space-y-5">
            <h2 className="text-base font-semibold text-pink-400 tracking-wide uppercase">Get started today</h2>
            <div className="inline-flex items-end justify-center w-full text-center mx-auto">
                <img src="https://cdn.devdojo.com/tails/avatars/067.jpg" className="absolute transform translate-x-24 ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white" />
                <img src="https://cdn.devdojo.com/tails/avatars/019.jpg" className="absolute transform -translate-x-24 -ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white" />
                <img src="https://cdn.devdojo.com/tails/avatars/036.jpg" className="absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white" />
                <img src="https://cdn.devdojo.com/tails/avatars/008.jpg" className="absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white" />
                <img src="https://cdn.devdojo.com/tails/avatars/003.jpg" className="rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white relative" />
            </div>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Join <span className="px-2 py-1 relative inline-block"><svg className="stroke-current bottom-0 absolute text-pink-400 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg"><path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" stroke-width="11.2" fill="none" fill-rule="evenodd" stroke-linecap="round"></path></svg><span className="relative">20,433</span></span> Happy Customers</p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">We've designed the ultimate tools to help you craft the ultimate user experience. Don't just show your product to your users, instead, tell them your story.</p>
            <a href="#_" className="text-white px-8 py-4 inline-block mt-5 font-medium text-lg bg-gray-900 focus:ring-4 focus:ring-gray-900 focus:ring-offset-2 rounded-xl">Join Us Today</a>
        </div>
    </div>
</section>



  </div>
  )
}

export default ContactInformation;
