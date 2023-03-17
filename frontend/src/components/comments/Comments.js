
import {  useEffect, useState ,useContext} from "react";
import "./comments.css";
import AuthContext from "../../context/AuthContext";
import {toast } from "react-toastify";
import { useNavigate} from 'react-router-dom'


const Comments = ({foll}) => {
  let {user} = useContext(AuthContext)

  let navigate = useNavigate()
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  const [postcomment,setPostcomment] = useState([])

  const [values,setValues] = useState('')
  console.log(values,'state values are herer ererererere')
  let hangleChange = (e)=>{
    setValues(
      
      {
        ...values,
        [e.target.name]:e.target.value})


  }
  console.log(values,'state values')


  let addcomment = async () => {
    let response = await fetch(`http://127.0.0.1:8000/follow/addcomments/${user.user_id}/${foll.id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
      },
      body:JSON.stringify({values})

    })
    let data = await response.json()

    if (response.status === 200) {
      
      // alert('success')
      toast.success('comment added')
      

    } else {
      // logoutUser()
      alert('failed')

    }
  }


  let comm = async ()=>{
    console.log('comm function');


    let response = await fetch(`http://127.0.0.1:8000/follow/getcomments/${foll.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      // console.log(data,'get comments')
      setPostcomment(data)

    } else {
      alert("Something went wrong!!")

    }
  }
  useEffect(() => {
    comm()
  }, [postcomment],)

  return (
    <div className="comments container">
      <div  className="write">
        {/* <img src="" alt="" /> */}
        <input onChange={hangleChange} value={values.comment} name="comment" type="text" placeholder="write a comment" />
        <button onClick={addcomment}>Send</button>
      </div>
      {console.log(foll.commenteduser,'jjj')}
      {postcomment?
      <div className="scroll_bar"
      //  style={{height:"250px",overflowY:'scroll'}}
       >

      {postcomment.map((com,i) => (
        <div  key={i} className="comment">
          <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="" />
          <div className="info " >
            <span>{com.user_na}</span>
            <div className="flex justify-center items-center rounded-md w-fit my-1 bg-gradient-to-r from-blue-500 to-cyan-500 ">

            <p style={{padding:"10px"}} >{com.comment}</p>
            </div>
          </div>
          {/* <span className="date">1 hour ago</span> */}
        </div>
      ))}
      </div>:
      null

      }
      

      {/* {comments.map((comment,i) => (
        <div key={i} className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))} */}
    </div>
  );
};

export default Comments;