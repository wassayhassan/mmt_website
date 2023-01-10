import React from 'react';
import {Modal} from 'flowbite-react';


const Reminder = ({handleCallStart,callReminder, setCallReminder}) => {

    const handleOpen = () => {
        setCallReminder(true)
    }


    return(
        <React.Fragment>
                <svg width="24px" height="24px" viewBox="0 0 24 24" id="call" xmlns="http://www.w3.org/2000/svg" onClick={()=> handleOpen()} className="cursor-pointer">
                    <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none" />
                    <path id="Shape" d="M7.02,15.976,5.746,13.381a.7.7,0,0,0-.579-.407l-1.032-.056a.662.662,0,0,1-.579-.437,9.327,9.327,0,0,1,0-6.5.662.662,0,0,1,.579-.437l1.032-.109a.7.7,0,0,0,.589-.394L7.03,2.446l.331-.662a.708.708,0,0,0,.07-.308.692.692,0,0,0-.179-.467A3,3,0,0,0,4.693.017l-.235.03L4.336.063A1.556,1.556,0,0,0,4.17.089l-.162.04C1.857.679.165,4.207,0,8.585V9.83c.165,4.372,1.857,7.9,4,8.483l.162.04a1.556,1.556,0,0,0,.165.026l.122.017.235.03a3,3,0,0,0,2.558-.993.692.692,0,0,0,.179-.467.708.708,0,0,0-.07-.308Z" transform="translate(3.887 6.093) rotate(-30)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1.5" />
                </svg>                       
            <Modal
                show={callReminder}
                onClose={()=> setCallReminder(false)}
            >
                 <div className="2xl:container 2xl:mx-auto py-28 lg:py-5 px-4 md:px-28 flex justify-center items-center lg:h-[500px]">
                            <div className="dark:bg-gray-800 relative justify-center items-center bg-white rounded-3xl w-[600px] lg:h-full">
                                <h1 className="text-center text-4xl font-bold pt-[15px] lg:pt-[5px] lg:text-2xl">Audio / Video Check</h1>
                                <p className="text-center content-center ml-[150px] mr-[150px] text-xl pt-[30px] lg:text-base lg:ml-[10px] lg:mr-[10px]">Unable to Access Media Seems like you denied permission to use audio and video.
                                    Please grant permission to the browser to access microphone and camera.
                                </p>
                                <div className="flex flex-col pt-[40px] lg:pt-[20px] shrink-0">
                                    <div className="flex flex-rows-2 justify-center content-center items-center">
                                        <div className="p-[20px] lg:p-[10px] lg:rounded-l-xl rounded-l-2xl border-solid border-2 border-slate-700">
                                            <svg fill="currentColor" viewBox="0 0 16 16" height="35px" width="35px">
                                                <path d="M9 4a1 1 0 11-2 0 1 1 0 012 0zm-2.5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm6 4a2 2 0 11-4 0 2 2 0 014 0zM8 7a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
                                            </svg>
                                        </div>
                                        <div className="p-6 lg:p-4 font-bold lg:text-base text-xl rounded-r-2xl border-solid border-2 border-slate-700">
                                            System default audio output
                                        </div>
                                    </div>

                                    <div className="flex flex-rows-2 justify-center content-center pt-4 items-center">
                                        <div className="p-[20px] lg:p-[10px] lg:rounded-l-xl rounded-l-2xl border-solid border-2 border-slate-700">
                                            <svg fill="currentColor" viewBox="0 0 16 16" height="35px" width="35px">
                                                <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0012 8V7a.5.5 0 011 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 01-2.43.923V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 011 0v1a4 4 0 004 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0111 3z" />
                                                <path d="M9.486 10.607L5 6.12V8a3 3 0 004.486 2.607zm-7.84-9.253l12 12 .708-.708-12-12-.708.708z" />
                                            </svg>
                                        </div>
                                        <div className="p-6 lg:p-4 font-bold text-xl lg:text-base rounded-r-2xl border-solid border-2 border-slate-700">
                                            Make sure camera is off before start
                                        </div>
                                    </div>

                                    <div className="flex flex-rows-2 justify-center content-center pt-4 pb-4 items-center">
                                        <div className="p-[20px] lg:p-[10px] lg:rounded-l-xl rounded-l-2xl border-solid border-2 border-slate-700">
                                            <svg fill="currentColor" viewBox="0 0 16 16" height="35px" width="35px"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.961 12.365a1.99 1.99 0 00.522-1.103l3.11 1.382A1 1 0 0016 11.731V4.269a1 1 0 00-1.406-.913l-3.111 1.382A2 2 0 009.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 000 5v6a2 2 0 002 2h5.728L.847 3.366zm9.746 11.925l-10-14 .814-.58 10 14-.814.58z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="p-6 lg:p-4 font-bold text-xl lg:text-base rounded-r-2xl border-solid border-2 border-slate-700">
                                            Make sure mike is off before start
                                        </div>
                                    </div>


                                    <div className="flex flex-row justify-center content-center">
                                        <button onClick={() => handleCallStart()} className="mb-[20px] pb-[10px] pt-[10px] pr-[80px] pl-[80px] text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl lg:text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >Start the call</button>
                                    </div>

                                </div>
                            </div>
                        </div>

            </Modal>
            </React.Fragment>
    )

}
export default Reminder;