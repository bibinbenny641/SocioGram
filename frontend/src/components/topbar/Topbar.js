
import "./Topbarnew.css";
import HomeIcon from '@mui/icons-material/Home';
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Menus from "../menu/Menus";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Results from "../results/Results";
// import { Menu } from "@mui/material";

const Topbar = () => {
  let {user} = useContext(AuthContext)
  let {logoutUser} = useContext(AuthContext)
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  let {result,setResult} = useContext(AuthContext)
  const [input,setInput] = useState('')
  // const [result,setResult]=useState([])
  const handleSubmit=((e)=>{
    console.log('hi')
    setInput(e.target.value)
    console.log(input,'hhaahhaa')
    search()
  })

  let search = async () => {

    
    let response = await fetch(`http://127.0.0.1:8000/follow/searching`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },
      body:JSON.stringify({'input':input})

    })
    let data = await response.json()

    if (response.status === 201) {
      console.log(data,'11111111111')
        setResult(data)
        // console.log(result,'222222')
      
    } else {
      
      // logoutUser()

    }
  }
  // useEffect(() => {
  //  search()
  
    
  // }, [])
  
  



  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocioGram</span>
        </Link>
        <Link to={'/'}>
        <HomeIcon />
        </Link>
        
        {/* <GridViewOutlinedIcon > */}
          {/* <Menus/> */}
          {/* </GridViewOutlinedIcon> */}
        <div className="search">
          <SearchOutlinedIcon />
          <input value={input} onChange={handleSubmit} type="text"  placeholder="Search..." />
          { input && <Results/>}
        </div>
        
         
      </div>
      {/* <div className="logouticon">
          <WarningIcon />
          
        </div> */}
      <div className="right">
        <Link to={`/profile/${user.user_id}`}>
        <PersonOutlinedIcon />
        </Link>
        <Link to={'/message'}>
        <EmailOutlinedIcon />
        </Link>
        <Link to={'/people'}>
        <Diversity3Icon />
        </Link>
        <Link>
        <NotificationsOutlinedIcon />

        </Link>
        <button onClick={logoutUser}>
        <LogoutIcon />
        <span>{user.fullname}</span>
        </button>
        
      </div>
      
    </div>
  );
};

export default Topbar;