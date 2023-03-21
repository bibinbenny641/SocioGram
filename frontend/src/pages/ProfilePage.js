import React from 'react'
import UserProfile from '../components/profile/UserProfile'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
import { Row, Col } from 'react-bootstrap'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar'


function ProfilePage() {
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
            <div className='mainhomepage' style={{ position: 'sticky', border:"rounded"}}>

              <UserProfile />

            </div>
            <Rightsidebar />
          </div>
        </Row>
      </div>
    </>
  )
}

export default ProfilePage