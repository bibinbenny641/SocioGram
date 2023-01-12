import React from "react";
import Header from "../components/Header";
import { AuthProvider } from '../context/AuthContext'
import './HomePage.css'
import Sidebar from "../components/SideBar";
import UserProfile from "../components/profile/UserProfile";
import Topbar from "../components/topbar/Topbar";
import Post from "../components/posts/Post";
import FeedPage from "../components/posts/FeedPage";



const HomePage = () => {
    return (
        <>

            <Topbar />
            <div className="Home_main_div">

                <Sidebar />
                <FeedPage>
                    <Post />

                </FeedPage>
            </div>
            


        </>
    )
}
export default HomePage