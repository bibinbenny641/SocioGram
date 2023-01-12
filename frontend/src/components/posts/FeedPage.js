import React from 'react'
import "./feedpage.css"
function FeedPage({children}) {
  return (
    <>
    <div className='container-fluid'>
      


    
    <div className=' feedpagemain'>

 
      <div className=" itemconfiguration" >
        
        
      	 {children}
		</div>		      		

    </div>

      </div>
    

    
    </>
  )
}

export default FeedPage