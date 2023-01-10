import React, {useEffect, useState, useContext} from "react";
import { withRouter } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";
import { UserContext } from "../context/UserContext";
import GroupChatRoom from "./group_chat_room";
import GroupChatMsg from "./group_chat_msg";
import { SocketContext } from "../context/SocketContext";
import GroupChatAdd from "./group_chat_add";
import ReceiveCall from "./callreceive.component";
import VideoCall from "./VideoCall";


function GroupChat() {
    const {user} = useContext(UserContext);
    const [edited, setedited] = useState(0);
    const {currentCallId, setCurrentCallId,socket, onlineUsers, setOnlineUsers, currentChat, setCurrentChat, conversations, setConversations, filteredConversations,setFilteredConversations} = useContext(SocketContext)
    const [search, setSearch] = useState('');
    const [addOpen, setAddOpen] = useState(false);

    async function getConData(data, id){
        let newDat = [];
        data.data.forEach((element, idx) => {
            
            axios.get(`${BASELINE}conversation/${element.conversationId}/user/${id}`).then((res)=> {
                let con = res.data;
                let mems = con.members.split(',');
                let friend = mems.filter((id)=> id !== user.uid);
                axios.post(`${BASELINE}user/get/info/member/id`, {uid: friend[0]}).then((res3)=> {
                    let dat = res3.data;
                    newDat.push({...con, friend: friend[0], friendname: dat.info.Fname + ' ' +dat.info.Lname, friendData: dat.info });
                    if((idx+1) === data.data.length){
                        newDat = newDat.sort((a, b)=> new Date(b.messageCreated? b.messageCreated:"1995-12-17T03:24:00") - new Date(a.messageCreated? a.messageCreated: "1995-12-17T03:24:00"))

                     setConversations(newDat);
                        setFilteredConversations(newDat)
                    }
                })
            })
        });
    }
    const getAllConversationsByUserId = async(id) => {
        setConversations([]);
        setFilteredConversations([])
        const data = await axios.get(`${BASELINE}conversation/user/${id}`);
        await getConData(data, id);
        setedited((prev)=> prev +1)
        }
    useEffect(()=> {
        if(user && user.uid){
            getAllConversationsByUserId(user.uid);
        }
    }, [user])


useEffect(()=> {
   if(search.length > 0){
     let pattern = new RegExp(search, 'i')

      let res = conversations.filter((con)=> {
        if(pattern.test(con.groupName)){
            return con;
        }
      });
      setFilteredConversations(res);
   }else{
    setFilteredConversations(conversations)
   }
}, [search]);






        return (
            <>
                <div className="bg-[#E5E5E5]">
                    <div className="flex flex-1 h-screen w-[100%]">
                        <div className="container p-5">
                            <div className="max-h-full h-full flex flex-row ">
                                <aside
                                    className="w-full h-full md:w-3/6 lg:w-2/6 bg-white rounded-lg rounded-tr-none rounded-br-none border-r-2 border-gray-200">
                                    <div className="max-w-full w-full h-full flex flex-col">
                                        <div className="p-5 flex justify-start text-lg font-extrabold text-[#475465]">
                                            <span>Messages</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 gap-2">
                                            <span className="flex-grow-0 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" onClick={()=> setAddOpen(true)}>
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="rgba(128,138,151,1)" />
                                                </svg>
                                            </span>
                                            <form className="flex-grow">
                                                <div className="relative">
                                                    <div
                                                        className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                    </div>
                                                    <input type="search" id="default-search"
                                                        className="block px-4 py-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-400 outline-none"
                                                        placeholder="Search Here..." required="" onChange={(e)=> setSearch(e.target.value)} value={search} />
                                                </div>
                                            </form>
                                        </div>

                                        <div className="text-sm text-gray-400 font-semibold flex gap-5 p-5 pl-4 cursor-pointer">
                                            <span>All Chats</span>
                                            <span> Chats</span>
                                        </div>
                                        <GroupChatRoom conversations={filteredConversations} currentChat={currentChat} setCurrentChat={setCurrentChat} onlineUsers={onlineUsers} />
                                    </div>
                                </aside>
                                <GroupChatMsg currentChat={currentChat}  />
                            </div>
                        </div>
                    </div>
                </div >
                <ReceiveCall />
                <VideoCall />
                <GroupChatAdd socket={socket} addOpen={addOpen} setAddOpen={setAddOpen} user = {user} setCurrentChat ={setCurrentChat} conversations={conversations} setConversations={setConversations} filteredConversations={filteredConversations} setFilteredConversations={setFilteredConversations}/>
            </>
        );
    
}

export default GroupChat;