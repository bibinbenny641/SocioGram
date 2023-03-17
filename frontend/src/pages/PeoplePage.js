import React from 'react'
import { Row } from 'react-bootstrap'
import Friends from '../components/peoples/Friends'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'

function PeoplePage() {
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
        <div className="mainhomepage">
            <Friends/>
        
        </div>
    </div>
</Row>
</div>


    </>
  )
}

export default PeoplePage