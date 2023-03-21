import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { ImFolderDownload } from "react-icons/im";
import AuthContext from "../../context/AuthContext";
import Chat from "./Chat";

function Chats() {
  const [members, setMembers] = useState([]);
  // const [roomid, setRoomid] = useState([]);

  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let { user } = useContext(AuthContext)
  let {logoutUser} = useContext(AuthContext)
  let {MessageDetails} = useContext(AuthContext)
  let {roomid, setRoomid,isopen,setIsopen} = useContext(AuthContext)


  let chatlist = async () => {
    let response = await fetch(`http://127.0.0.1:8000/chat/chatlists/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },
    })
    let data = await response.json()
    if (response.status === 200) {
        
        setMembers(data)
      

    } else {
      logoutUser()
    }

  }
  function handleClick(id){
    setIsopen(true)
   
    createroom(id)
  }
  let createroom = async (usersid) => {

    let response = await fetch(`http://127.0.0.1:8000/chat/create_or_find_room/${user.user_id}/${usersid}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`


      },

    })
    let data = await response.json()

    if (response.status === 200) {
      setRoomid(data)


    } else {
      alert('failed')

    }

  }

  useEffect(() => {
    chatlist(user.user_id)
  }, [])

  return (
    // Chats main container
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* Archived container */}
      
     
      {/* Chats */}
      
      {/* {members !== null?console.log('haiiiii'):console.log('hoiiii')} */}
      {members.map((chat, i) => {
        return (
            <button key={i} onClick={()=>{handleClick(chat.seconduser);MessageDetails(chat)}}>

                <Chat
                chat = {chat}
                  // pp={chat.pp}
                  // contact={chat.seconduname}
                  // msg={chat.msg}
                  // time={chat.time}
                  // unreadMsgs={chat.unreadMsgs}
                  // active={i === 0}
                />
            </button>
        );
      })}
    </div>
  );
}

export default Chats;
