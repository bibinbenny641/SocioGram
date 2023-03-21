
import {  useEffect, useState ,useContext} from "react";
import "./comments.css";
import AuthContext from "../../context/AuthContext";
import {toast } from "react-toastify";
import { useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditComment from "./edit/EditComment";


const Comments = ({foll}) => {
  let {user} = useContext(AuthContext)
  

  let navigate = useNavigate()
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? localStorage.getItem('authTokens') : null)
  const [postcomment,setPostcomment] = useState([])
  const [editinputopen,setEditinputopen] = useState(false)
  console.log(postcomment,'hhahah')
  const [datas,setDatas] = useState('')
  console.log(datas,'3333333333333')
  

  const [values,setValues] = useState('')
  let hangleChange = (e)=>{
    setValues(
      
      {
        ...values,
        [e.target.name]:e.target.value})


  }


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
    console.log(foll.id,'jaj')

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
  const openeditComment = ((id)=>{
    console.log(id,'ha')
    setEditinputopen(!editinputopen)

  })

  let editComment = async (id)=>{
    console.log(id)


    let response = await fetch(`http://127.0.0.1:8000/follow/editcomment/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({datas})

    })
    let data = await response.json()

    if (response.status === 200) {
      // console.log(data,'get comments')
      console.log(data)
      comm()
      

    } else {
      alert("Something went wrong!!")

    }
  }

  
  let deleteComment = async (id)=>{

    let response = await fetch(`http://127.0.0.1:8000/follow/deletecomment/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    let data = await response.json()

    if (response.status === 200) {
      // console.log(data,'get comments')
      toast.success('comment deleted')
      

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
      
      {postcomment?
      <div className="scroll_bar"
      //  style={{height:"250px",overflowY:'scroll'}}
       >
        {console.log(postcomment.id,'zz')}

      {postcomment.map((com,i) => (
        
        <div  key={i} className="comment">
          <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="" />
          <div className="info " >
            <span>{com.user_na}</span>
            <div className="flex justify-center items-center rounded-md w-fit my-1 bg-gradient-to-r from-blue-500 to-cyan-500 ">

            <p style={{padding:"10px"}} >{com.comment}</p>
            </div>
            <div>
            {
              user.user_id == com.user &&
            <span onClick={() => { openeditComment(com.id) }}><EditIcon/></span>    
            }
            {
              user.user_id == com.user | user.user_id == foll.user &&
            <span onClick={()=>{deleteComment(com.id)}} style={{marginLeft:'3vh'}} ><DeleteIcon/></span>
            }
              </div>
              <div>
              {editinputopen && <EditComment com={com} setEditinputopen={setEditinputopen} editComment={editComment} comm={comm}
              datas={datas} setDatas={setDatas}  />}
              </div> 
              
          </div>
          {/* <span className="date">1 hour ago</span> */}
        </div>
      ))}
      </div>:
      null

      }
     
    </div>
  );
};

export default Comments;