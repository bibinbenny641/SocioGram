import "./Posts.css";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RedoIcon from '@mui/icons-material/Redo';
import { useState, useEffect,useContext } from "react";
import { padding } from "@mui/system";
import AuthContext from "../../context/AuthContext";




export default function Post({ post }) {
  let { user } = useContext(AuthContext)
  const [viewposts, setViewposts] = useState([])
  // const timeAgo = moment(datetime).fromNow();
  console.log(viewposts)


  let postGet = async () => {

    let response = await fetch(`http://127.0.0.1:8000/follow/getposts/${user.user_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()
    console.log(data,'bibibibbibibibbbib  b b bb b b b b');

    if (response.status === 200) {

      

      setViewposts(data.data)
    } else {
      alert("Something went wrong!!")

    }

  }
  useEffect(() => {
    postGet()
  }, [])


// function TimeAgo({ datetime }) {
//   console.log('datetime function')
//   return <TimeAgo date={datetime}/>
// }

  return (
    <>
      {

        viewposts.map((foll) => (

          <div className="main panel panel-default z-depth-4">
            <div className="panel-body">

              <div className="media">
                <div className=" media-left">
                  <img src={`http://127.0.0.1:8000${foll.postImage}`} className=" userimage" />
                  <span><p>{foll.username} <br></br>{foll.date}{moment(foll.date).fromNow()}</p></span>

                  <div className="media-body">

                    <span><i className="fa fa-ellipsis-h right"></i></span>
                  </div>
                </div>

              </div>

              {/* <div className = ""> */}
              <div className="">
                <img className=" img-fluid " src={`http://127.0.0.1:8000${foll.postImage}`} />

              </div>
              <p className="iconsec"><i className="fa fa-heart-o"><FavoriteIcon /></i> <i className="fa fa-share"><RedoIcon /></i>
              </p>{foll.date}<p><span className="right"><b>4 likes</b></span></p>
              <p className="caption">{foll.postCaptioin}<i className="fa fa-frown-o"></i>
                {/*  <a href = "https://bbbootstrap.com">BBBootstrap.com</a> */}
              </p>
              <p className="read">Read 2 Comments <span className="right"><b>Add Comment</b> <i className="fa fa-comment-o"></i></span></p>
            </div>

            


          </div>
          // </div>

        ))
      }







    </>
  );
}