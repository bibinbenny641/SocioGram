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




export default function Post({ post }) {
  let { user } = useContext(AuthContext)
  const [viewposts, setViewposts] = useState([])
  const liked = false;
  console.log(user,'thankan njanada')

  console.log(viewposts)


  let postGet = async () => {

    let response = await fetch(`http://127.0.0.1:8000/follow/getposts/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      setViewposts(data.data)
    } else {
      alert("Something went wrong!!")

    }
  }

  let likebutton = async (id)=>{
    
    console.log(id)
    console.log("haiiiiiiiiii new function")
    let response = await fetch(`http://127.0.0.1:8000/follow/isliked/${user.user_id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id})

    })
    let data = await response.json()

    if (response.status === 200) {
      console.log('kittypooyiiiiiiiiiiiiiiii')
    } else {
      alert("Something went wrong!!")

    }
  }





  useEffect(() => {
    postGet()
  }, [])
  const [commentOpen, setCommentOpen] = useState(false);


  return (
    <>
      <div className="main">
        {

          viewposts.map((foll) => (


            <div className="post">
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    <img style={{ height: "50px", borderRadius: "50px", width: "50px" }} src={`http://127.0.0.1:8000${foll.postImage}`} alt="" />
                    <div className="details">
                      <Link
                        to={`/profile/${foll.user}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{foll.username}</span>
                      </Link>
                      <span className="date">1 min ago</span>
                    </div>
                  </div>
                  <MoreHorizIcon />
                </div>
                <div className="content">
                  <p>{foll.postCaptioin}</p>
                  <img style={{ height: '50vh', width: '70vh' }} src={`http://127.0.0.1:8000${foll.postImage}`} alt="" />
                </div>
                <div className="info">
                  <div className="item">
                    <span onClick={()=>{likebutton(foll.id)}}>

                    {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                  </span>
                    <span>12 Likes</span>
                  </div>
                  <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    <TextsmsOutlinedIcon />
                    12 Comments
                  </div>
                  <div className="item">
                    <ShareOutlinedIcon />
                    Share
                  </div>
                </div>
                {commentOpen && <Comments />}
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
