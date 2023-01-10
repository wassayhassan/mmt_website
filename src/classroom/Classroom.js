import React, { useEffect, useState, useRef, isValidElement } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import Peer from "simple-peer";
import "./remove_scroll.css";
import axios from "axios";
import FabricJSCanvas from "./check";

const serverUrl = "http://localhost:8080";
const peer = new Peer("pick-an-id");

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return (
    <video muted className="w-full rounded-2xl mb-2" autoPlay playsInline style={{ width: "400px" }} ref={ref} />
  );
}

function Classroom() {
  const [uid, setuid] = useState(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
  const { id } = useParams(); //room id

  //chat
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [messageList, setMessageList] = useState([]);
  //Send file
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  //video streaming
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = id;
  const [streamcam, setstreamcam] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect(serverUrl);
    socketRef.current.emit("join_chat_room", roomID);
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push(peer);
        })
        setPeers(peers);
      })

      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })

        setPeers(users => [...users, peer]);
      });

      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socketRef.current.on("receive_message", data => {
        console.log(data);
        setMessageReceived(data.uid + ": " + data.message);
        let newMessage = data.uid + ": " + data.message;

        setMessageList(oldMessage => [...oldMessage, newMessage]);
      });
    })
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
    })

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;
  }

  //chat
  const sendMessage = () => {
    if (selectedFile != null) {
      uploadFile().then(val => {
        let newMessage = uid + ": " + "[" + val + "]";
        socketRef.current.emit("send_message", { message: "[" + val + "]", id, uid });
        setMessageList(oldMessage => [...oldMessage, newMessage]);
        setSelectedFile(null);
      });

      return;
    } else {
      socketRef.current.emit("send_message", { message, id, uid });
      let newMessage = uid + ": " + message;

      setMessageList(oldMessage => [...oldMessage, newMessage]);
      document.getElementById("chatText").value = '';
      setMessage('');
    }
  };

  const uploadFile = async (e) => {
    document.getElementById('fileUploadElement').value = null

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(serverUrl + "/upload", formData);
      console.log("= ", selectedFile.name);
      return "uploads/get/" + selectedFile.name;
    } catch (ex) {
      console.log(ex);
    }
  };

  const onFileChange = (event) => {
    setFileName(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };

  const extractMessage = (orginalMessageLine) => {
    let message = orginalMessageLine.substring(orginalMessageLine.indexOf(':') + 1)

    if (message.includes('[') && message.includes(']')) {
      let imgName =
        message.substring(
          message.indexOf("[") + 1,
          message.lastIndexOf("]")
        );
      let imgUrl = serverUrl + "/" + imgName;
      return <a href={imgUrl} target="_blank" rel="noopener noreferrer"> {imgName}</a>;
    }
    return message;
  };
  //screen share
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
      userVideo.current.srcObject = stream;


    })
  }
  return (
    <div className="bg-[#D5D5D5]">
      <section>
        <div className="flex flex-1 h-screen w-full m-auto">
          <div className="container">
            <div className="max-h-full h-full flex flex-row gap-8">
              <div className="flex flex-col w-full h-full ">
                <div className="flex flex-col justify-between w-full h-full bg-white">

                <FabricJSCanvas 
                  roomID = {roomID}
                  socketRef = {socketRef}
                />

                </div>


              </div>

              <div className="flex flex-col w-1/4 w-full h-full max-h-full">

                <div className="grid columns-auto overflow-auto no-scrollbar" style={{ height: "800px" }}>
                  <video muted ref={userVideo} className="w-full rounded-2xl mb-2" autoPlay playsInline style={{ width: "400px" }} />
                  {peers.map((peer, index) => {
                    return (
                      <Video key={index} peer={peer} />
                    );
                  })}

                  {/* <div
                    className="bg-[#374557] w-full py-12 px-8 text-center text-white text-3xl font-bold rounded-2xl mb-4">
                    <span>Video Chat</span>
                  </div> */}

                </div>

                <div className="absolute bottom-0">
                  <div className="bg-gray-200 p-4 font-bold text-3xl">
                    <span>Live Chat</span>
                  </div>
                  <div className="p-3 overflow-y-scroll h-full bg-white">
                    <table>
                      <tbody>
                        {messageList.map((item, key) =>
                          <div>
                            <div key={key} className="flex justify-start mb-3">
                              <div>
                                <div className="flex flex-col gap-1 text-left space-y-5 w-full ">
                                  <div>
                                    <h4 className="text-sm font-bold mb-1 text-gray-700">{item.substring(0, item.indexOf(':'))}</h4>
                                    <span
                                      className="text-xs p-2 rounded-lg bg-[#F4F4F5] text-[#626a75] inline-block">
                                      {extractMessage(item)}
                                    </span>
                                    <p className="text-gray-400 text-left text-[10px] font-semibold my-1">
                                      <time>12:45</time>
                                      PM
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 w-full bg-white mb-24">

                    <form>
                      <div className="relative">
                        <textarea type="search" id="chatText" rows="1"
                          className="block p-2 pl-3 w-full text-xs text-gray-900 bg-gray-100 rounded-lg border-2 border-gray-300 outline-none"
                          required=""
                          onChange={(event) => {
                            setMessage(event.target.value);
                          }}
                        />
                        <div className=" absolute top-[5px] right-2.5 flex gap-2 items-center">

                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                              height="16">
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                fill="rgba(115,121,122,1)" />
                            </svg>
                          </span>

                          <button onClick={sendMessage} disabled={message === '' && selectedFile == null}
                            type="button" className="text-white bg-[#374557] hover:bg-[#2e3a49] font-medium rounded-lg text-sm px-2.5 py-1
                          text-center inline-flex items-center outline-none">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                              height="18">
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M3 13h6v-2H3V1.846a.5.5 0 0 1 .741-.438l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V13z"
                                fill="rgba(236,240,241,1)" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <input type="file" id="fileUploadElement" onChange={onFileChange} />
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>);
}

export default Classroom;
