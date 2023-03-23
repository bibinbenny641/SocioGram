import React from 'react'
import { Row } from 'react-bootstrap'
import Friends from '../components/peoples/Friends'
import Rightsidebar from '../components/Rightcontainer/rightsidebar/Rightsidebar'
import SideBar from '../components/SideBar'
import Topbar from '../components/topbar/Topbar'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Suggestions from '../components/suggestion/Suggestions'
import PagenotFound from '../components/pageNotFound/PagenotFound'

function PeoplePage() {
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
                            <div >

                            <Friends />
                            </div>
                            <Heading>suggestion</Heading>
                            <div style={{ width:'45vh', display: 'flex', flexDirection: 'row',overflowX:'scroll' }}>
                                <Suggestions/>
                            </div>

                        </div>
                    </div>

                </Row>
                
            </div>


        </>
    )
}

export default PeoplePage