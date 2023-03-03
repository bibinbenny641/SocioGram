import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import "./addpost.css"
import {toast } from "react-toastify";

function AddPosts({newpost,setNewpost}) {
  const generateError = (err) => 
        toast.error(err,{
            position: 'bottom-right',
        })

  const [show, setShow] = useState(false);
  const [file,setFile] = useState(null)
  const [caption,setCaption] = useState('')
  let navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const  format = ['jpeg','png','jpg']

  const {user} = useContext(AuthContext)


  let PostAdd = async(e)=>{
    e.preventDefault()
    console.log(caption,'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    const formData = new FormData();
    formData.append('image',file)
    formData.append('caption',caption)
    console.log("mmmmmm")
    console.log(file)
    let response = await fetch(`http://127.0.0.1:8000/follow/addposts/${user.user_id}/`,{
        method:'POST',
        // headers:{
        //     'Content-Type':'multipart/form-data'
        // },
        body:formData

        // body:JSON.stringify({'post':file,'caption':"ddd"})
        
    })
    let data = await response.json()
    
    console.log("success ")

    if (response.status===400){
      generateError("an error occured")
        navigate('/')
    } else{
      generateError('post Added successfully')
        setNewpost(true)
        navigate('/myprofile')
    }

}


  return (
    <>
      <Button className='addpostbutton' variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       

        <form encType="multipart/form-data" onSubmit={PostAdd}>
            <input  accept=".jpg, .jpeg, .png" onChange={(e)=>{
                setFile(e.target.files[0])} }type="file" id="post" name="post"/>
            <div className='login_input'>
                <label  htmlFor="email">Caption</label>
                <input type="text" onChange={(e)=>{setCaption(e.target.value)}} name='caption' placeholder='caption for the post'
                />
            </div>
           
            <center>

            <button className='btn-success' onClick={handleClose} >Save</button>
            </center>
            
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPosts