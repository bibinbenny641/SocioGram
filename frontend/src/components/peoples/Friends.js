import React, { useContext, useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card } from '@chakra-ui/react'
import AuthContext from '../../context/AuthContext'
import { toast } from "react-toastify";


import {
    List,
    ListItem,
    ListIcon,

} from '@chakra-ui/react'

import { Badge, Stack } from '@chakra-ui/react'
import { Flex, Spacer, Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



function Friends() {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
    let { user } = useContext(AuthContext)
    console.log(user.user_id, 'hahahah')
    const navigate = useNavigate()

    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    console.log(follower, following)


    const profile = (id) => {

        navigate(`/profile/${id}`)

    }


    let getPeoples = async () => {

        let response = await fetch(`http://127.0.0.1:8000/follow/follow/${user.user_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`

            },

        })
        let data = await response.json()

        if (response.status === 200) {
            setFollower(data.followers)
            setFollowing(data.following)
        } else {

        }

    }
    let unfollow = async (id) => {
        console.log(id, 'followuser function')
        let response = await fetch(`http://127.0.0.1:8000/follow/follow_a_user/${user.user_id}/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
            },

        })
        let data = await response.json()

        if (response.status === 200) {
            console.log(data['hai'])
            toast.success(data['hai'])
            getPeoples()



        } else {
            // logoutUser()
            // alert('failed')

        }
    }
    useEffect(() => {
        getPeoples()

    }, [follower])

    return (
        <><div>
            <Card maxW='700px' paddingTop={50}>
                {
                    follower || following ?
                        <Tabs style={{ width: "50vh", height: '50vh', overflowY: 'scroll' }} isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab>Followers</Tab>
                                <Tab>Following</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Stack direction='column'>

                                        {follower.map((k, index) => (
                                            <>
                                                <Flex key={index}>
                                                    <Box p='4' bg='white.400'>
                                                        <center>

                                                            <strong>

                                                                {k.firstUname}
                                                            </strong>

                                                        </center>
                                                    </Box>
                                                    <Spacer />
                                                    <Box p='4' bg='white.400'>

                                                        <Button onClick={() => { profile(k.firstuser) }} colorScheme='teal' variant='outline'>
                                                            ViewProfile
                                                        </Button>
                                                    </Box>
                                                </Flex>
                                            </>
                                        ))}
                                    </Stack>

                                </TabPanel>
                                <TabPanel>

                                    <Stack direction='column'>
                                        {following.map((k, index) => (
                                            <>
                                                <Flex key={index}>
                                                    <Box p='4' bg='white.400'>
                                                        <center>

                                                            <strong>

                                                                {k.secondUname}
                                                            </strong>

                                                        </center>
                                                    </Box>
                                                    <Spacer />
                                                    <Box p='4' bg='white.400'>
                                                        <Button onClick={() => { unfollow(k.seconduser) }} colorScheme='red' variant='outline'>
                                                            UnFollow
                                                        </Button>
                                                        <Button onClick={() => { profile(k.seconduser) }} colorScheme='teal' variant='outline'>
                                                            ViewProfile
                                                        </Button>

                                                    </Box>
                                                </Flex>
                                            </>
                                        ))}
                                    </Stack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        :
                        null
                }

            </Card>

        </div>
        </>
    )
}

export default Friends

