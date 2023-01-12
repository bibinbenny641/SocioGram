  import React, { useState } from 'react'
  import './sidebar.css'
  import Headers from './Header';
  import AuthContext from '../context/AuthContext';
  import { useContext } from 'react';

  import {
    AiFillHome,
    AiOutlineMenu,
    AiOutlineSearch,
    AiOutlineMessage,
    AiTwotoneNotification,
    AiOutlineUser,
    AiOutlineLogout
  } from "react-icons/ai"
  import { NavLink } from 'react-router-dom';
  import { Link} from 'react-router-dom'

  function SideBar({Children}) {
    const [isOpen,setIsOpen] = useState(true)
    const toggle = ()=> setIsOpen(!isOpen)
    let {user,logoutUser} = useContext(AuthContext)

    
    const menuItem = [
      {
        path:'/',
        name:'home',
        icon:<AiFillHome/>
        
      },
      
      {
        path:'/message',
        name:'message',
        icon:<AiOutlineMessage/>
      },
      {
        path:'/notification',
        name:'notification',
        icon:<AiTwotoneNotification/>
      },
      {
        path:'/myprofile',
        name:'profile',
        icon:<AiOutlineUser/>
      },
      
    ]


    return (
      
      <div className='sidebar_container'>
          <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
            <div className="top_section">
              <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
              <div style={{marginLeft : isOpen ? "50px" : "0px"}} className="bars">
                <AiOutlineMenu onClick={toggle}/>
              </div>
            </div>
            {
              menuItem.map((item,index)=>{
                return(
                  <NavLink to={item.path} key={index} className='link' activeclassname='active'>
                  <div className="icon">{item.icon}</div>
                  <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                  </NavLink>
                )
              })
            }

            <div style={{display: isOpen ? "block" : "none"}} className="link_text">

            {user ? (
                <center><button className='btn-primary btn-logout' onClick={logoutUser}>logout</button></center>
            ):(
                <Link to="/login">Login</Link>
            )}

            
          </div>
          </div>
          
          
          <main>{Children}</main>
      </div>
    )
  }

  export default SideBar
