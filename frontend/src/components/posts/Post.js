import "./Posts.css";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RedoIcon from '@mui/icons-material/Redo';
import { useState, useEffect, useContext } from "react";
import { padding } from "@mui/system";
import AuthContext from "../../context/AuthContext";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import InnerPost from "./InnerPost";
import { useNavigate} from 'react-router-dom'

export default function Post({ setLoading }) {
  let { user } = useContext(AuthContext)
  const [viewposts, setViewposts] = useState([])
  let {logoutUser} = useContext(AuthContext)
  let navigate = useNavigate()


  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  
 
  let postGet = async () => {

    let response = await fetch(`http://127.0.0.1:8000/follow/getposts/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },

    })
    let data = await response.json()

    if (response.status === 200) {

      setLoading(false)
      setViewposts(data.data)
    } else {
      
      logoutUser()

    }
  }

  useEffect(() => {
    postGet()
  }, [],)

  return (
    <>
    
    

      {
        viewposts.map((foll, i) => (
          <div key={i}>
            <InnerPost foll={foll} Comments={Comments} postGet={postGet} />
          </div>

        ))
      }

    </>
  );
}
