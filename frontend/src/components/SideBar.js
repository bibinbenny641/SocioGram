import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState,useContext } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
 
function SideBar() {
  let {user,logoutUser} = useContext(AuthContext)

  return (
    // 
    <>


      <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={'/'}>

            <span>Home</span>
            </Link>
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={'/message'}>

            <span>messages</span>
            </Link>
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={`/profile/${user.user_id}`}>
            <span>My Profile</span>
            </Link>
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={'/people'}>
            <span>Peoples</span>
            </Link>
          </div>
          {/* <div className="item">
            <img src='https://cdn-icons-png.flaticon.com/512/21/21104.png' alt="" />
            <span>Watch</span>
          </div> */}
          {/* <div className="item">
            <img src='' alt="" />
            <span onClick={logoutUser}>LogOut</span>
          </div> */}
        </div>
        <hr />
        {/* <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src='' alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Messages</span>
          </div>
        </div> */}
        <hr />
        
      </div>
    </div>
    </>



  );
}
export default SideBar
