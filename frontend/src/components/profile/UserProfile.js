
import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import './userprofile.css'
import { useState, useEffect } from "react";
import EditProfile from "../models/EditProfile";
import { Navigate, useNavigate, Link } from "react-router-dom";
import AddPosts from "../models/AddPosts";
import View_followers from "./Viewfollowers";
import Rightbar from "../Rightcontainer/Rightbar";




import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";


function UserProfile() {
  let { user, auth_user, currentuser, setCurrentuser } = useContext(AuthContext)
  const [userdata, setUserdata] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [newpost, setNewpost] = useState(false)
  const [follower, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [viewfollower, setViewfollower] = useState([])
  const [viewfollowing, setViewfollowing] = useState([])
  const [post, setPost] = useState([])
  const [usersfollower, setUsersfollower] = useState(false)
  const [usersfollowing, setUsersfollowing] = useState(false)



  const follvr = function () {
    setUsersfollower(true)
    setUsersfollowing(false)
  }
  const follving = function () {
    setUsersfollowing(true)
    setUsersfollower(false)
  }
  const navigate = useNavigate()
  let userlist = async (id) => {
    let response = await fetch(`http://127.0.0.1:8000/api/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setUserdata(data.data)

    } else {
      alert("Something went wrong!!")
    }

  }
  let folow = async (id) => {

    let response = await fetch(`http://127.0.0.1:8000/follow/follow/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log(data);

      setFollowers(data.followers.length)
      setFollowing(data.following.length)
      setViewfollower(data.followers)
      setViewfollowing(data.following)

    } else {
      alert("Something went wrong!!")

    }

  }

  let usersPosts = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/userpost/${currentuser}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()

    if (response.status === 200) {

      setPost(data.data)

    } else {
      alert("Something went wrong!!")

    }

  }
  function bibin(id) {
    setCurrentuser(id)
    userlist(id)
    folow(id)


  }

  let follow_function = async (id) => {
    console.log("following function clicked")


    let response = await fetch('http://127.0.0.1:8000/follow/follow/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "firstuser": user.user_id, "seconduser": id })

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log('bibbibibib');

    } else {
      alert("this is wrong!!")

    }
  }



  useEffect(() => {
    userlist(user.user_id)
    folow(currentuser)
    usersPosts()
  }, [])

  useEffect(() => {
    // setViewfollowers(false)
    setRefresh(false)
    setNewpost(false)
    userlist(user.user_id)
  }, [refresh])

  return (

    <>
    
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
    </div>


















      {/* <div className="container-fluid overflow-auto  d-flex ">

        <div style={{ marginTop: "20px", marginLeft: "10px", boxShadow: "3px 3px 5px 6px #ccc", width: "80vh", height: "85vh" }} className=" overflow-auto container">

          <div className="container">
            <div className="container-fluid user text-center">

              <div className="profile">

                <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" className="image-fluid rounded-circle" width="80"></img>

              </div>

            </div>

            <div className="row">

              <div className="col-lg-6 col-sm-12">

                <h6 className="text-muted d-block mb-2">Name</h6>
                <u><strong><span className="text-muted d-block mb-2">{userdata.fullname}</span></strong></u>
                <h6 className="text-muted d-block mb-2">Phone No</h6>
                <u><strong><span className="text-muted d-block mb-2">{userdata.phoneno}</span></strong></u>

                <h6 className="text-muted d-block mb-2">Date of Birth</h6>
                <u><strong><span className="text-muted d-block mb-2">{userdata.dob}</span></strong></u>
              </div>
              <div className="col-lg-6 col-sm-12">

                <h6 className="text-muted d-block mb-2">Email</h6>
                <strong><span className="text-muted d-block mb-2">{userdata.email}</span></strong>
                <h6 className="text-muted d-block mb-2">Username</h6>
                <strong><span className="text-muted d-block mb-2">{userdata.user_name}</span></strong>
              </div>
            </div>
          </div>


          <div className=" row mt-3 text-center">

            {
              user.user_id === currentuser ?
                <div>
                  <EditProfile setRefresh={setRefresh} /><br></br><br></br>
                  <AddPosts setNewost={setNewpost} /><br></br><br></br>
                </div>
                :
                <button onClick={() => { follow_function(currentuser) }} type="button" className="btn btn-outline-success">Follow</button>

            }

            <div className="col-lg-6 col-sm-12 ">

              <div onClick={() => (follvr())} className="stats">
                <h6 onClick={() => setLgShow(true)} className="text-muted d-block mb-2">follower</h6>
                <span onClick={() => setLgShow(true)} className="text-muted d-block mb-2">{follower}</span>

              </div>

            </div>

            <div className="col-lg-6 col-sm-12">
              <div onClick={() => (follving())} style={{ paddingTop: "0px" }} className="stats">
                <h6 onClick={() => setLgShow(true)} className="text-muted d-block mb-2">following</h6>
                <span onClick={() => setLgShow(true)} className="text-muted d-block mb-2">{following}</span>

              </div>

            </div>
          </div>
          {usersfollower ? <div><Rightbar propsFollower={viewfollower} userlist={userlist} folow={folow} usersfollower={usersfollower} /></div> : null}
          {usersfollowing ? <div><Rightbar propsFollower={viewfollowing} userlist={userlist} folow={folow} usersfollower={usersfollower} /></div> : null}

          <div style={{ borderRadius: "15px" }} className="container-fluid">
            <div className="card text-white  mb-3" >
              <div className="card-header text-warning "><span className="text-success">Posts</span></div>
              <div className="card-body">
                {post.map((po) => {
                  return (

                    <div className="loop postimage">

                      <img style={{ height: "100px", width: "100px", borderRadius: "10px" }} src={`http://127.0.0.1:8000${po.postImage}`} />

                    </div>

                  )
                })}

                <div className="loop postimage">

                </div>
                <div className="loop">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}







    </>
  )
}

export default UserProfile