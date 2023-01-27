import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState,useContext } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
 
function SideBar() {
  let {user,logoutUser} = useContext(AuthContext)

  return (
    // 
    <>
      <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {/* <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span> */}
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={'/'}>

            <span>Home</span>
            </Link>
          </div>
          <div className="item">
            <img src='' alt="" />
            <Link to={'/message'}>

            <span>messages</span>
            </Link>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src='https://cdn-icons-png.flaticon.com/512/21/21104.png' alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span onClick={logoutUser}>LogOut</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src='' alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src='' alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        
      </div>
    </div>
    </>



  );
}
export default SideBar


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function SideBar() {
//   const [state, setState] = React.useState({
//     left: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {['left'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>.</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }