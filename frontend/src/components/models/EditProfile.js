import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import './addpost.css'

function EditProfile({refresh,setRefresh}) {
  let {user} = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  

  let editPro = async(e)=>{
    e.preventDefault()
    
    let response = await fetch(`http://127.0.0.1:8000/api/editpro/${user.user_id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify({'fullname':e.target.fullname.value,'user_name':e.target.username.value})
        
    })
    let data = await response.json()
    
    console.log("success ")
    console.log(data)
    console.log("success2");

    if (response.status===400){
        alert("othilla mwonuse")
        navigate('/')
    } else{
        // alert("all set")
        navigate('/myprofile')
        setRefresh(true)
    }
}
  
  return (
    <>
      <Button className='addpostbutton' variant="primary" onClick={handleShow}>
         Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={editPro}>
            <div className='login_input'>
                <label htmlFor="email">Full Name</label>
                <input type="text" name='fullname' placeholder={user.fullname}
                />
            </div>
            <div className='login_input'>
                <label htmlFor="email">Nickname</label>
                <input type="text" name='username' placeholder={user.user_name}
                />
            </div>
            
            <center>

            <button className='btn-primary addpostbutton' onClick={handleClose} >Save</button>
            </center>
            
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" >
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditProfile
// render(<EditProfile />);