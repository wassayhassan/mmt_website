import React, {useState, useEffect, useContext} from 'react';
import { SocketContext } from '../context/SocketContext';
import {FiPhoneCall} from 'react-icons/fi';
import Peer from 'simple-peer'
import { UserContext } from '../context/UserContext';
import {AiOutlineAudio, AiOutlineAudioMuted} from 'react-icons/ai';
import { BsFillCameraVideoOffFill, BsCameraVideoFill} from 'react-icons/bs';
import {MdScreenShare, MdStopScreenShare} from 'react-icons/md';


const ReceiveCall = ()=> {
    const {audioSharing, setAudioSharing,handleAcceptCall, camsharing, setCamSharing,screensharing, setScreenSharing,callStarted, setCallStarted,myVideoRef,remoteStreams, setRemoteStreams,mystream, callData, setMyStream,callpeers, setCallPeers,socket, currentChat, setCurrentChat, conversations, setConversations, filteredConversations,setFilteredConversations, messages, setMessages} = useContext(SocketContext);
    const {user} = useContext(UserContext);

 
    const handleRejectCall = () => {
        var ele = document.getElementById('receiving');
        ele.classList.toggle('hidden');
        socket.current.emit('rejectedCall', {...callData, rejecterId: user.uid});
    }
    const handleScreenShareClick = () => {
        if(screensharing){
             setScreenSharing(false);
             setAudioSharing(true);
            
        }else{
            setCamSharing(false);
            setAudioSharing(false);
            setScreenSharing(true);
        }
    }
    const handleVideoClick = () => {
        if(camsharing){

             setCamSharing(false);
             setAudioSharing(true);
        }else{
             setCamSharing(true);
             setAudioSharing(true);
             setScreenSharing(false);
        }
    }
    // const handleAudioClick = ()=> {
    //     setAudioSharing((prev)=> !prev);
    //     if(!camsharing && !screensharing){
    //         setAudioSharing(true);
    //     }
        
        
    // }



    return (
        <>
       <div id="receiving" className="hidden fixed bottom-[15px] left-[15px] font-sans text-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 rounded-3xl w-[300px] justify-center content-center">
        <div className="opacity-100 box-border flex flex-col h-full p-6">
            <div className="text-l text-white text-center">
              <p className='text-lg font-semibold'>{callData?.groupName}</p>  
              <p>Receiving</p>
            </div>
            <div className="flex flex-row mt-4 font-sans text-white">
            {/* {audioSharing ? <AiOutlineAudio size="2.03em" onClick={handleAudioClick } className="cursor-pointer mx-1" />: <AiOutlineAudioMuted className='cursor-pointer mx-1' size="2.03em" onClick={handleAudioClick } />} */}
            {camsharing? <BsCameraVideoFill size="2.03em" onClick={() =>  handleVideoClick()} className="cursor-pointer mx-1"/>: <BsFillCameraVideoOffFill size="2.03em" className='cursor-pointer mx-1' onClick={() =>  handleVideoClick()}/>}
            {screensharing? <MdScreenShare size="2.03em" onClick={() =>handleScreenShareClick()} className="cursor-pointer mx-1" />: <MdStopScreenShare size="2.03em" className='cursor-pointer mx-1' onClick={() =>handleScreenShareClick()} />}

                {/* <button onClick={() => this.showVideoCall()}>
                    <svg fill="currentColor" viewBox="0 0 16 16" height="35px" width="35px">
                        <path fillRule="evenodd" d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5z" />
                    </svg>
                </button>

                <button onClick={() => this.showVideoCall()} className="pl-[15px]">
                    <svg viewBox="0 0 24 24" fill="currentColor" height="35px" width="35px">
                        <path d="M9 6H5v4h2V8h2m10 2h-2v2h-2v2h4m2 2H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 002-2V4a2 2 0 00-2-2" />
                    </svg>
                </button> */}

                {/* <button className="pl-[15px]"> 
                    <svg fill="none" viewBox="0 0 24 24" height="35px" width="35px">
                        <path fill="currentColor" fillRule="evenodd" d="M8 11a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path fill="currentColor" d="M11 14a1 1 0 011 1v6h2v-6a3 3 0 00-3-3H5a3 3 0 00-3 3v6h2v-6a1 1 0 011-1h6zM22 11h-6v2h6v-2zM16 15h6v2h-6v-2zM22 7h-6v2h6V7z" />
                    </svg>
                </button> */}
                <button onClick={() => handleRejectCall()} className="rounded-full bg-rose-700 w-[40px] h-[40px]">
                    <svg className="text-white ml-[6px]" fill="none" viewBox="0 0 15 15" height="25px" width="25px">
                        <path stroke="currentColor" d="M13.5 1.5l-4 4m-7-5h2.22a1 1 0 01.97.757l.585 2.345a1 1 0 01-.654 1.19l-1.108.37a1.21 1.21 0 00-.804 1.385 6.047 6.047 0 004.744 4.744 1.21 1.21 0 001.385-.804l.297-.893a1 1 0 011.396-.578l2.416 1.208a1 1 0 01.553.894V12.5a2 2 0 01-2 2h-2c-5.523 0-10-4.477-10-10v-2a2 2 0 012-2zm9 6a3 3 0 110-6 3 3 0 010 6z" />
                    </svg>
                </button>
                <button onClick={handleAcceptCall} className="bg-green-600 p-2 rounded-full mx-6">
                    <FiPhoneCall size="1.5em" />
                </button>
            </div>
        </div>
    </div>
        </>
    )
}
export default ReceiveCall;