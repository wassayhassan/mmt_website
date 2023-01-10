import React, { useState, useEffect, useContext, useRef } from "react";
import { withRouter } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import GroupChatRoom from "./group_chat_room";
import Message from "./message. component";
import { v4 as uuidv4 } from 'uuid';
import Reminder from "./reminder.component";
import Peer from 'simple-peer'
import { AiOutlineFile, AiFillCloseCircle } from "react-icons/ai";

function GroupChatMsg() {
    const {user} = useContext(UserContext)
    const {callStarted, setCallStarted,callData, setCallData,myVideoRef,currentCallId, setCurrentCallId,remoteStreams, setRemoteStreams,mystream, setMyStream,callpeers, setCallPeers,socket, currentChat, setCurrentChat, conversations, setConversations, filteredConversations,setFilteredConversations, messages, setMessages} = useContext(SocketContext);
    const [message, setMessage] = useState('');
    const [receiverId, setReceiverId] = useState(null);
    const [receiverData, setReceiverData] = useState('');
    const scrollRef = useRef();
    const [attachment, setAttachment] = useState(null);
    const [attachmentlink, setAttachmentLink] = useState(null);
    const [callReminder, setCallReminder] = useState(false);
    const [callUI, setCallUI] = useState(false);

    const handleCallStart = () => {
        setCallReminder(false);
        setCallUI(true);
        let callId = uuidv4();
        setCurrentCallId(callId);
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream)=> {
            setMyStream(stream);
            myVideoRef.current.srcObject = stream;
        })
        
        var el = document.getElementById('calling');
        el.classList.toggle("hidden");
        var el1 = document.getElementById('videoCalling');
        el1.classList.toggle('hidden');
        let mems = currentChat.members.split(',');
        let joinedMembers = [];
        joinedMembers.push(user.uid);
        mems.forEach((mem)=> {
            if(mem === user.uid){
                return;
            }
            
            socket.current.emit('callUser', {callId: callId, conversationId: currentChat.conversationId, receiverId: mem, callerId: user.uid, joinedMembers, groupName: currentChat?.groupName});
        })
        setCallData({callId: callId, conversationId: currentChat.conversationId,callerId: user.uid})    
        setCallStarted(true)
    }

    const getMessagesByConversationId = async(id) => {
        const response = await axios.get(`${BASELINE}conversation/${id}/messages`)
        if(response.data){
           setMessages(response.data);
        }
    }   
    useEffect(()=> {
        if(currentChat){
            getMessagesByConversationId(currentChat.conversationId)
        }
    }, [currentChat])  

       
    useEffect(()=> {
        if(currentChat && currentChat.conversationId){
            let mems = currentChat.members.split(',');
            let re = mems.filter((id)=> id !== user.uid);
            setReceiverId(re[0]);
        }

    }, [currentChat])
    useEffect(()=> {
       if(receiverId){
        getReceiverData(receiverId)
       }
    }, [receiverId])
    const getReceiverData = async(id)=> {
         const data = await axios.post(`${BASELINE}user/get/info/member/id`, {uid: id});
         setReceiverData(data.data.info)
    }
    const handleMesageChange = (e)=> {
       setMessage(e.target.value)
    }
    const handleSendMessage = async(e)=> {

        e.preventDefault();
        if(!attachment && message.length < 1){
            return
        }
        let tempid = uuidv4()
        let messageToSend = {
            messageId: tempid,
            conversationId: currentChat.conversationId,
            senderId: user.uid,
            receiverId: receiverId,
            text: message,
            readStatus: 0,
            messageCreated: new Date(),
            attachment: attachmentlink,
        }
        let mems = currentChat.members.split(',');
        mems.forEach((mem)=> {
            if(mem !== user.uid){
               
                socket.current.emit('sendMessage', {...messageToSend, receiverId: mem});
            }
            
        })
        // socket.current.emit('sendMessage', messageToSend)


        let response = await axios.post(`${BASELINE}message`, messageToSend);

        setMessages((prev)=> [...prev,messageToSend])
        let newDat = conversations;
        newDat = newDat.map((con)=> {
            if(con.conversationId === messageToSend.conversationId){
              return {...con, ...messageToSend};
            }else{
              return con
            }
           });
           newDat.sort((a, b)=> new Date(b.messageCreated) - new Date(a.messageCreated));
           setConversations(newDat);
           newDat = filteredConversations;

           newDat = newDat.map((con)=> {
            if(con.conversationId === messageToSend.conversationId){
              return {...con, ...messageToSend};
            }else{
              return con
            }
           })
           newDat.sort((a, b)=> new Date(b.messageCreated) - new Date(a.messageCreated));
           setFilteredConversations(newDat);
           

        setMessage('')
        setAttachment(null);
        setAttachmentLink(null)
    }
    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth', block: 'center'});
       }, [messages]);
    const handleAttachmentChange = (e)=> {
        setAttachment(e.target.files[0]); 
    }
    useEffect(()=> {
        if(attachment){
            let form = new FormData();
            form.append('attachment', attachment);
            axios.post(`${BASELINE}message/fileupload`, form).then((res)=> {
                if(res.data){
                    
                    setAttachmentLink(res.data.name);
                }
            })

        }

    }, [attachment])
    const handleDeleteAttachment = () => {
        setAttachment(null);
        setAttachmentLink(null);
    }

    if(!currentChat.conversationId){
        return
    }



        return (
            <>
                <section
                    className=" max-h-full w-full h-full flex flex-col bg-white rounded-lg rounded-tl-none rounded-bl-none border-b-2 border-gray-200">
                    <div className="flex justify-start items-center gap-3 p-6 border-b-2 border-gray-200">
                        <div
                            className="overflow-hidden flex-grow-0 relative w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute -bottom-1 w-12 h-12 text-gray-400" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        {/* <h5 className="font-bold text-[#475465] text-base">{receiverData && receiverData.Fname + ' ' +receiverData.Lname}</h5> */}
                        <h5 className="font-bold text-[#475465] text-base">{currentChat.groupName}</h5>

                    </div>

                    <div className="p-6 overflow-y-scroll h-full max-h-full w-full">
                          {messages && messages.map((message, idx)=> {
                           return (
                           <div ref={scrollRef} key={message.messageCreated}>
                              <Message   message={message} />
                           </div>)

                        })}
                    </div>
                 {attachment &&   <div className="flex flex-row justify-end mr-5 border-t-2 border-gray-200">
                    <div>
                    <div className="h-16 w-16 bg-white border-[1px] border-gray-400 rounded-md flex flex-row justify-center items-center relative">
                      <AiOutlineFile size="3.0em" />  
                      <div className="absolute top-1 right-1 cursor-pointer">
                      <AiFillCloseCircle onClick={()=> handleDeleteAttachment()} />  
                      </div>     
                    </div>
                    <p className="text-sm"> {attachmentlink?.split('/')[1]}</p>

                    </div>

                        
                        
                    </div>
                    } 

                    <div className="p-5">
                        <form onSubmit={handleSendMessage}>
                            <div className="relative">
                                <input type="search" id="default-search" onChange={handleMesageChange}
                                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-full border-2 border-gray-300 outline-none"
                                    value={message}
                                    placeholder="Write your message..." required="" />
                                <div className="absolute top-2.5 right-2.5 flex gap-4 items-center">

                                    {/* <button>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11 17H4C2.34315 17 1 15.6569 1 14V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V14C23 15.6569 21.6569 17 20 17H13V19H16C16.5523 19 17 19.4477 17 20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19H11V17ZM4 5H20C20.5523 5 21 5.44772 21 6V14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14V6C3 5.44772 3.44772 5 4 5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button> */}

                                    {/* <button>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" id="call" xmlns="http://www.w3.org/2000/svg">
                                            <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none" />
                                            <path id="Shape" d="M7.02,15.976,5.746,13.381a.7.7,0,0,0-.579-.407l-1.032-.056a.662.662,0,0,1-.579-.437,9.327,9.327,0,0,1,0-6.5.662.662,0,0,1,.579-.437l1.032-.109a.7.7,0,0,0,.589-.394L7.03,2.446l.331-.662a.708.708,0,0,0,.07-.308.692.692,0,0,0-.179-.467A3,3,0,0,0,4.693.017l-.235.03L4.336.063A1.556,1.556,0,0,0,4.17.089l-.162.04C1.857.679.165,4.207,0,8.585V9.83c.165,4.372,1.857,7.9,4,8.483l.162.04a1.556,1.556,0,0,0,.165.026l.122.017.235.03a3,3,0,0,0,2.558-.993.692.692,0,0,0,.179-.467.708.708,0,0,0-.07-.308Z" transform="translate(3.887 6.093) rotate(-30)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1.5" />
                                        </svg>
                                    </button> */}
                                    <Reminder callReminder={callReminder} setCallReminder={setCallReminder}  handleCallStart={handleCallStart} />
                                   

                                    <label htmlFor="attachment" className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                            height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                                fill="rgba(115,121,122,1)" />
                                        </svg>
                                    </label>
                                    <input id="attachment" type="file" onChange={(e)=> handleAttachmentChange(e)} hidden/>

                                    <button type="submit" className="text-white bg-[#374557] hover:bg-[#2e3a49] font-medium rounded-full text-sm px-4 py-2
                                     text-center inline-flex items-center outline-none">
                                        Send
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22"
                                            height="18">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                d="M3 13h6v-2H3V1.846a.5.5 0 0 1 .741-.438l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V13z"
                                                fill="rgba(236,240,241,1)" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
               
                
            </>
        );
    
}

export default GroupChatMsg;