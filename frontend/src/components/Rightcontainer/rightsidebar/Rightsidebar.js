import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { toast } from "react-toastify";

import "./rightsidebar.css";


const Rightsidebar = () => {
  const navigate = useNavigate()
  let { logoutUser } = useContext(AuthContext)
  let { user } = useContext(AuthContext)
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let [suggesteduser, setSuggesteduser] = useState([])
  let [followbackusers, setFollowbackusers] = useState([])
  let { viewfollower, viewfollowing, setViewfollower, setViewfollowing, result, setResult } = useContext(AuthContext)



  let followSuggestion = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/suggestion/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 201) {
      setSuggesteduser(data)
      console.log(suggesteduser, 'sss')


    } else {
      // logoutUser()

    }
  }

  let followuser = async (id) => {
    console.log(id, 'followuser function')
    let response = await fetch(`http://127.0.0.1:8000/follow/follow_a_user/${user.user_id}/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      toast.success(data['hai'])



    } else {
      // logoutUser()
      // alert('failed')

    }
  }
  let followback = async (id) => {
    console.log(id, 'followuser function')
    let response = await fetch(`http://127.0.0.1:8000/follow/follow_back_users/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      setFollowbackusers(data)
      // alert('success')


    } else {
      // logoutUser()
      // alert('failed')

    }
  }
  const userProfile = (id) => {

    navigate(`/profile/${id}`)

  }


  useEffect(() => {
    followSuggestion()
    followback()

  }, [])



  return (
    <div className="rightBar">
      <div className="container">
        {/* <div className="item">
          <span>Users Follows You</span>

          
          {
            result.map((i, index) => (

              <div key={index} className="user">

                <div onClick={() => { userProfile(i.id) }} className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />

                  <span >{i.fullname}</span>
                </div>

                <div className="buttons">
                  {console.log(viewfollowing, 'hshshshshsh')}
                  <Button colorScheme='blue' onClick={() => { followuser(i.firstuser) }} >followback</Button>

                </div>

              </div>
            ))
          }



        </div> */}
        <div className="item" >
          {console.log(suggesteduser, 'jjsjsjsjs')}
          <span>Suggestions For You</span>
          {
            suggesteduser.map((i, index) => (

              <div key={index} className="user">
                {/* <Link > */}
                <div onClick={() => { userProfile(i.id) }} className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />

                  <span >{i.fullname}</span>
                </div>
                {/* </Link> */}
                <div className="buttons">
                  <Button colorScheme='blue' onClick={() => { followuser(i.id) }} >follow</Button>

                </div>

              </div>
            ))
          }

        </div>

        {/* <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Rightsidebar;