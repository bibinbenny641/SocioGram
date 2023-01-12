import { useState, useEffect, createContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    const generateError = (err) => 
        toast.error(err,{
            position: 'bottom-right',
        })

    

    let [user,setUser] = useState( localStorage.getItem('authTokens') ?(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)):null)
    console.log(user)
    let [currentuser,setCurrentuser] = useState(user.user_id)
    let [auth_user,setAuth_user] = useState(user.user_id)
    let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)

    let navigate = useNavigate()

    
    let loginUser = async(e)=>{
        e.preventDefault()
        console.log("form submitted")
        
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log("aaaaaaaaaaaaaaaaaaaaadddddddddddd")
        console.log('response',response)
        if(response.status === 200){
            console.log("ffffffffffffffffffff")
            console.log(user)
            
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            let c=jwt_decode(data.access)
            
            console.log(data)
            if(c.is_active===true){
                console.log(c.is_active)
                localStorage.setItem('authTokens',JSON.stringify(data))
                navigate("/",{replace:true})

            }else{
                generateError("You are blocked")
                navigate("/login",{replace:true})
            }

        }else{
            generateError("please fill the details properly")
        }
    
    }

    let logoutUser = () => {
        
        localStorage.removeItem('authTokens')
        
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        navigate("login/",{replace:true})
    }

    let signupUser = async(e)=>{
        e.preventDefault()
        console.log("ayyoooo")
        let response = await fetch('http://127.0.0.1:8000/api/register/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({'fullname':e.target.fullname.value,'password1':e.target.password1.value,'password2':e.target.password2.value,'phoneno':e.target.phoneno.value,'email':e.target.email.value})
            
        })
        let data = await response.json()
        console.log(data)
        console.log("errir");
        if (response.status===400){
            
            generateError(data)
            navigate('/register')
        }
        if (response.status===200){
            navigate('/login')
            generateError(data)
        }else{
            generateError(data)
        }
    
    }
    //....................adminlogin......................

    let loginAdmin = async(e)=>{
        console.log("hhhh")
        e.preventDefault()
        console.log("admin form submitted")
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data',data)
        console.log("hfjhgdjhgdjhgdfjghdfjhgdfjg")
        console.log('response',response)
        if(response.status === 200){
            console.log("ffffffffffffffffffff")
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
            navigate("/dashboard")

        }else{
            
            generateError("incorrect credentials")
        }
    
    }
    
    let logoutAdmin = () => {
        
        localStorage.removeItem('authTokens')
        
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        navigate("admin/",{replace:true})
    }

    // let editPro = async(e)=>{
    //     e.preventDefault()
        
    //     let response = await fetch(`http://127.0.0.1:8000/api/editpro/${user.user_id}`,{
    //         method:'PUT',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },

    //         body:JSON.stringify({'fullname':e.target.fullname.value,'user_name':e.target.username.value,'email':e.target.email.value})
            
    //     })
    //     let data = await response.json()
        
    //     console.log("success ")

    //     if (response.status===400){
    //         alert("othilla mwonuse")
    //         navigate('/')
    //     } else{
    //         alert("all set")
    //         navigate('/myprofile')
    //     }
    
    // }

    
    let contextData = {
        user:user,
        loginUser:loginUser,
        authTokens:authTokens,
        logoutUser:logoutUser,
        signupUser:signupUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        currentuser:currentuser,
        setCurrentuser:setCurrentuser,
        

    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>

    )
}

