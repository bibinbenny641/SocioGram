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
                                        Sociogram enables you to find new peoples and interact with them.
                                    </Text>
                                </CardBody>
                                <Image
                                    objectFit='cover'
                                    src='https://scontent.fcok10-4.fna.fbcdn.net/v/t39.30808-1/277781981_370306511774754_7754984541117216266_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=103&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=eu7QOemgbH0AX_sJIbD&_nc_ht=scontent.fcok10-4.fna&oh=00_AfDB7FsCWlwmS1U8TN8-5WAC5vH04fmaXVTkIy-XRSyurQ&oe=641A3586'
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