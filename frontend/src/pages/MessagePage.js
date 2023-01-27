import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
// import './profilepage.css'

import { useContext, useEffect, useState } from "react";

import Message from '../components/messages/Message';
import { Row, Col } from 'react-bootstrap'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar';


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
    <div >
      <Message/>
        
    </div>
    <Rightsidebar/>
</div> 
</Row>
</div>
    </>
  )
}

export default MessagePage