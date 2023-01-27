import React from 'react'
import "./feedpage.css"
function FeedPage({ children }) {
  return (
    <>
      <div style={{ position: "fixed", marginTop:"0px" }} >

        <div className=" itemconfiguration" >
          {children}
        </div>

      </div>
    </>
  )
}

export default FeedPage