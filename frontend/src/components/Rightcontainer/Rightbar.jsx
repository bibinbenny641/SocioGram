import React, { useEffect } from 'react'
// import "./rightbar.css"

import { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext';


function Rightbar({ propsFollower, userlist, folow, usersfollower, }) {
  let { user, auth_user, currentuser, setCurrentuser } = useContext(AuthContext)

  console.log(propsFollower, ".................");
  function bibin(id) {
    console.log(id, "kkkkkk");
    setCurrentuser(id)
    userlist(id)
    folow(id)


  }
  return (
    <div style={{ marginTop: "35px" }} className='rightbar '>
      <div className='rightcontainer'>
        <h3 style={{ marginLeft: "10px", color: "green", textAlign: "start" }}>followers</h3>
        <div style={{ marginTop: "-10px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <ul>

              {
                propsFollower.map((foll) => (

                  <>
                    {usersfollower ?
                      (

                        <li onClick={(() => { bibin(foll.firstuser) })} style={{ marginLeft: "0px", width: "60vh" }} className="alert alert-dark" role="alert">{foll.firstUname}</li>
                        )
                        :
                        (
                        <li onClick={(() => { bibin(foll.seconduser) })} style={{ marginLeft: "0px", width: "60vh" }} className="alert alert-dark" role="alert">{foll.secondUname}</li>


                      )
                    }
                  </>



                )
                )}
            </ul>

          </div>
        </div>



      </div>

      {/* <div className='rightcontainer2'>
        <h3 style={{ marginLeft: "10px" ,textAlign:"start"}}>Suggested for you  </h3>
        

      </div> */}
    </div>
  )
}

export default Rightbar
