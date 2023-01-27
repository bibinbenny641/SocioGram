import React from 'react'
import UserProfile from '../components/profile/UserProfile'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
import { Row, Col } from 'react-bootstrap'


function ProfilePage() {
  return (
    <>
      {/* <Row>
                <div style={{position:'sticky'}}>

                <Topbar/>
                </div>

            </Row>
      <Row >
        

        <div style={{ display: 'flex' }}>
          <SideBar />
          <div>
          <UserProfile />
            
          </div>
          <SideBar />
        </div>
      </Row> */}




<div className="theme-light">

            <Row>
                <div style={{position:'sticky'}}>

                <Topbar />
                </div>

            </Row>
            <Row>
            <div style={{display:'flex'}}>
                <SideBar/>
                <div>
                  {/* <UserProfile/>
                  <UserProfile/> */}
                </div>
                <SideBar/>
            </div> 
            </Row>
            </div>
    </>
  )
}

export default ProfilePage