import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Divider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Button, Heading, Text, Image, IconButton } from '@chakra-ui/react'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getNativeSelectUtilityClasses } from '@mui/material';
import EditComment from '../comments/edit/EditComment';
import { toast } from "react-toastify";
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';

export default function InnerPost({ foll, Comments, postGet,deletePost,caption,setCaption,edit}) {

    const [commentOpen, setCommentOpen] = useState(false);
    const [editpostinput,setEditpostinput] = useState(false)
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()
    let { user,authTokens } = useContext(AuthContext)
    

    const openComment = (id) => {
        setCommentOpen(!commentOpen)
    }
    const openEdit = (id)=>{
        console.log(id,'9999999999999999999999999999999999999999999999934234')
        setEditpostinput(!editpostinput)
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
                                <div>
                                {editpostinput && <EditComment foll={foll} />}
                                </div>
                        </CardBody>
                        :


                        <>
                            <CardBody>
                                <strong>

                                    <Text fontSize='20px'>
                                        {foll.postCaptioin}
                                    </Text>
                                </strong>
                                <div>
                                {editpostinput && <EditComment foll={foll} />}
                                </div>
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
                    <MapsUgcRoundedIcon/>
                    </Button>
                    {
                        deletePost  ? user.user_id == foll.user?
                    <Button onClick={()=>{deletePost(foll.id)}} flex='1' variant='ghost'>
                        <DeleteRoundedIcon/>
                    </Button>:
                    null:
                    null
                    }
                    {
                        edit ? user.user_id == foll.user ?

                    <Button onClick={()=>{openEdit(foll.id)}} flex='1' variant='ghost'>
                    <EditIcon/>
                    </Button>:
                    null
                    :null
                    }
                    <div>
                        {commentOpen && <Comments foll={foll} />}


                    </div>
                </CardFooter>
            </Card>
            <Divider variant="thick" colorScheme="brand" />




        </>
    )
}
