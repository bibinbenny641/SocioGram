import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import {
  List,
  ListItem,
  ListIcon,

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Rightbar({ propsFollower, userlist, folow, usersfollower, }) {
  const navigate = useNavigate()

  let { user, auth_user, currentuser, setCurrentuser } = useContext(AuthContext)

  console.log(propsFollower, ".................");
  // function bibin(id) {
  //   console.log(id, "kkkkkk");
  //   setCurrentuser(id)
  //   userlist(id)
  //   folow(id)
  // }
  function userProfile(id){
    console.log(id,'inside right side bar')
    
    setCurrentuser(id)
    userlist(id)
    folow(id)
    navigate(`/profile/${id}`)
  }
  return (
    <>



      <List spacing={3}>
        {console.log(propsFollower,'righiside')}
        {

          
          propsFollower.map((foll, index) => (

            <>
              {usersfollower ?
                (

                  <ListItem key={index}
                  //  onClick={(() => { bibin(foll.firstuser) })}
                  onClick={() => { userProfile(foll.firstuser) }}
                     >
                    <ListIcon color='green.500' />
                    <strong >

                      {foll.firstUname}
                    </strong>
                  </ListItem>
                )
                :
                (
                  <ListItem key={index} onClick={(() => { userProfile(foll.seconduser) })}   >
                    <ListIcon color='green.500' />
                    <strong>
                      {foll.secondUname}
                    </strong>
                  </ListItem>
                )
              }
            </>



          )
          )}
      </List>


    </>
  )
}

export default Rightbar

