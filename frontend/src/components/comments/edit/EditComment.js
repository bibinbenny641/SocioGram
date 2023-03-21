import React from 'react'
import { useState } from 'react'


function EditComment({com,setEditinputopen,editComment,comm,datas,setDatas}) {
   
    
    let handleChange = (e)=>{
        setDatas(
          
          {
            ...datas,
            [e.target.name]:e.target.value})
    
    
      }
      
    
  return (
    <>
    <div className="comments container">
      <div  className="write">
        {/* <img src="" alt="" /> */}
        <input onChange={handleChange} value={datas.comment}  name="comment" type="text"  placeholder={com.comment} />
        <button onClick={()=>{editComment(com.id)}} >Edit</button>
      </div>
    </div>
    </>
  )
}

export default EditComment