
import "./Topbarnew.css";
import HomeIcon from '@mui/icons-material/Home';
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Menus from "../menu/Menus";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
// import { Menu } from "@mui/material";

const Topbar = () => {
  let {user} = useContext(AuthContext)
  let {logoutUser} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocioGram</span>
        </Link>
        <HomeIcon />
        
        {/* <GridViewOutlinedIcon > */}
          <Menus/>
          {/* </GridViewOutlinedIcon> */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
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