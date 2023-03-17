import React, { useState } from "react";
import './HomePage.css'
import Topbar from "../components/topbar/Topbar";
import Post from "../components/posts/Post";
import { Row } from 'react-bootstrap'
import SideBar from "../components/SideBar";
import Share from "../components/share/Share";
import Rightsidebar from "../components/Rightcontainer/rightsidebar/Rightsidebar";
import { BounceLoader, HashLoader } from 'react-spinners'
// import { Box } from '@chakra-ui/react'
import { SkeletonCircle, SkeletonText, Stack, Skeleton, } from '@chakra-ui/react'
import UserProfile from "../components/profile/UserProfile";
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Button, Heading, Text, Image, IconButton } from '@chakra-ui/react'
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Divider } from '@chakra-ui/react'


const HomePage = () => {
    const [loading, setLoading] = useState(true)

    return (
        <>
            <div className="theme-light">

                <Row>
                    <div style={{ position: 'sticky' }}>

                        <Topbar />
                    </div>

                </Row>
                <Row>
                    <div style={{ display: 'flex' }}>
                        <SideBar />
                        <div className="mainhomepage">
                            {
                                loading ?
                                    <>

                                        <div style={{ color: 'red', height: '60vh' }}>

                                            <div style={{ width: '90vh' }} className="share">


                                                {/* <Skeleton startColor='pink.500' endColor='orange.500' height='20px' /> */}

                                                {/* <center>

                                                    <HashLoader color="#36d7b7" />
                                                </center> */}
                                                <Box padding='6' boxShadow='lg' bg='white'>

                                                    <SkeletonCircle size='10' />
                                                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                                </Box>
                                                <Box padding='6' boxShadow='lg' bg='white'>

                                                    <SkeletonCircle size='10' />
                                                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                                </Box>
                                                <Box padding='6' boxShadow='lg' bg='white'>

                                                    <SkeletonCircle size='10' />
                                                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                                </Box>
                                                <Box padding='6' boxShadow='lg' bg='white'>

                                                    <SkeletonCircle size='10' />
                                                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                                                </Box>


                                            </div>

                                        </div>

                                    </>
                                    :
                                    <Share />
                            }

                            <Post setLoading=
                                {setLoading
                                } />


                            <Card maxW='700px' paddingTop={50}>
                                <CardHeader>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                            <Box >
                                                <Heading size='sm' >df</Heading>
                                                <Text></Text>
                                            </Box>
                                        </Flex>
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon=''
                                        />
                                    </Flex>
                                </CardHeader>



                                <>
                                    <CardBody>
                                        <Text>

                                        </Text>
                                    </CardBody>
                                    <Image
                                        objectFit='cover'
                                        src=""
                                        alt='..'
                                    />
                                </>



                                <CardFooter
                                    justify='space-between'
                                    flexWrap='wrap'
                                    sx={{
                                        '& > button': {
                                            minW: '136px',
                                        },
                                    }}
                                >
                                    <Button flex='1' variant='ghost' >
                                        <span><FavoriteOutlinedIcon style={{ color: 'red' }} /></span>
                                        <span></span>

                                    </Button>
                                    <Button flex='1' variant='ghost' >
                                        Comments
                                    </Button>
                                    <Button flex='1' variant='ghost'>
                                        Share
                                    </Button>

                                </CardFooter>
                            </Card>
                            <Divider variant="thick" colorScheme="brand" />


                            <Card maxW='700px'>
                                <CardHeader >
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                            <Box>
                                                <Heading size='sm'>Segun Adebayo</Heading>
                                                <Text>Creator, Chakra UI</Text>
                                            </Box>
                                        </Flex>
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'

                                        />
                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <Text>
                                        With Chakra UI, I wanted to sync the speed of development with the speed
                                        of design. I wanted the developer to be just as excited as the designer to
                                        create a screen.
                                    </Text>
                                </CardBody>
                                <Image
                                    objectFit='cover'
                                    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                    alt='Chakra UI'
                                />

                                <CardFooter
                                    justify='space-between'
                                    flexWrap='wrap'
                                    sx={{
                                        '& > button': {
                                            minW: '136px',
                                        },
                                    }}
                                >
                                    <Button flex='1' variant='ghost' >
                                        Like
                                    </Button>
                                    <Button flex='1' variant='ghost' >
                                        Comment
                                    </Button>
                                    <Button flex='1' variant='ghost' >
                                        Share
                                    </Button>
                                </CardFooter>
                            </Card>

                        </div>
                        <Rightsidebar />
                    </div>
                </Row>
            </div>

        </>
    )
}
export default HomePage