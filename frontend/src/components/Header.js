import React,{useState} from 'react'
import {IoMdBookmark, IoMdCall, IoMdChatboxes, IoMdClipboard, IoMdClose, IoMdHammer, IoMdHome, IoMdImage, IoMdMenu, IoMdPerson} from 'react-icons/io'
import { Link } from 'react-router-dom'
// import './header.css'

const Header = () => {

    const [active,setActive] = useState(false)

    const activateNav = () => {
        setActive(!active)
    } 

  return (
    <div className={active ? 'header' : 'header-mobile'}>

               <div className='menu-icon' onClick={activateNav}>

                    {!active ? <IoMdMenu className='menu'/> : <IoMdClose className='menu'/>}

               </div>

        <nav>
            <ul className={active ? 'ul-item' : 'ul-item oicon'}>

                <li>
                    <IoMdImage className='icon'/>
                    <Link to='/'>Alumni</Link>
                </li>


                <li>
                    <IoMdBookmark className='icon'/>
                    <Link to='/'>History</Link>
                </li>


                <li>
                    <IoMdPerson className='icon'/>
                    <Link to='/'>Testimonials</Link>
                </li>


                <li>
                    <IoMdHome className='icon'/>
                    <Link to='/'>Partners</Link>
                </li>


                <li>
                    <IoMdChatboxes className='icon'/>
                    <Link to='/'>About</Link>
                </li>


                <li>
                    <IoMdHammer className='icon'/>
                    <Link to='/'>Tutorials</Link>
                </li>



                <li>
                    <IoMdCall className='icon'/>
                    <Link to='/'>Contact</Link>
                </li>


                <li>
                    <IoMdClipboard className='icon'/>
                    <Link to='/'>FAQ</Link>
                </li>

            </ul>
        </nav>

    </div>
  )
}

export default Header