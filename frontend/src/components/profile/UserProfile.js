
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
import { toast } from "react-toastify";


function UserProfile() {

  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let { user, auth_user } = useContext(AuthContext)
  let { logoutUser } = useContext(AuthContext)
  const [userdata, setUserdata] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [newpost, setNewpost] = useState(false)
  const [follower, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [post, setPost] = useState([])
  const [usersfollower, setUsersfollower] = useState(false)
  const [usersfollowing, setUsersfollowing] = useState(false)
  const [isfollowing,setIsfollowing] = useState([])
  const [isedit,setIsedit] = useState(false)
  let { viewfollower, viewfollowing, setViewfollower, setViewfollowing,caption,setCaption } = useContext(AuthContext)

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
  const handleClose = function () {
    setUsersfollower(false)
    setUsersfollowing(false)
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



  let is_follow = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/check_user/${user.user_id}/${usersid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      

    })
    let data = await response.json()

    if (response.status === 200) {
      setIsfollowing(data)

    } else {
      alert("this is wrong!!")

    }
  }
  let followuser = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/follow_a_user/${user.user_id}/${usersid}/`, {
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

  let deletePost = async (id) => {
    console.log(id,'kk')
    let response = await fetch(`http://127.0.0.1:8000/follow/deletePostAdmin/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      toast.success('deleted')
    } else {
      // logoutUser()
      alert('failed')

    }
  }
  let edit = function (){
    setIsedit(!isedit)
  }
  

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
    is_follow()
  }, [])

  useEffect(() => {
    setViewfollower(false)
    setRefresh(false)
    setNewpost(false)
    userlist(usersid)
    usersPosts()
    is_follow()
    
  }, [refresh,isfollowing])

  return (

    <>
      <div style={{ overflowY: 'scroll' }}>
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
              <Badge px={4}
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

              {usersid == user.user_id &&
                <Center>

                  <EditProfile setRefresh={setRefresh} userdata={userdata} />
                </Center>
              }
              {usersid == user.user_id &&
                <Center>

                  change password
                </Center>
              }
              { isfollowing && usersid != user.user_id ?

              <center>

                <Button
                  onClick={followuser}
                  size='md'
                  height='48px'
                  width='200px'
                  border='2px'
                  borderColor='green.500'
                >
                  {isfollowing.status}
                </Button>
              </center>:
              null
              
              }
              

            </Stack>

            {usersfollower ?
              <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                  <Tab onClick={() => (handleClose())}> followers</Tab>
                  {/* <Tab>Two</Tab> */}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Rightbar propsFollower={viewfollower} userlist={userlist} folow={folow} usersfollower={usersfollower} />

                  </TabPanel>
                  {/* <TabPanel>
                <p>two!</p>
              </TabPanel> */}
                </TabPanels>
              </Tabs> :
              null
            }
            {usersfollowing ?
              <Tabs onClick={() => (handleClose())} isFitted variant='enclosed'>
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
                  <InnerPost foll={foll} Comments={Comments} usersPosts={usersPosts} deletePost={deletePost} 
                   edit={edit}/>
                </div>

              ))
            }

          </Box>
        </Center>

      </div>



    </>
  )
}

export default UserProfile