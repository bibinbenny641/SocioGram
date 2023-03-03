
import "./Topbarnew.css";
import HomeIcon from '@mui/icons-material/Home';
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Topbar = () => {
  let {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocioGram</span>
        </Link>
        <HomeIcon />
        
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to={`/profile/${user.user_id}`}>
        <PersonOutlinedIcon />
        </Link>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img style={{height:'30px'}}
            src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
            alt=""
          />
          <span>kk</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;