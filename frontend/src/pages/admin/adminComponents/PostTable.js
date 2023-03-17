import React, { useContext, useEffect, useState } from 'react'
// import Table from 'react-bootstrap/Table';
import { useNavigate} from 'react-router-dom'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  Tag,
  Button

} from '@chakra-ui/react'
import AuthContext from '../../../context/AuthContext'


function PostTable() {
  let navigate = useNavigate()

  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let { logoutAdmin } = useContext(AuthContext)
  const [postlist, setPostlist] = useState([])
  console.log(postlist,"jjdjjdjdjdjdj")
  
  let post = async () => {

    console.log(String(JSON.parse(authTokens).access) + 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    let response = await fetch('http://127.0.0.1:8000/follow/adminpost/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()
    if (response.status === 200) {
      console.log(data)
      setPostlist(data)


    } else {
      
      navigate('/admin')

    }


  }
  useEffect(() => {
    setAuthTokens(localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
    post()
  }, [postlist])



  let handleClick = async (obj_id) => {
    console.log(obj_id)
    let response = await fetch(`http://127.0.0.1:8000/follow/deletePostAdmin/${obj_id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()
    console.log(data)
    if (response.status === 200) {
      console.log("havuuuu")
      // userlist()

    } else {
      alert("Something went wrong!!")
    }

  }

  return (
    <div>

      <br></br>
      <center>
        <Tag variant='solid' colorScheme='teal'>Post Details</Tag>
      </center>
      

      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Sl No.</Th>
              <Th>username</Th>
              <Th>Caption</Th>
              <Th>Image</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {postlist?.map((obj, index) =>
              <Tr key={index}>
                <Td>{obj.id}</Td>
                <Td >{obj.username}</Td>
                <Td>{obj.postCaptioin}</Td>

                {

                  obj.postImage != "/media/null" ?
                  <Td>
                    <img className='rounded' style={{height:'70px',widows:"50px"}} src={`http://127.0.0.1:8000${obj.postImage}`}></img>
                  
                </Td>:
                <Td>
                  <p style={{color:'red'}}>
                    no image to show
                  </p>
                  
                </Td>
                }

                <Td> <Button colorScheme='red' onClick={() => handleClick(obj.id)} >Delete</Button>{' '}</Td>


              </Tr>
            )
            }

          </Tbody>

        </Table>
      </TableContainer>

    </div>
  )
}

export default PostTable