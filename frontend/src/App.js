

// import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  BrowserRouter,
  Routes,
  Route,
 
} from "react-router-dom";


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './utils/PrivateRoute';
import React, {useContext} from 'react'
import AuthContext, { AuthProvider} from './context/AuthContext'
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProfilePage from './pages/ProfilePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MessagePage from './pages/MessagePage';
import Topbar from "./components/topbar/Topbar";


function App() {
  const notify = () => toast("Wow so easy !");
  // let {user} = useContext(AuthContext)

  return (

    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        
        <ToastContainer/>
        <Routes>
        
        <Route element={<LoginPage/>} path="/login" exact/>
        
        <Route element={<RegisterPage/>} path="/register" />
        

        <Route exact path="/" element={<PrivateRoute/>}  > 
        <Route exact path="/" element={<HomePage />} /> 
        </Route>
       
       <Route element={<AdminLogin/>} path="/admin" />

       <Route exact path="/" element={<PrivateRoute/>}  > 
       <Route element={<Dashboard/>} path="/dashboard" />
       </Route>
    
        <Route element={<HomePage/>} path="/" /> 
        <Route element={<ProfilePage/>} path="/myprofile" />
        <Route element={<MessagePage/>} path="/message" />
        
        </Routes>
        </AuthProvider>
          
      </BrowserRouter>
      
    </div>
  );
}

export default App;
