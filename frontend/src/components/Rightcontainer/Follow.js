import React, { useState } from 'react'
import "./rightbar.css"
import addfriends from "../Images/add-user.png"
import userToFollow from "../Images/afterFollowImg.png"



function Follow({ userdetails }) {

  const [follow, setFollow] = useState(addfriends)
  const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWM2MmE3Nzk1YmRhODkxNWUzNWQyMSIsInVzZXJuYW1lIjoiam9lbCIsImlhdCI6MTY3MzQyNzkxN30.09fe5GK9BAZ6vYG1Nt8KTRGsWZYxBnwE9_L4hHM9cmM"
  let id = "63ac62a7795bda8915e35d21"
  const handleFollow = async (e) => {
 
     await fetch(`http://localhost:5000/api/user/follow/${userdetails._id}`,{method:'PUT',headers:{'Content-Type':"appliction/Json",token:accesstoken},body:JSON.stringify({user:`${id}`})})

    setFollow(userToFollow)
  }

  return (
    <div style={{ marginTop: "-10px" }} id={userdetails._id}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>


        <div style={{ display: "flex", alignItems: "center" }}>
          {userdetails.profile == "" ? <img src={`${userdetails.profile}`} className="profileImage" alt="" /> : <img src={`${userdetails.profile}`} className="profileImage" alt="" />}
          <div>
            <p style={{ marginLeft: "10px", textAlign: "start" }}>{userdetails.username}</p>
            <p style={{ marginLeft: "10px", textAlign: "start", marginTop: -15, fontSize: "11px", color: "#aaa" }}>Suggested for you</p>
          </div>
        </div>
        <div style={{ backgroundColor: "#aaa", padding: "10px", marginRight: 13, borderRadius: "50%", cursor: "pointer" }} onClick={e => handleFollow(userdetails._id)}>
          <img src={`${follow}`} className="addIcon" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Follow