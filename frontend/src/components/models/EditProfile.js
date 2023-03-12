import React, { useContext, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@chakra-ui/react'
// import Modal from 'react-bootstrap/Modal';
import { MdBuild } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
// import './addpost.css'
import { useDisclosure } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Input,FormLabel,FormControl } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function EditProfile({refresh,setRefresh,userdata}) {
  let {user} = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()


  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)





  

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
        // navigate('/myprofile')
        setRefresh(true)
    }
}
  
  return (
    <>
    {/* <center>

      
      <Button onClick={handleShow} leftIcon={<MdBuild />} colorScheme='blue' variant='solid'>
    Edit Profile
  </Button>
    </center>

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

            <button style={{color:'green'}} className=' addpostbutton' onClick={handleClose} >Save</button>
            </center>
            
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal> */}






      <Button 
        leftIcon={<MdBuild />}
        ml='4'
        colorScheme='blue' variant='solid'
        onClick={() => {
          setOverlay(<OverlayTwo />)
          onOpen()
        }}
      >
        Edit Profile
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={editPro}>
            <div className='login_input'>
                <FormLabel htmlFor="email">Full Name</FormLabel>
                <Input type="text" name='fullname' placeholder={userdata.fullname}
                />
            </div>
            <FormControl>
                <FormLabel htmlFor="email">Nickname</FormLabel>
                <Input type="text" name='username' placeholder={userdata.user_name}
                />
            </FormControl>
            
            <center>

            <Button colorScheme='blue' variant='outline'  onClick={onClose} >Save</Button>
            </center>
            
        </form>


          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>







    </>
  );
}
export default EditProfile
// render(<EditProfile />);