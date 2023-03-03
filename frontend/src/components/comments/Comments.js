
import {  useEffect, useState ,useContext} from "react";
import "./comments.css";
import AuthContext from "../../context/AuthContext";


const Comments = ({foll}) => {
  let {user} = useContext(AuthContext)
  console.log(foll.id,'inside comments component')
  //Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "",
  //   },
  // ];
  const [values,setValues] = useState({inputComment:''})
  console.log(values,'state values are herer ererererere')
  let hangleChange = (e)=>{
    setValues(
      
      {
        ...values,
        [e.target.name]:e.target.value})


  }
  console.log(values,'state values')


  let addcomment = async(e) =>{
    e.preventDefault()
    let data = values
    console.log(data)
    
    
    console.log('adding comment');
    let response = await fetch(`http://127.0.0.8000/follow/addcomments/${user.user_id}/`)
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
      console.log(data)

    } else {
      alert("Something went wrong!!")

    }
  }
  useEffect(() => {
    comm()
  }, [],)
  return (
    <div className="comments container">
      <div  className="write">
        <img src="" alt="" />
        <input onChange={hangleChange} value={values.comment} name="comment" type="text" placeholder="write a comment" />
        <button onClick={addcomment}>Send</button>
      </div>
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