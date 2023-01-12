import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
import './profilepage.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { border } from '@mui/system';
import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useState } from "react";
import AuthContext from '../context/AuthContext';
import { BsChatText } from "react-icons/bs";


function MessagePage() {

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
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log(data.following[0], 'new');
      setMyfollowers(data.following)

    } else {
      alert("Something went wrong!!")

    }



  }
  useEffect(() => {

    folow()

  }, [])
  return (
    <>

      <Topbar />

      <div className='profilemain'>

        <SideBar />
        <div className='container-fluid' style={{ marginLeft: '10px' }}>
          <div style={{ border: 'none', height: '80vh', width: '70vh', marginLeft: '35px' }} className='container mt-5 overflow-x'>
            <p style={{ color: 'red' }}>chat with me</p>

            {/* <tr> */}
            {/* 
          <tr style={{paddinngTop:"20px"}} key="{i.id}" >{i.secondUname}<button type="button" class="btn btn-success" data-toggle="modal" data-target={`#exampleModal${index}`}>
          message 
        </button></tr>
        
           */}

            {/* </tr> */}

            {
              myfollowers.map((i, index) => (
                <div style={{ marginLeft: "0px", width: "60vh" }} className="alert alert-dark" role="alert">
                  <div className='row'>

                    <div className='col-lg-8 col-md-6 col-sm-2'>
                      {i.secondUname}
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-2'>
                      <BsChatText style={{height:"40px",width:"50px"}} variant="primary" onClick={() => handleShow(i.secondUname)}>
                      {/* <BsChatText/> */}
                      </BsChatText>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>chat with {userChat} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className='row'>
                            <div className='col-md-8'>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
                                    <p>hii</p>
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

          </div>

        </div>

        <div className="sidebardiv">

        </div>
      </div>



    </>
  )
}

export default MessagePage