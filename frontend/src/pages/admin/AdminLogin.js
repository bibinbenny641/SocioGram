import React,{useContext} from 'react'
import { Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import {ToastContainer, toast} from 'react-toastify'
import '../register.css'

function AdminLogin() {

    console.log('bibin')
    let {loginAdmin} = useContext(AuthContext)
  return (

    <div className='login_main'>
    <div className='login_container'>
        <h2 className='iconname'>ADMIN </h2>
        <form onSubmit={loginAdmin}>
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
        <ToastContainer/>
    </div>
    </div>
  )
}

export default AdminLogin