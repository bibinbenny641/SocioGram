import React,{useContext,useEffect, useState} from 'react'
// import Table from 'react-bootstrap/Table';
import AuthContext from '../context/AuthContext';


function UsersTable() {
    let [authTokens,setAuthTokens] = useState( ()=> localStorage.getItem('authTokens') ? localStorage.getItem('authTokens'):null)
    let {logoutAdmin} = useContext(AuthContext)
    const [list, setList] = useState([])
    useEffect(() => {
        setAuthTokens(localStorage.getItem('authTokens') ? localStorage.getItem('authTokens'):null)
      userlist()
    }, [])
    console.log(list)   
    // let {authTokens}=useContext(AuthContext)
    let userlist = async()=>{
        
        console.log(String(JSON.parse(authTokens).access)+'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
        let response = await fetch('http://127.0.0.1:8000/adminside/users/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
            },
            
            
            
        })
        let data = await response.json()
        console.log(data)
        
        console.log("bbbbbbbbbbbb bb b b b b b")
        if (response.status===200){
            setList(data.data)
           
           
        }else{
            // alert("Something went wrong!!")
            
        }
        
        
    }

    let control = async(obj_id)=>{
        console.log(obj_id)
        let response = await fetch(`http://127.0.0.1:8000/adminside/block/${obj_id}/`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer  ${String(JSON.parse(authTokens).access)}`
            },
            
            
            
        })
        let data = await response.json()
        console.log(data)
        if (response.status===200){
            console.log("havuuuu")
             userlist()
           
        }else{
            alert("Something went wrong tto!!")
        }
        
    }

  return (
    <div>
        <table className='table'>
      <thead>
        <tr>
          <th><button onClick={logoutAdmin}>logout</button></th>
        </tr>
        <tr >
          <th>Sl No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { list?.map((obj,index)=>
            //   obj.is_staff===true &&
                <tr key={obj.id} >
                <td>{obj.id}</td>
                <td>{obj.fullname}</td>
                <td>{obj.email}</td>  
                {
                  obj.active ?
                  <td> <button className='btn-danger'  onClick={()=> control(obj.id)} >Block</button>{' '}</td> :
                  <td> <button className='btn-success'    onClick={()=> control(obj.id)} >Unblock</button>{' '}</td>  
                }             
                 
          
              
                </tr>

        )
           
        }
       
      </tbody>
    </table>
        

    
    

    
    </div>
  )
}

export default UsersTable