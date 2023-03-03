import React, { useState } from "react";
import './HomePage.css'
import Topbar from "../components/topbar/Topbar";
import Post from "../components/posts/Post";
import { Row } from 'react-bootstrap'
import SideBar from "../components/SideBar";
import Share from "../components/share/Share";
import Rightsidebar from "../components/Rightcontainer/rightsidebar/Rightsidebar";
import { BounceLoader, HashLoader } from 'react-spinners'
import { Box } from '@chakra-ui/react'
import { SkeletonCircle, SkeletonText,Stack,Skeleton, } from '@chakra-ui/react'


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

                        </div>
                        <Rightsidebar />
                    </div>
                </Row>
            </div>

        </>
    )
}
export default HomePage