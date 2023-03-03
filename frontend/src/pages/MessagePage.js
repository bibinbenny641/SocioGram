import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'

import { useContext, useEffect, useState } from "react";

import Message from '../components/messages/Message';
import { Row, Col } from 'react-bootstrap'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar';
import AddPosts from '../components/models/AddPosts';


function MessagePage() {

  return (
    <>
    <div className="theme-light">

<Row>
    <div style={{position:'sticky'}}>

    <Topbar />
    </div>

</Row>
<Row>
<div style={{display:'flex'}}>
    <SideBar/>
    {/* <div >
      <Message/>
    </div> */}
    <div className='position: sticky;'>


    <div className="overflow-hidden overscroll-none">
          {/* 2 components cointainer */}
          <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#111a21] h-screen">
            {/* LeftMenu */}
            <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
              <AddPosts/>
            </div>

            {/* ChatDetail */}
            <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
              {/* <ChatDetail /> */}
            </div>
          </div>
        </div>
    </div>
    <Rightsidebar/>
</div> 
</Row>
</div>
    </>
  )
}

export default MessagePage