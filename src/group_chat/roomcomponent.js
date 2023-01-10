import React ,{useState, useEffect, useContext} from "react";
import TimeAgo from 'react-timeago'
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

const RoomComponent = ({conversation}) => {
    const {user} = useContext(UserContext)
    const {socket, onlineUsers, setOnlineUsers, currentChat, setCurrentChat, conversations, setConversations,  filteredConversations,setFilteredConversations} = useContext(SocketContext)

    const [online, setOnline] = useState(false);
    const [style, setStyle] = useState("flex flex-row gap-2.5 items-center hover:bg-gray-50 cursor-pointer p-4:")
    useEffect(()=> {
        onlineUsers.forEach(user => {
            if(user.userId === conversation.friend){
                setOnline(true);
            }
        });
    }, [onlineUsers])

     const setChat = async() => {
        setCurrentChat(conversation)
        setConversations(conversations.map((con)=> {
            if(con.conversationId === conversation.conversationId){
                return {...con, unreadMessages: 0}
            }else{
                return con
            }
        }))
        setFilteredConversations(filteredConversations.map((con)=> {
            if(con.conversationId === conversation.conversationId){
                return {...con, unreadMessages: 0}
            }else{
                return con
            }
        }))
        
     }
    useEffect(()=> {
      setStyle((currentChat.conversationId === conversation.conversationId)?  "flex flex-row gap-2.5 items-center bg-gray-100  hover:bg-gray-50 cursor-pointer p-4": "flex flex-row gap-2.5 items-center hover:bg-gray-50 cursor-pointer p-4");
    }, [currentChat])
    return (
        <>
                                <div onClick={()=> setChat()} className={style}>

                                    <div className="relative">
                                        <div
                                            className="overflow-hidden flex-grow-0 relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                            <svg className="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        {/* {online && <span className="absolute right-0 bottom-0 w-2.5 h-2.5 z-50 rounded-full bg-green-500"></span>} */}
                                        
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-sm flex justify-between items-start mb-0.5">
                                            <h5 className="text-[#475465] font-bold">{conversation.groupName ||conversation.friendname }</h5>
                                            <p className="text-gray-400 text-xs font-semibold">{conversation.messageCreated && new Date(conversation.messageCreated).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-sm flex justify-between items-end">
                                            <p className="text-gray-400 text-xs truncate lg:max-w-[150px] 2xl:max-w-[170px]">{conversation.text || (conversation?.attachment?.length > 3? 'attachment': '')}</p>
                                            {conversation.unreadMessages > 0 &&
                                            <p
                                                className="bg-[#374557] w-5 h-5 flex justify-center items-center rounded-full text-slate-100">
                                                { conversation.unreadMessages}</p>
                                                }
                                        </div>
                                    </div>
                                </div>
        </>
    )
}
export default RoomComponent