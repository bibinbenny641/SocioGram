import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'
import "./resultsss.css";


function Results() {
    const navigate = useNavigate()

    let {result,setResult} = useContext(AuthContext)
    const userprofile=((id)=>{
        console.log('hai',id)
        navigate(`/profile/${id}`)

    })
  return (
    <>
    <div className="search-results-container">
      {result.map((i) => (
        <div style={{padding:'1vh',border:'1px'}} onClick={()=>userprofile(i.id)} key={i.id} className="search-result">
          {i.fullname}
        </div>
      ))}
    </div>
    </>
  )
}

export default Results