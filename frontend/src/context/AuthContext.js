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
    let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    
    let [currentuser,setCurrentuser] = useState(user?.user_id)
    // let [currentuser,setCurrentuser] = useState({ authTokens: authTokens ? user.user_id :null } )
    let [auth_user,setAuth_user] = useState(user?.user_id)
    const [ modal,setModal] =useState(false)
    const [messageDetail,setMessageDetail] = useState()
    const [roomid, setRoomid] = useState([]);
    const [added,setAdded] = useState(false)
    const [viewfollowing, setViewfollowing] = useState([])
    const [viewfollower, setViewfollower] = useState([])
    const [isopen,setIsopen] = useState(false)
    const [result,setResult]=useState([''])
  const [caption,setCaption] = useState([])


 


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
        if(response.status === 200){
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
            generateError("Invalid Credentials")
        }
    
    }

    let logoutUser = () => {
        
        localStorage.removeItem('authTokens')
        
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        navigate("/login",{replace:true})
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
        if(response.status === 200){
            console.log("ffffffffffffffffffff")
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
            navigate("/admin/dashboard")

        }else{
            
            generateError("incorrect credentials")
        }
    
    }
    
    let logoutAdmin = () => {
        
        localStorage.removeItem('authTokens')
        
        navigate("admin/",{replace:true})
    }

    let MessageDetails = (chat) =>{
        setMessageDetail(chat)
        console.log(messageDetail,'zzzzzzzzzzzzzzzz')
    }

    

    
    let contextData = {
        user:user,
        loginUser:loginUser,
        authTokens:authTokens,
        logoutUser:logoutUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        currentuser:currentuser,
        setCurrentuser:setCurrentuser,
        MessageDetails:MessageDetails,
        messageDetail:messageDetail,
        setMessageDetail:setMessageDetail,
        roomid:roomid,
        setRoomid:setRoomid,
        added:added,
        setAdded:setAdded,
        viewfollowing:viewfollowing,
        setViewfollowing:setViewfollowing,
        viewfollower:viewfollower,
        setViewfollower:setViewfollower,isopen:isopen,setIsopen:setIsopen,
        result:result,setResult:setResult,caption:caption,setCaption:setCaption,

        
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>

    )
}

