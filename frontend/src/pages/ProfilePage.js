import React from 'react'
import UserProfile from '../components/profile/UserProfile'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
import './profilepage.css'
import './HomePage.css'


function ProfilePage() {
  return (
    <>
        
        <Topbar/>
        {/* <CollapsibleExample/> */}
    <div className='profilemain'>

        <SideBar/>
        <div className='container-fluid'>

        <UserProfile/>
        </div>

        <div className="sidebardiv">

        </div>
    </div>
    </>
  )
}

export default ProfilePage