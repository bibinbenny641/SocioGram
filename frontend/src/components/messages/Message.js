import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../../context/AuthContext';


import { BsChatText } from "react-icons/bs";
import Post from '../posts/Post';
import AddPosts from '../models/AddPosts';

function Message() {
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let {logoutUser} = useContext(AuthContext)
    
  const [show, setShow] = useState(false);
  const [userChat, setUserChat] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = (user) => {
    setUserChat(user)

    setShow(true);
  }

  let { user } = useContext(AuthContext)
  const [myfollowers, setMyfollowers] = useState([])

  let folow = async (id) => {

    let response = await fetch(`http://127.0.0.1:8000/follow/follow/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log(data.following[0], 'new');
      setMyfollowers(data.following)

    } else {
      logoutUser()

    }
  }
  useEffect(() => {

    folow()

  }, [])
  return (
    <>
    {/* <div className='container-fluid' style={{ marginLeft: '10px' }}>
          <div style={{ border: 'none', height: '80vh', width: '70vh', marginLeft: '35px' }} className='container mt-5 overflow-x'>
            <p style={{ color: 'red' }}>chat with me</p>
            {
              myfollowers.map((i, index) => (
                <div style={{ marginLeft: "0px", width: "60vh" }} className="alert alert-dark" role="alert">
                  <div className='row'>

                    <div className='col-lg-8 col-md-6 col-sm-2'>
                      {i.secondUname}
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-2'>
                      <BsChatText style={{ height: "40px", width: "50px" }} variant="primary" onClick={() => handleShow(i.secondUname)}>

                      </BsChatText>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>chat with {userChat} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className='row'>
                            <div className='col-md-8'>
                              <p>hii</p>

                            </div>
                            <div className='col-md-4'>
                              jj
                            </div>

                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={handleClose}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>

                    </div>

                  </div>

                </div>
                

              ))}
              <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

          </div>

        </div> */}
        
    
    
    </>
  )
}

export default Message