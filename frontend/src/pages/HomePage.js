import React from "react";
import './HomePage.css'

import UserProfile from "../components/profile/UserProfile";
import Topbar from "../components/topbar/Topbar";
import Post from "../components/posts/Post";
import FeedPage from "../components/posts/FeedPage";
import { Row} from 'react-bootstrap'
import SideBar from "../components/SideBar";
import Share from "../components/share/Share";
import Rightsidebar from "../components/Rightcontainer/rightsidebar/Rightsidebar";



const HomePage = () => {
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
                <div className="mainhomepage">
                    <Share/>
                    {/* <FeedPage> */}

                    <Post />
                    
                    {/* </FeedPage> */}
                </div>
                <Rightsidebar/>
            </div> 
            </Row>
            </div>
        </>
    )
}
export default HomePage