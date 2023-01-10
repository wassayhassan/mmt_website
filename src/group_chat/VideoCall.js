import React, {useState, useEffect, useContext, useRef} from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserContext } from '../context/UserContext';
import Video from './video.component';
import {GrClose} from 'react-icons/gr';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {AiOutlineAudio, AiOutlineAudioMuted} from 'react-icons/ai';
import { BsFillCameraVideoOffFill, BsCameraVideoFill} from 'react-icons/bs';
import {MdScreenShare, MdStopScreenShare} from 'react-icons/md';

const VideoCall = ({}) => {
    const {audioSharing, setAudioSharing,camsharing, setCamSharing,setCallData,screensharing, setScreenSharing,callStarted, setCallStarted,myVideoRef,remoteStreams, setRemoteStreams,mystream, callData, setMyStream,callpeers, setCallPeers,socket, currentChat} = useContext(SocketContext);
    const {user} = useContext(UserContext);
    const mainVideoRef = useRef();


    const switchOutgoingTracks = (stream) => {
        callpeers.forEach((call)=> {
            call.peer.streams[0].getTracks().forEach((el, idx)=> {
                stream.getTracks().forEach((el1, idx1)=> {
                    if(call.peer.streams[0].getTracks()[idx]?.kind === stream.getTracks()[idx1]?.kind){
                        call.peer.replaceTrack(call.peer.streams[0].getTracks()[idx],stream.getTracks()[idx1],call.peer.streams[0]);
                    
                    }
                })
            })
        })
      };


    const handleMyVideoClick = ()=> {
       mainVideoRef.current.srcObject = mystream;
       myVideoRef.current.srcObject = mystream;
       var el = document.getElementById("mainVideo");
       if(el.classList.contains("hidden")){
           el.classList.remove("hidden");
       }else{
        
       }
    }
    useEffect(()=> {
        myVideoRef.current.srcObject = mystream;
    }, [mystream])

    const handleStopCall = () => {
        setCallStarted(false);
        var el = document.getElementById('calling');
        el.classList.toggle('hidden');
        mystream?.getTracks().forEach((track)=> {
           track.stop();
        });
        setCallPeers([]);
        setRemoteStreams([]);
        setCallStarted(false);
        setCallData({})
        var el1 = document.getElementById('videoCalling');
        el1.classList.toggle('hidden');
        
        socket && socket.current && socket.current.emit('leaveCall', {...callData, userId: user?.uid, username: user?.Fname + ' ' + user?.Lname});
    }
    useEffect(()=> {
        socket && socket.current && socket.current.on('callEnded', (data)=> {
            var el = document.getElementById('calling');
            el.classList.toggle('hidden');
            mystream?.getTracks().forEach((track)=> {
               track.stop();
            });
            setCallPeers([]);
            var el1 = document.getElementById('videoCalling');
            el1.classList.toggle('hidden');
        })
    }, [])
    useEffect(()=> {
      socket.current && socket.current.on("callUpdate", (data)=> {
        
      })
    }, [socket])

    const handleScreenShareClick = () => {
        if(screensharing){
            
            mystream?.getTracks().forEach((track)=> {
                track.stop();
             });
             navigator.mediaDevices.getUserMedia({audio: true, video:true}).then((stream)=> {
                switchOutgoingTracks(stream);
                
                setMyStream(stream);
             })
             setScreenSharing(false);
             setAudioSharing(true);
             setCamSharing(true)
            
        }else{
            setCamSharing(false);
            setAudioSharing(false);
            mystream?.getTracks().forEach((track)=> {
                track.stop();
             });
             navigator.mediaDevices.getDisplayMedia({cursor: true}).then((stream)=> {
           
                switchOutgoingTracks(stream);
                
                setMyStream(stream);
             })
             
             setScreenSharing(true);
        }
    }
    const handleVideoClick = () => {
        if(camsharing){
            mystream?.getTracks().forEach((track)=> {
                track.stop();
             });
             navigator.mediaDevices.getDisplayMedia({cursor: true}).then((stream)=> {
                switchOutgoingTracks(stream); 
                setMyStream(stream);
             })
             setCamSharing(false);
             setAudioSharing(false);
             setScreenSharing(true);
        }else{
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=> {
                switchOutgoingTracks(stream);
                setMyStream(stream);
             })
             setCamSharing(true);
             setAudioSharing(true);
             setScreenSharing(false);
        }
    }

    const handleAudioClick = ()=> {
        setAudioSharing((prev)=> !prev);
        if(!camsharing && !screensharing){
            setAudioSharing(true);
        }
        mystream?.getTracks().forEach((track)=> {
            track.stop();
         });
        if(audioSharing){
             navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=> {
                let track = stream.getTracks()[0];
                setMyStream(stream);
                callpeers.forEach((call)=> {
                    let preTrack = call.peer.streams[0].getTracks()[0];
                   call.peer.replaceTrack(preTrack, track, myVideoRef.current.srcObject);
                })
             })
        }else{
           navigator.mediaDevices.getUserMedia({ video: true}).then((stream)=> {
            let track = stream.getTracks()[0];
            setMyStream(stream);
            callpeers.forEach((call)=> {
                let preTrack = call.peer.streams[0].getTracks()[0];
               call.peer.replaceTrack(preTrack, track, myVideoRef.current.srcObject);
            })
           })
        }
        
        
    }
    const handleCloseMainVideo = () => {
        var el = document.getElementById("mainVideo");
        if(!(el.classList.contains("hidden"))){
            el.classList.add("hidden");
        }
        mainVideoRef.current.srcObject = null;
    }
    

    return(
        <>
        <div id="calling" className="hidden fixed bottom-[15px] left-[15px] font-sans text-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 rounded-3xl w-[300px] justify-center content-center">
        <div className="opacity-100 box-border flex flex-col h-full p-6">
            <div className="text-l text-white text-center">
               <p className='text-2xl font-semibold'> {callData?.groupName || currentChat?.groupName}</p> 
              <p>  Calling...</p>
            </div>
            <div className="flex-shrink-0 p-3 font-sans text-white text-5xl text-center">
                {callStarted &&     
                <Timer active duration={null}>
                    <Timecode />
                </Timer>
                   }
            </div>
            <div className="flex flex-row mt-4 font-sans text-white">
                {/* {audioSharing ? <AiOutlineAudio size="2.03em" onClick={handleAudioClick } className="cursor-pointer mx-1" />: <AiOutlineAudioMuted className='cursor-pointer mx-1' size="2.03em" onClick={handleAudioClick } />} */}
                 {camsharing? <BsCameraVideoFill size="2.03em" onClick={() =>  handleVideoClick()} className="cursor-pointer mx-3"/>: <BsFillCameraVideoOffFill size="2.03em" className='cursor-pointer mx-1' onClick={() =>  handleVideoClick()}/>}
               {screensharing? <MdScreenShare size="2.03em" onClick={() =>handleScreenShareClick()} className="cursor-pointer mx-3" />: <MdStopScreenShare size="2.03em" className='cursor-pointer mx-1' onClick={() =>handleScreenShareClick()} />}



                <button className="pl-[15px]"> 
                    <svg fill="none" viewBox="0 0 24 24" height="35px" width="35px">
                        <path fill="currentColor" fillRule="evenodd" d="M8 11a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path fill="currentColor" d="M11 14a1 1 0 011 1v6h2v-6a3 3 0 00-3-3H5a3 3 0 00-3 3v6h2v-6a1 1 0 011-1h6zM22 11h-6v2h6v-2zM16 15h6v2h-6v-2zM22 7h-6v2h6V7z" />
                    </svg>
                </button>
                <button onClick={() => handleStopCall()} className="ml-[10px] rounded-full bg-rose-700 w-[40px] h-[40px]">
                    <svg className="text-white ml-[6px]" fill="none" viewBox="0 0 15 15" height="25px" width="25px">
                        <path stroke="currentColor" d="M13.5 1.5l-4 4m-7-5h2.22a1 1 0 01.97.757l.585 2.345a1 1 0 01-.654 1.19l-1.108.37a1.21 1.21 0 00-.804 1.385 6.047 6.047 0 004.744 4.744 1.21 1.21 0 001.385-.804l.297-.893a1 1 0 011.396-.578l2.416 1.208a1 1 0 01.553.894V12.5a2 2 0 01-2 2h-2c-5.523 0-10-4.477-10-10v-2a2 2 0 012-2zm9 6a3 3 0 110-6 3 3 0 010 6z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div id='mainVideo' className='hidden rounded-md fixed w-[550px] h-[450px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black'>
        <div onClick={()=> handleCloseMainVideo()}>
        <GrClose size="2.5em" className="-right-6 -top-3 p-1 cursor-pointer absolute bg-white text-white rounded-full" color='white'  />
        </div>
        <video ref={mainVideoRef} autoPlay className="w-full h-full object-fill" />


    </div>
    <div className="hidden fixed overflow-y-auto w-[350px] h-[800px] md:right-[10px] lg:right-[15px] right-[30px] top-[100px] lg:top-[40px] flex-col" id="videoCalling">

    {/* video calling */}
    {remoteStreams.map((rs, idx)=> {
        
        
        return (
            <div className=" rounded-md 2xl:w-[300px] 2xl:h-[200px] lg:w-[200px] lg:h-[100px] border-2 border-gray-300 text-white m-2" key={idx}>
            <Video stream={rs.stream}  mainVideoRef={mainVideoRef}/>
        </div>
        )
    })}
    { <div className={` ${remoteStreams.length > 0? '': 'hidden'} 2xl:w-[300px] 2xl:h-[200px] lg:w-[200px] lg:h-[100px] rounded-md border-2 border-gray-300 text-white m-2`}>
        <video ref={myVideoRef} autoPlay className='w-full h-full object-fill cursor-pointer' onClick={()=> handleMyVideoClick}/>
           <p>Mine's</p>
        </div>}
    </div>
       
</>
    )
}
export default VideoCall;

