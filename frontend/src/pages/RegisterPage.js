
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Validation from './Validation';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
  } from "@chakra-ui/react";
  import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


function RegisterPage() {
    const navigate = useNavigate()
    const generateError = (err) =>
        toast.error(err, {
            position: 'bottom-right',
        })
    const generatesucces = (err) =>
        toast.success(err, {
            position: 'bottom-right',
        })


    const [values, setValues] = useState({
        fullname: "",
        email: "",
        phoneno: "",
        password1: "",
        password2: "",
    })
    const [errors, setErrors] = useState({})
    const handelChange = (e) => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(Validation(values));
        console.log(values, "final datas are here")
        if (Object.keys(errors).length === 0) {
            console.log("inside if");
            signupUser()
        }
    };



    let signupUser = async () => {
        try {

            console.log("ayyoooo")
            let response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(values)

            })
            let data = await response.json()
            console.log(data)
            if (response.status === 400) {
                console.log("errir");

                console.log("400");
                generateError(data)
                // navigate('/register')
            } else
                if (response.status === 200) {
                    console.log("200");
                    navigate('/login')
                    generatesucces("Registration Success")
                    generateError(data)
                } else {
                    console.log("errir else");
                    generateError(data)
                    // navigate('register')
                }
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <>
            {/* <div className='login_main'>
                <div className='login_container'>
                    <h2 className='iconname'>SocioGram Signup</h2>
                    <form >
                        <div className='login_input'>
                            <label htmlFor="email">Full Name</label>
                            <input type="text" name='fullname' placeholder='Full Name'
                                value={values.fullname}
                                onChange={handelChange}
                            />
                            {errors.fullname && <p className='error'>{errors.fullname}</p>}
                        </div>
                        <div className='login_input'>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder=' email'
                                value={values.email}
                                onChange={handelChange}

                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                        </div>
                        <div className='login_input'>
                            <label htmlFor="email">Phone No</label>
                            <input type="number" name='phoneno' placeholder='Phone No'
                                value={values.phoneno}
                                onChange={handelChange}
                            />
                            {errors.phoneno && <p className='error'>{errors.phoneno}</p>}

                        </div>

                        <div className='login_input'>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password1' placeholder='Password'
                                value={values.password1}
                                onChange={handelChange}
                            />
                            {errors.password1 && <p className='error'>{errors.password1}</p>}

                        </div>
                        <div className='login_input'>
                            <label htmlFor="password">Re-type Password</label>
                            <input type="password" name='password2' placeholder='Password'
                                value={values.password2}
                                onChange={handelChange}
                            />
                            {errors.password2 && <p className='error'>{errors.password2}</p>}

                        </div>
                        <button onClick={handleSubmit} >Signup</button>
                        <span>
                            Already have an have an account? <Link to='/login'>Login</Link>
                        </span>
                    </form>
                    <ToastContainer />
                </div>
            </div> */}
            <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">SocioGram</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form >
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" name='fullname' placeholder='Full Name'
                                value={values.fullname}
                                onChange={handelChange}
                            />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" name='email' placeholder=' email'
                                value={values.email}
                                onChange={handelChange}

                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="number" name='phoneno' placeholder='Phone No'
                                value={values.phoneno}
                                onChange={handelChange}
                            />
                            {errors.phoneno && <p className='error'>{errors.phoneno}</p>}

                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input type="password" name='password1' placeholder='Password'
                                value={values.password1}
                                onChange={handelChange}
                            />
                            {errors.password1 && <p className='error'>{errors.password1}</p>}

                  <InputRightElement width="4.5rem">
                  </InputRightElement>
                </InputGroup>
                
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input type="password" name='password2' placeholder='Password'
                                value={values.password2}
                                onChange={handelChange}
                            />
                            {errors.password2 && <p className='error'>{errors.password2}</p>}

                  <InputRightElement width="4.5rem">
                  </InputRightElement>
                </InputGroup>
                
              </FormControl>
              <Button
              onClick={handleSubmit}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link to={'/login'} color="teal.500" >
          Login
        </Link>
      </Box>
    </Flex>
        </>

    )
}

export default RegisterPage
