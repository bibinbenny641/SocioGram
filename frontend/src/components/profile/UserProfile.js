
import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import './userprofile.css'
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import EditProfile from "../models/EditProfile";
import { Navigate, useNavigate,Link } from "react-router-dom";
import AddPosts from "../models/AddPosts";
import View_followers from "./Viewfollowers";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function UserProfile() {
  let { user,auth_user,currentuser,setCurrentuser } = useContext(AuthContext)
  const [userdata, setUserdata] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [newpost,setNewpost] = useState(false)
  const [follower, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [viewfollower, setViewfollower] = useState([])
  const [viewfollowing, setViewfollowing] = useState([])
  const [post,setPost] =useState([])
  const [usersfollower,setUsersfollower] = useState(true)



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
      // setList(data.data)
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
  function bibin(id){
    setCurrentuser(id)
    userlist(id)
    folow(id)
    

  }

  let follow_function = async (id)=>{
    console.log("following function clicked")
   
    
    let response = await fetch('http://127.0.0.1:8000/follow/follow/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({"followedBy":user.user_id, "following":id})

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log('bibbibibib');
      
    } else {
      alert("this is wrong!!")

    }
  }

  

  useEffect(() => {
    userlist(currentuser)
    folow(currentuser)
    usersPosts()
  }, [])

  useEffect(() => {
    // setViewfollowers(false)
    setRefresh(false)
    setNewpost(false)
    userlist(currentuser)
  }, [refresh])

  return (

    <>
      <div className="container-fluid overflow-auto  d-flex ">

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
                user.user_id === currentuser?
                <div>
            <EditProfile setRefresh={setRefresh} /><br></br><br></br>
            <AddPosts setNewost={setNewpost} /><br></br><br></br>
                  </div>
            :
            <button onClick={()=>{follow_function(currentuser)}} type="button" className="btn btn-outline-success">Follow</button>

          }

            <div className="col-lg-6 col-sm-12 ">

              <div className="stats">
                <h6 onClick={() => setLgShow(true)} className="text-muted d-block mb-2">follower</h6>
                <span onClick={() => setLgShow(true)} className="text-muted d-block mb-2">{follower}</span>

              </div>

            </div>
            <div className="col-lg-6 col-sm-12">
              <div style={{ paddingTop: "0px" }} className="stats">
                <h6 onClick={() => setLgShow(true)} className="text-muted d-block mb-2">following</h6>
                <span onClick={() => setLgShow(true)} className="text-muted d-block mb-2">{following}</span>

              </div>

            </div>
          </div>
          <div style={{ borderRadius: "15px" }} className="container-fluid">
            <div className="card text-white  mb-3" >
              <div className="card-header text-warning "><span className="text-success">Posts</span></div>
              <div className="card-body">
                {post.map((po) => {
                  return(

                    <div className="loop postimage">
                    
                      <img style={{height:"100px",width:"100px",borderRadius:"10px"}} src={`http://127.0.0.1:8000${po.postImage}`}   />

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
      </div>



      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            hai  {userdata.fullname}
          </Modal.Title>
        </Modal.Header>


        <Modal.Body>


          <Card style={{ width: '18 rem' }}>
            <ListGroup variant="flush">
              {/* {
                viewfollower.map((foll) => (

                  <ListGroup.Item key="{foll.id}">{foll.followingByUname}</ListGroup.Item>
                )

                )
              } */
              <div className="row">
                <div style={{background:"grey",borderRadius:'30px'}} className="col-md-6">
                <h6 onClick={()=>{setUsersfollower(true)}}><center>followers</center></h6>
                </div>
                <div style={{background:"grey",borderRadius:'30px'}} className="col-md-6">
                <h6 onClick={()=>{setUsersfollower(false)}}><center>following</center></h6>
                </div>
                
                <div>
                  {
                  usersfollower ? 
                  
                    viewfollower.map((foll) => (
                        
                      <p style={{paddingLeft:"20px"}} onClick={()=>{bibin(foll.currentuser)}} key={foll.id}>{foll.followedByUname}</p>
                    )
    
                    )
                  :
                  viewfollowing.map((foll) => (

                    <p onClick={()=>(setCurrentuser(foll.currentuser))} key={foll.id}>{foll.secondUname}</p>
                  )
  
                  )
                  }
                  
                </div>

              </div>
              }

            </ListGroup>
          </Card>



        </Modal.Body>
      </Modal>
      



    </>
  )
}

export default UserProfile