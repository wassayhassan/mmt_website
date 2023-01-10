import React, {useRef, useState, useEffect, useContext, createContext, createRef} from 'react';
import Peer from 'simple-peer'
import { io } from "socket.io-client";
import { UserContext } from './UserContext';
import { BASELINE } from '../util';
import axios from 'axios';
export const SocketContext = createContext();


export function SocketProvider({children}){
    const {user} = useContext(UserContext)
    const [callData, setCallData] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [conversations, setConversations] = useState([]);
    const [filteredConversations,setFilteredConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [mystream, setMyStream] = useState(null);
    const myVideoRef = useRef(null);
    const [callpeers, setCallPeers] = useState([]);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const remoteStreamRefs = useRef([]);
    const [currentCallId, setCurrentCallId] = useState(null);
    const [callStarted, setCallStarted] = useState(false);
    const callRequests= useRef([]);
    const [camsharing, setCamSharing] = useState(true);
    const [screensharing, setScreenSharing] = useState(false);
    const [audioSharing, setAudioSharing] = useState(true);

    

    
    const socket = useRef();
    useEffect(()=> {
         socket.current = io("ws://localhost:8080/");
    }, [])
    const addUser = (id) => {
      socket.current.emit('addUser', id);
    }
    useEffect(()=> {
        if( user && user.uid){
            addUser(user.uid);
        }
    }, [user])
    useEffect(()=> {
      socket.current && socket.current.on('getUsers', (users)=> {
        setOnlineUsers(users);
      })
    }, [])

    async function getScreenMedia(){
    const stream =  await navigator.mediaDevices.getDisplayMedia({cursor: true});
    return stream;
    }
    async function getCamVideo(){
      const stream=  await navigator.mediaDevices.getUserMedia({video: true});
      return stream; 
    }
    async function getCamAudio(){
      const stream=  await navigator.mediaDevices.getUserMedia({audio: true});
      return stream; 
    }
    async function getCamAudioVideo(){
      const stream=  await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      return stream; 
    }
    useEffect(()=> {
       if(socket && socket.current){
           socket.current.on('receiveMessage', (data)=> {
            if(conversations){
              let dat = conversations;
                 dat = dat.map((con)=> {
                  if(con.conversationId === data.conversationId){
                    if(currentChat.conversationId === data.conversationId){
                     let  m = messages.filter((msg)=> msg.messageId !== data.messageId)
                      m.push(data);
                      setMessages(m);
                      return {...con, ...data}
                    }else{
                      let num = parseInt(con.unreadMessages)
                      num++
                      return {...con, ...data, unreadMessages: num}
                    }
                  }else{
                    return con
                  }
                 })
                dat.sort((a, b)=> new Date(b.messageCreated? b.messageCreated:"1995-12-17T03:24:00") - new Date(a.messageCreated? a.messageCreated: "1995-12-17T03:24:00"));
                 setConversations(dat)
                 dat = filteredConversations;
                 dat = dat.map((con)=> {
                  if(con.conversationId === data.conversationId){
                    
                    if(currentChat.conversationId === data.conversationId){
                      let  m = messages.filter((msg)=> msg.messageId !== data.messageId)
                      m.push(data);
                      setMessages(m);
                      return {...con, ...data}
                    }else{
                      let num = parseInt(con.unreadMessages)
                      num++
                      return {...con, ...data, unreadMessages: num}
                    }
                  }else{
                    return con
                  }
                 })
                 dat.sort((a, b)=> new Date(b.messageCreated? b.messageCreated:"1995-12-17T03:24:00") - new Date(a.messageCreated? a.messageCreated: "1995-12-17T03:24:00"));
                 setFilteredConversations(dat);
   
            }
           })
       }
    }, [socket, conversations, messages])

    
    useEffect(()=> {
        socket && socket.current && socket.current.on('newConversation', (data)=> {
          if(conversations && filteredConversations){
            setConversations([data, ...conversations]);
            setFilteredConversations([data, ...filteredConversations]);
          }
        })
    }, [socket, conversations, filteredConversations])

    useEffect(()=> {
      socket.current && socket.current.on('callUser', (data)=> {
          setCallData(data);
         var ele = document.getElementById('receiving');
         ele.classList.toggle('hidden');
      })

  }, [socket])
  useEffect(()=> {
      socket.current && socket.current.on('rejectedCall', (data)=> {
        if(mystream){
        
          var ele = document.getElementById('calling');
          ele.classList.add('hidden');
          mystream?.getTracks().forEach((track)=> {
            track.stop();
         })
        }
      })
  }, [socket, mystream])
  useEffect(()=> {
    socket.current && socket.current.on("usersByCallId", async(dat)=> {
      
      if(user && callData){
        let str = myVideoRef?.current?.srcObject;
        if(!str){
           str = await getScreenMedia()
          setMyStream(str);
          myVideoRef.current.srcObject = str;
        }
            
            
            dat?.joinedMembers.forEach((mem)=> {
            
            let peer = new Peer({initiator: true, stream: str});
             
            peer.on('signal', (data)=> {

              const findreq = findpeerByAll(callData.callId, user.uid, mem);

              if(!findreq){
                socket.current.emit('joinUserInCall', {callId: callData.callId, userId: user.uid, receiverId: mem, data:data});
                callRequests.current.push({callId: callData.callId, userId: user.uid, receiverId: mem, data:data})
              }
            })
            peer.userId = mem;
            setCallPeers((prev)=> [...prev, {callId: callData.callId, peer: peer, userId: user.uid, receiverId: mem}]);
            peer.on("stream", (stream)=> {   
              setRemoteStreams((prev)=> [...prev, {stream: stream, channelName: peer?.channelName, userId: peer?.userId}]);
            })

          })   
      }  
    })
 }, [socket, user, callData])
 useEffect(()=> {
      socket.current && socket.current.on('userLeft', (data)=> {
        if(callpeers && remoteStreams){
          setCallPeers(callpeers.filter((peer)=> (peer.userId !== data.userId && peer.callId !== data.callId)));
          setRemoteStreams(remoteStreams.filter((stream)=> stream.userId !== data.userId));
        }
      })
 }, [callpeers, remoteStreams])


  const handleAcceptCall = async() => {
    var ele = document.getElementById('receiving');
    ele.classList.toggle('hidden');
   
    var el = document.getElementById("calling");
   
    el.classList.toggle('hidden');
    var el1 = document.getElementById('videoCalling');
    el1.classList.toggle('hidden');
    if(audioSharing && camsharing){
      
      const stream = await getCamAudioVideo();
        setMyStream(stream);
        myVideoRef.current.srcObject = stream;
        socket.current.emit('getAddedUsersByCallId', {callId: callData.callId, accepterId: user.uid});
        setCallStarted(true)
    }
    else if(audioSharing && !camsharing){
       const stream = await getCamAudio();
        setMyStream(stream);
        myVideoRef.current.srcObject = stream;
        socket.current.emit('getAddedUsersByCallId', {callId: callData.callId, accepterId: user.uid});
        setCallStarted(true)
    }
    else if(screensharing){
      const stream = await getScreenMedia();
        setMyStream(stream);
        myVideoRef.current.srcObject = stream;
        socket.current.emit('getAddedUsersByCallId', {callId: callData.callId, accepterId: user.uid});
        setCallStarted(true)
    }
  }

  useEffect(()=> {
     socket.current && socket.current.on("joinUserInCall", async(data)=> {
     
    
      
      if(user && user.uid && callData && callData.callId){
       
       
        
        let str;
        
        if(!myVideoRef.current.srcObject){
          str = await getCamAudioVideo();
          setMyStream(str);
          myVideoRef.current.srcObject = str;
          let peer = new Peer({initiator: false, trickle:false, stream: str});
          peer.signal(JSON.stringify(data.data));
          peer.userId = data?.userId;
          peer.on('signal', (dat)=> {
            const findreq = findpeerByAll(callData.callId,data.userId,user.uid);
            
            if(!findreq){
              socket.current.emit("confirmAccepted", {data: dat, peerAccepterId: user.uid, peerSenderId:data.userId});            
              callRequests.current.push({callId: callData.callId, userId: user.uid, receiverId: data.userId, data:data})
            }
  
          })
          peer.on("stream", (stream)=> {  
                    
            setRemoteStreams((prev)=> [...prev, {stream: stream, channelName: peer.channelName, userId: data?.userId}]);
          })
          setCallPeers((prev)=> [...prev, {callId: callData.callId, peer: peer, userId: user.uid, receiverId: data.userId}]);
        
        }else{
        
            let peer = new Peer({initiator: false, trickle:false, stream: myVideoRef?.current?.srcObject});
            peer.signal(JSON.stringify(data.data));
            peer.userId = data?.userId;
            peer.on('signal', (dat)=> {
              
              const findreq = findpeerByAll(callData.callId,user.uid,data.userId);
            
              if(!findreq){
                socket.current.emit("confirmAccepted", {data: dat, peerAccepterId: user.uid, peerSenderId:data.userId});            
                callRequests.current.push({callId: callData.callId, userId: user.uid, receiverId: data.userId, data:data})
              } 
            })
            peer.on("stream", (stream)=> {  
              
                         
              setRemoteStreams((prev)=> [...prev, {stream: stream, channelName: peer.channelName, userId: data?.userId}]);
            })
            setCallPeers((prev)=> [...prev, {callId: callData.callId, peer: peer, userId: user.uid, receiverId: data.userId}]);

        }
        
      }
      
     })
  }, [user, callData])
  
  useEffect(()=> {
    socket.current && socket.current.on("confirmAccepted", (data)=> {
     if(callpeers.length > 0){
      
         let peer = findpeer(data.peerAccepterId)?.peer;
         
         peer.signal(JSON.stringify(data.data));

         
     }

    })
    
 }, [callpeers])
 const findpeer = (userId)=> {
  return callpeers.find(peer=> peer.receiverId === userId);
}
const findpeerByAll = (callId, userId, receiverId) => {
    return callRequests.current.find(peer=> peer.callId === callId && peer.userId === userId && peer.receiverId === receiverId);
}


    return (
       <SocketContext.Provider value={{audioSharing, setAudioSharing,camsharing, setCamSharing,screensharing, setScreenSharing,callStarted, setCallStarted,callData, setCallData,myVideoRef,currentCallId, setCurrentCallId,remoteStreamRefs,callData,handleAcceptCall,remoteStreams, setRemoteStreams, setCallData,mystream, setMyStream,callpeers, setCallPeers, socket, onlineUsers, setOnlineUsers, currentChat, setCurrentChat, conversations, setConversations, filteredConversations,setFilteredConversations, messages, setMessages}}>
          {children}
        </SocketContext.Provider>
        )
}   
    