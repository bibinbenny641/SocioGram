
import React, { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import './userprofile.css'
import { useState, useEffect } from "react";
import EditProfile from "../models/EditProfile";
import Post from '../../components/posts/Post'
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

import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Avatar,
  useColorModeValue,
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { useParams } from "react-router-dom";
import InnerPost from "../posts/InnerPost";
import Comments from "../comments/Comments";


function UserProfile() {
  
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let { user, auth_user, currentuser, setCurrentuser } = useContext(AuthContext)
  let {logoutUser} = useContext(AuthContext)
  const [userdata, setUserdata] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [newpost, setNewpost] = useState(false)
  const [follower, setFollowers] = useState([])
  const [following, setFollowing] = useState([])    
  const [viewfollower, setViewfollower] = useState([])
  const [viewfollowing, setViewfollowing] = useState([])
  const [post, setPost] = useState([])
  const [usersfollower, setUsersfollower] = useState(false)
  const [usersfollowing, setUsersfollowing] = useState(false)

  const { usersid } = useParams();
  const [loading, setLoading] = useState(true)
  
  const follvr = function () {
    setUsersfollower(true)
    setUsersfollowing(false)
  }
  const follving = function () {
    setUsersfollowing(true)
    setUsersfollower(false)
  }
  const navigate = useNavigate()
  let userlist = async (usersid) => {
    let response = await fetch(`http://127.0.0.1:8000/api/profile/${usersid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setUserdata(data.data)
      

    } else {
      logoutUser()
      
    }

  }
  let folow = async (usersid) => {
    console.log(usersid,'iside follow functions sssss')

    let response = await fetch(`http://127.0.0.1:8000/follow/follow/${usersid}/`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`


      },

    })
    let data = await response.json()

    if (response.status === 200) {

      setFollowers(data.followers.length)
      setFollowing(data.following.length)
      setViewfollower(data.followers)
      setViewfollowing(data.following)

    } else {
      logoutUser()

    }

  }

  let usersPosts = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/userpost/${usersid}/`, {
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



  // let follow_function = async (id) => {
  //   console.log("following function clicked")


  //   let response = await fetch('http://127.0.0.1:8000/follow/follow/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ "firstuser": user.user_id, "seconduser": id })

  //   })
  //   let data = await response.json()

  //   if (response.status === 200) {
  //     console.log('bibbibibib');

  //   } else {
  //     alert("this is wrong!!")

  //   }
  // }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('md')
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }



  useEffect(() => {
    userlist(usersid)
    folow(usersid)
    usersPosts()
  }, [])

  useEffect(() => {
    setViewfollower(false)
    setRefresh(false)
    setNewpost(false)
    userlist(usersid)
  }, [refresh])
  console.log(post,'kdkdkdkdk')

  return (

    <>
      <Center py={6}>
        <Box
          maxW={'850px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://cdn-icons-png.flaticon.com/512/21/21104.png'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          
          
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {userdata.fullname}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {userdata.user_name}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Actress, musician, songwriter and artist. PM for work inquires or{' '}
            <Link href={'#'} color={'blue.400'}>
              #tag
            </Link>{' '}
            me in your posts
          </Text>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #music
            </Badge>
          </Stack>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge onClick={() => (follvr())} px={4}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
              color={'green'}>

              followers
              <br></br>
              <span><strong>{follower}</strong></span>
            </Badge>
            <Badge onClick={() => (follving())} px={4}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
              color={'green'}>
              following
              <br></br>

              <span><strong>{following}</strong></span>
            </Badge>
            <Badge  px={4}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
              color={'green'}>
              Posts
              <br></br>

              <span><strong>{post.length}</strong></span>
            </Badge>

          </Stack>

          <Stack mt={8} direction={'row'} spacing={4}>
          
          {usersid == user.user_id?
          <Center>
            
            <EditProfile setRefresh={setRefresh} userdata={userdata} />
          </Center>
          
           : 
           (usersid!=setViewfollower.seconduser)?
           <div>
             <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            UnFollow
          </Button>
           </div>:
           
           
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Follow
          </Button>
          
           } 
        </Stack>

          {usersfollower ?
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>followers</Tab>
                {/* <Tab>Two</Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                <Rightbar propsFollower={viewfollower} userlist={userlist} folow={folow} usersfollower={usersfollower}/>
                  
                </TabPanel>
                  {/* <TabPanel>
                <p>two!</p>
              </TabPanel> */}
              </TabPanels>
            </Tabs> :
            null
          }
          {usersfollowing ?
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>following</Tab>
                {/* <Tab>Two</Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                <Rightbar propsFollower={viewfollowing} userlist={userlist} folow={folow} usersfollower={usersfollower} />
                  
                </TabPanel>
                  {/* <TabPanel>
                <p>two!</p>
              </TabPanel> */}
              </TabPanels>
            </Tabs> :
            null
          }
          {
        post.map((foll, i) => (
          <div key={i}>
            <InnerPost foll={foll} Comments={Comments} usersPosts={usersPosts} />
          </div>

        ))
      }
         
        </Box>
      </Center>

    
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