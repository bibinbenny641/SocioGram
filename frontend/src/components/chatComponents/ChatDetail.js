import React, { useState, useEffect, useRef, useContext } from "react";
// import RoundedBtn from "./Common/RoundedBtn";
// import { messagesData } from "../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import RoundedBtn from "../common/RoundedBtn";
import AuthContext from "../../context/AuthContext";
import Message from "./Message";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Card } from "@chakra-ui/react";




function ChatDetail() {
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let { messageDetail, roomid, user, setIsopen } = React.useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [isTrue, setIsTrue] = useState(false)
  console.log('message', messages)
  const socketRef = useRef(null);
  let room = roomid.id
  const bottomRef = useRef(null);
  let get_messages = async () => {

    let response = await fetch(`http://127.0.0.1:8000/chat/getMessages/${roomid.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log(data, 'hhdhdhdhd')
      setMessages(data)

    } else {
      alert('failed')
    }
  }
  useEffect(() => {

    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${room}/${user.user_id}/`);

    socketRef.current.onmessage = (event) => {
      setIsTrue(!isTrue)
      // setMessages([...messages, JSON.parse(event.data)]);
    }

    return () => {
      socketRef.current.close();
    }
  }, [messages, room]);
  useEffect(() => {
    get_messages()
  }, [room, isTrue]);
  console.log(messages, 'aaaaaaaaaaaaaaaaaaaa')

  //   const [messages, setMessages] = useState(messagesData);
  //   const [typing, setTyping] = useState(false);

  //   const inputRef = useRef(null);
  //   const bottomRef = useRef(null);


  const handleInputSubmit = () => {
    socketRef.current.send(message);
    setMessage('');
    get_messages()
  };
  const backtohome = () => {
    console.log('its working')
    setIsopen(false)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);



  return (
    

    

    <div className="flex flex-col h-screen" style={{ height: '90vh',width:'48vh' }}>
      <div className="flex justify-between bg-[#f8fafc] h-[60px] p-3">
        <div className="flex items-center">
          <Link to={'/message'}>
            <ArrowBackIcon onClick={backtohome} />
          </Link>
          <img
            src="https://www.nicepng.com/png/detail/160-1608012_mascot-animate-cartoon-character-vector-png.png"
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          <div className="flex flex-col">
            <h1 className="text-dark font-medium">{messageDetail ? messageDetail.secondUname : 'haiii'}</h1>

            {/* Status */}
            {/* <p className="text-[#8796a1] text-xs">online</p> */}
          </div>
        </div>


        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#f8fafc]  bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >

        {messages.map((msg, index) => {
          // if(msg.sender ===user.user_id){
          //   console.log('true its current user')

          return (
            <Message
              msg={msg.message}
              time={msg.timestamp}
              sender={msg.sender}
              // img={msg.img}
              sent={msg.sent}
              index={index}
            />
          )
          // }else{return(
          //     <Message
          //       msg={msg.message}
          //       time={msg.timestamp}
          //       sender={msg.sender}
          //       // img={msg.img}
          //       sent={msg.sent}
          //     />

          //   )
          //     }
        })}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />}
        //  onClick={handleEmojiClick}
        />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />}
          //    onClick={handleImgUpload}
          />
        </span>


        {/* Input bar */}
        <input
          type="textarea"
          placeholder="Type a message"
          className="bg-[#cbd5e1] rounded-lg outline-none text-sm text-grey-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#1d4ed8]"
          // onChange={handleInputChange}
          value={message} onChange={(event) => setMessage(event.target.value)}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">

          <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />

        </span>
      </div>
    </div>
    
  );
}

export default ChatDetail;
