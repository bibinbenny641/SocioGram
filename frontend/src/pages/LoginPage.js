import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

import './login.css'

function LoginPage() {
    let { user } = useContext(AuthContext)

    let auth = localStorage.getItem("authTokens")
    console.log(auth);


    useEffect(() => {

        if(auth){
            console.log("user ind     bbbbbbbbbbbbbbbbbbb");
            window.location.replace("/")        }

        
    }, [auth])

    let { loginUser } = useContext(AuthContext)
    return (

        <div className='login_main'>
            <div className='login_container'>
                <h2 className='iconname'>SocioGram </h2>
                <form onSubmit={loginUser}>
                    <div className='login_input'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='Email'
                        />
                    </div>
                    <div className='login_input'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' placeholder='Password'
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <span>
                        Don't you have an account? <Link to='/register'>Register</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default LoginPage