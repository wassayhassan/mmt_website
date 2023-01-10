import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";
import RoomComponent from "./roomcomponent";


function GroupChatRoom({conversations}) {

        return (
            <>
            
                <div className="flex flex-1 h-screen w-[100%]">
                    <div className="container p-5">
                        <div className="max-w-full w-full h-full flex flex-col">
                            <div className="w-full h-full lg:h-72 2xl:h-[50em] overflow-y-scroll">
                                {conversations && conversations.map((con, idx)=> {
                                    return <RoomComponent conversation ={con} key={con.conversationId}  />
                                })}
            


                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }

export default GroupChatRoom;