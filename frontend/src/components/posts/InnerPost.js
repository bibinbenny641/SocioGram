import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Divider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Button, Heading, Text, Image, IconButton } from '@chakra-ui/react'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';


export default function InnerPost({ foll, Comments, postGet, viewposts,currentuser}) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()
    let { user } = useContext(AuthContext)

    const openComment = (id) => {
        setCommentOpen(!commentOpen)
    }
    const userProfile = (id) => {

        navigate(`/profile/${id}`)

    }
    let likebutton = async (id) => {

        let response = await fetch(`http://127.0.0.1:8000/follow/isliked/${user.user_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })

        })
        let data = await response.json()
        if (response.status === 200) {
            if (liked) {

                setLiked(false)
            } else {
                setLiked(true)
            }
            postGet()
            console.log('like cheythuuuuuu..........')
        } else {
            alert("Something went wrong!!")

        }
    }
    return (

        <>
            
            <Card maxW='700px' paddingTop={50}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                            <Box >
                                <Heading size='sm' onClick={() => { userProfile(foll.user) }}>{foll.username}</Heading>
                                <Text>{(moment(foll.time).fromNow())}</Text>
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
                {
                    foll.postImage === "/media/null" ?
                        <CardBody>
                            <strong>

                                <Text fontSize='20px'>
                                    {foll.postCaptioin}
                                </Text>
                            </strong>
                        </CardBody>
                        :


                        <>
                            <CardBody>
                                <strong>

                                    <Text fontSize='20px'>
                                        {foll.postCaptioin}
                                    </Text>
                                </strong>
                            </CardBody>
                            <Image
                                objectFit='cover'
                                src={`http://127.0.0.1:8000${foll.postImage}`}
                                alt='..'
                            />
                        </>

                }


                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Button onClick={() => { likebutton(foll.id) }} flex='1' variant='ghost' >
                        <span><FavoriteOutlinedIcon style={{ color: 'blue' }} /></span>
                        <span>{foll.liked_post.length}</span>

                    </Button>
                    <Button onClick={() => openComment(foll.id)} flex='1' variant='ghost' >
                        Comments
                    </Button>
                    <Button flex='1' variant='ghost'>
                        {/* {
                            user.user_id === foll.user ?

                            <EditIcon/>
                            :
                            null
                        } */}
                        {currentuser}
                    </Button>
                    <Button flex='1' variant='ghost'>
                        {/* {
                            user.user_id === foll.user ?

                            <EditIcon/>
                            :
                            null
                        } */}
                        {currentuser}
                    </Button>
                    <div>
                        {commentOpen && <Comments foll={foll} />}


                    </div>
                </CardFooter>
            </Card>
            <Divider variant="thick" colorScheme="brand" />




        </>
    )
}
