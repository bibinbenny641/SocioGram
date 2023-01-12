import { Route,Redirect } from 'react-router-dom'
import {AuthProvider} from '../context/AuthContext'
import {Outlet, Navigate} from 'react-router-dom'
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';



// const PrivateRoute = ({children, ...rest}) => {
//     console.log(children)
//     return(
//         <Route {...rest}>{children}</Route>
//     )
// }
const PrivateRoute = () => {
    let {user}=useContext(AuthContext)    

    return(
   
     user ? <Outlet/>: <Navigate to="/login" />
    )
}

export default PrivateRoute