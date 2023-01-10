import React, {useState, useRef, useEffect} from 'react';

const Video = ({stream,mainVideoRef }) => {
    const videoref = useRef();
    useEffect(()=> {
            videoref.current.srcObject = stream;
            
    }, [stream])
    const handleVideoClick = ()=> {
        var el = document.getElementById("mainVideo");
        if(el.classList.contains("hidden")){
            el.classList.remove("hidden");
        }
        mainVideoRef.current.srcObject = stream;
    }
    return (
        <video ref={videoref} autoPlay={true} className='w-full h-full object-fill cursor-pointer' onClick={handleVideoClick}/>
    )
}
export default Video;