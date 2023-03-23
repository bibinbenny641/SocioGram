// import React, { useContext, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from '../context/AuthContext'
// import { ToastContainer, toast } from 'react-toastify'

// import './login.css'

// function LoginPage() {
//     let { user } = useContext(AuthContext)

//     let auth = localStorage.getItem("authTokens")
//     console.log(auth);


//     useEffect(() => {

//         if(auth){
//             console.log("user ind     bbbbbbbbbbbbbbbbbbb");
//             window.location.replace("/")        }

        
//     }, [auth])

//     let { loginUser } = useContext(AuthContext)
//     return (

//         <div className='login_main'>
//             <div className='login_container'>
//                 <h2 className='iconname'>SocioGram </h2>
//                 <form onSubmit={loginUser}>
//                     <div className='login_input'>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" name='email' placeholder='Email'
//                         />
//                     </div>
//                     <div className='login_input'>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" name='password' placeholder='Password'
//                         />
//                     </div>
//                     <button type='submit'>Login</button>
//                     <span>
//                         Don't you have an account? <Link to='/register'>Register</Link>
//                     </span>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     )
// }

// export default LoginPage

import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

import { useState } from "react";
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  let { user } = useContext(AuthContext)

    let auth = localStorage.getItem("authTokens")
    let { loginUser } = useContext(AuthContext)
    console.log(auth);


    useEffect(() => {

        if(auth){
            console.log("user ind     bbbbbbbbbbbbbbbbbbb");
            window.location.replace("/")        }

        
    }, [auth])

    

  return (
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
          <form onSubmit={loginUser}>
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
                  <Input type="email" name='email' placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" name='password'
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link to={'/register'} color="teal.500" >
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginPage;