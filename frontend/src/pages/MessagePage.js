import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'

import { useContext, useEffect, useState } from "react";

import Message from '../components/messages/Message';
import { Row, Col } from 'react-bootstrap'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar';
import AddPosts from '../components/models/AddPosts';
import LeftMenu from '../components/chatComponents/LeftMenu';
import ChatDetail from '../components/chatComponents/ChatDetail';
import AuthContext from '../context/AuthContext';


function MessagePage() {
  let { messageDetail, roomid } = useContext(AuthContext)

  return (
    <>
      <div className="theme-light">

        <Row>
          <div style={{ position: 'sticky' }}>

            <Topbar />
          </div>

        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <SideBar />
            <div className='mainhomepage'>

              <div className="overflow-hidden overscroll-none" >
                {/* 2 components cointainer */}
                <div className="flex justify-start  items-center  h-screen" style={{ height: '100%' }}>
                  {/* LeftMenu */}
                  <div className="bg-[#f1f5f9] min-w-[340px] max-w-[500px] w-100 h-100">
                    <LeftMenu />
                  </div>

                  {/* ChatDetail */}
                  <div className="bg-[#f1f5f9] min-w-[655px] max-w-[1120px] w-100 h-100">
                    {messageDetail ?
                      <ChatDetail /> :
                      null}
                  </div>
                </div>
              </div>
            </div>
            {/* <Rightsidebar/> */}
          </div>
        </Row>
      </div>
    </>
  )
}

export default MessagePage