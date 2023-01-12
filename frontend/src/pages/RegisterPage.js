
import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap'
import AuthContext from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

import './register.css'
function RegisterPage() {
    let {signupUser,user} = useContext(AuthContext)

    const navigate = useNavigate
    console.log("nbbbbnn")
    localStorage.getItem('authTokens') ? navigate("/"):navigate("/login/")
    
  return (
    <>
    <div className='login_main'>
    <div className='login_container'>
        <h2 className='iconname'>SocioGram Signup</h2>
        <form onSubmit={signupUser}>
            <div className='login_input'>
                <label htmlFor="email">Full Name</label>
                <input type="text" name='fullname' placeholder='Full Name'
                />
            </div>
            <div className='login_input'>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' placeholder=' email'
                />
            </div>
            <div className='login_input'>
                <label htmlFor="email">Phone No</label>
                <input type="number" name='phoneno' placeholder='Phone No'
                />
            </div>
            {/* <div className='login_input'>
            <p>Please select your Gender</p>
            <input type="radio" id="html" name="fav_language" value="HTML"/>
            <label for="html">HTML</label>
            <input type="radio" id="css" name="fav_language" value="CSS"/>
                <label for="css">CSS</label>
            </div> */}
            

            <div className='login_input'>
                <label htmlFor="password">Password</label>
                <input type="password" name='password1' placeholder='Password'
                />
            </div>
            <div className='login_input'>
                <label htmlFor="password">Re-type Password</label>
                <input type="password" name='password2' placeholder='Password'
                />
            </div>
            <button type='submit'>Signup</button>
            <span>
                Already have an have an account? <Link to='/'>Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
    </div>
    </>




  )
}

export default RegisterPage




























// import React from 'react'
// import { Link } from 'react-router-dom'
// import './register.css'

// function RegisterPage() {
//   return (
//     <div>
//         <div className='register'>
//           <div className="container">
//             <h1 className='heading'>Signup</h1>
//             <form>
//                 <input type="text" placeholder="enter your email"></input><br></br>
//                 <input type="password" placeholder="enter your password"></input><br></br>
//                 <input type="password" placeholder="Re-enter your password"></input><br></br>

//                 <center><button type='submit'>Register</button></center><br />
//                 <center><Link to='/'>Login</Link></center>
//             </form>
//             </div>
//         </div>


//     </div>
//   )
// }

// export default RegisterPage