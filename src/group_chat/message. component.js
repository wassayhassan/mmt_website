import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../context/UserContext';
import TimeAgo from 'react-timeago'
import { BASELINE } from '../util';
import axios from 'axios';
import {BsArrowDownCircle} from 'react-icons/bs';
import {AiOutlineFile} from "react-icons/ai";
import { Tooltip } from 'flowbite-react';
import { FaUserAlt} from "react-icons/fa"

function Message({message}){
    const {user} = useContext(UserContext);
    let style = (message.senderId === user.uid)? 'flex justify-end m-1': 'flex justify-start m-1'
    let style2 = (message.senderId === user.uid)? 'text-gray-400 text-right text-xs font-semibold': 'text-gray-400 text-left text-xs font-semibold';
    let altpicstyle = (message.senderId === user.uid)? 'rounded-full absolute top-4 -right-4 bg-gray-50 w-6 h-6 flex flex-row justify-center items-center': 'rounded-full absolute top-4 -left-4 bg-gray-50 w-6 h-6 flex flex-row justify-center items-center'
    const [senderData, setSenderData] = useState({});
    useEffect(()=> {

        let readBy = message?.readBy?.split(",");
        if((!readBy ||!readBy?.includes(user.uid)) && message.senderId !== user.uid){
            axios.post(`${BASELINE}message/status/add`, {messageId: message.messageId, userId: user.uid});
        }
    }, [])
    useEffect(()=> {
        axios.post(BASELINE+"user/get/info/member/id", {uid: message.senderId}).then((res)=> {
            setSenderData(res.data.info)
        })
    }, [])
    return (
        <div className={style}>
            <div className='flex flex-col text-right space-y-5 relative'>
           {message.text &&  <div
                    className={message.senderId === user.uid? 'text-sm p-3 max-w-[250px] w-max self-end rounded-xl rounded-br-none bg-[#374557] text-[#F4F4F5]': "text-sm p-3 max-w-[250px] w-max text-left self-start  rounded-xl rounded-br-none bg-[#374557] text-[#F4F4F5]"}>
                    <span className='break-words'>
                        {message.text}
                    </span>
                </div>
}

            <div className={altpicstyle}>
            <Tooltip
        content={senderData?.Fname + '' + senderData?.Lname}
        style="light"
    >

            <FaUserAlt/>
            </Tooltip>
            </div>



                 {(message.attachment?.length > 4)? <div className='p-2 gap-1 flex flex-row rounded-md rounded-br-none bg-[#374557] text-[#F4F4F5]'>
                    <div className='flex flex-row justify-center items-center w-[90%]'>
                        <div>
                           <AiOutlineFile />
                        </div>
                        
                    <p className='text-sm'>{message?.attachment?.split('/')[1]}</p>
                    </div>
                    <div className='bg-white w-[1px] h-full'></div>
                    <div className='flex flex-row justify-center items-center'>
                    <a href={`${BASELINE}uploads/${message.attachment}`} download><BsArrowDownCircle color="white" size="1.2em"/></a>   
                    </div>

                    </div>: null}   
            <p className={style2}><TimeAgo date={message.messageCreated} /></p>
            </div>

    </div>
    )

}
export default Message;